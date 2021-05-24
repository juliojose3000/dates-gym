
import { Component, OnInit } from '@angular/core';
import { Authentication } from '../model/authentication.model';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Token } from '../model/token.model'
import { AuthenticationService } from '../service/authentication.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MyResponse } from '../model/myresponse.model';
import { MessageComponent } from '../message/message.component';
import { MatDialog } from '@angular/material/dialog';
import { CSS_CLASSES, Strings } from '../resources/resources';
import { SpinnerService } from '../spinner/spinner.service';
import { Utils } from '../utils/utils';
import { HeaderComponent } from '../header/header.component';
import { environment_variables } from 'src/environments/environment.variables';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  //For Sign Up
  public name: string;
  public phone: string;
  public email:string;
  public password: string;

  //For Sign In
  public login_email:string;
  public login_password: string;



  private auth: Authentication;
  private user: User;

  social_user: SocialUser;
  isASocialLogin: boolean = false;


  constructor(
    private userService: UserService, 
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    private spinnerService: SpinnerService,
    private utils: Utils,
    private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {

    if(environment_variables.quickpass){
      this.login_email = environment_variables.email;
      this.login_password = environment_variables.password;
    }

    this.codigojs();

  }

  codigojs(){

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');

    const pSignUpButton = document.getElementById('pSignUp');
    const pSignInButton = document.getElementById('pSignIn');

    const container = document.getElementById('container');
    
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    pSignUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });
    
    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

    pSignInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

  }


  login() {
    console.log("LoginComponent - Login Method starts...");
    if(!this.haveUserFillTheInputs("sign_in")){
      this.dialog.open(MessageComponent, {
        data: {
            title: Strings.ERROR,
            message: Strings.SIGN_IN_NULL_SPACES
        }
      }); 
      return;
    }

    this.auth = new Authentication(this.login_email, this.login_password);
    this.spinnerService.requestStarted();
    this.authService.authenticate(this.auth).subscribe((mResponse: MyResponse) => {
        this.spinnerService.resetSpinner();
        if(mResponse.isSuccessful){
          this.loginSuccesful(mResponse);
        }
        else{
          //Invalid credentials
          this.dialog.open(MessageComponent, {
            data: {
                title: mResponse.title,
                message: mResponse.description
            }
          }); 
        }
      },
      (error: HttpErrorResponse) => {//Error callback
        console.log("LoginComponent - LoginMethod Error: "+error.message);
        this.spinnerService.resetSpinner();
        this.utils.showErrorMessage();
      }
    );
  } // login

  signUp(){

    if(!this.haveUserFillTheInputs("sign_up")){
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.SIGN_UP_NULL_SPACES } }); 
      return;
    }

    if(!this.utils.checkPasswordStrength(this.password)){
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.IT_IS_NOT_A_STRONG_PASSWORD } }); 
      return;
    }

    if(!this.utils.validateEmail(this.email)){// If the email enters is not valid
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.IT_IS_NOT_A_VALID_EMAIL } }); 
      return;
    }

    if(!this.utils.isAValidPhoneNumber(this.phone)){
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.IT_IS_NOT_A_VALID_PHONE } }); 
      return;
    }

    this.user = new User(0, this.email, this.name, this.phone, this.password);

    this.spinnerService.requestStarted();
    this.userService.create(this.user).subscribe((mResponse: MyResponse) => {
      this.spinnerService.resetSpinner();
      this.dialog.open(MessageComponent, {
        data: {
          title: mResponse.title,
          message: mResponse.description,
          class: mResponse.isSuccessful?CSS_CLASSES.DIALOG_CLASS_FOR_SIGNUP_SUCCESSFUL:null
        }
      }).afterClosed().subscribe(() => {
        if(mResponse.isSuccessful){
          this.loginSuccesful(mResponse);
        }
      });          
      
    },
    (error) => {//Error callback
      this.spinnerService.resetSpinner();
      this.utils.showErrorMessage();
    });

  }

  haveUserFillTheInputs(action: string){
    if(action=="sign_in"){
      if(this.login_email!=undefined && this.login_password!=undefined)
        return true;
      else
        return false;
    }else if(action=="sign_up"){
      if(this.email!=undefined && this.password!=undefined && this.phone!=undefined && this.name!=undefined)
        return true;
      else
        return false;
    }
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialSignInStartService();
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialSignInStartService();
  }

  socialSignInStartService(){

    this.socialAuthService.authState.subscribe(social_user => {
      this.social_user = social_user;
      console.log(social_user);

      if(!this.isASocialLogin && social_user != null){
        this.user = new User(social_user.id as unknown as number, social_user.name, "Not Registered", social_user.id);
        this.socialSignIn(this.user);
        this.isASocialLogin = true;
        localStorage.setItem("isASocialLogin", this.isASocialLogin==true?"yes":"no");
      }
    });

  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

  socialSignIn(user: User){

    this.user = user;

    this.spinnerService.requestStarted();
    this.userService.social_login(this.user).subscribe((mResponse: MyResponse) => {
      console.log(mResponse);
      this.spinnerService.resetSpinner();


      //Para Registro
      if(mResponse.description!="Credenciales válidos"){

        this.dialog.open(MessageComponent, {
          data: {
            title: mResponse.title,
            message: mResponse.description,
            class: mResponse.isSuccessful?CSS_CLASSES.DIALOG_CLASS_FOR_SIGNUP_SUCCESSFUL:null
          }
        }).afterClosed().subscribe(() => {
          if(mResponse.isSuccessful){
            this.loginSuccesful(mResponse);
            return;
          }
        }); 

      }

      //Para login
      if(mResponse.isSuccessful){
        this.loginSuccesful(mResponse);
      }else{

        this.dialog.open(MessageComponent, {
          data: {
            title: mResponse.title,
            message: mResponse.description,
            class: mResponse.isSuccessful?CSS_CLASSES.DIALOG_CLASS_FOR_SIGNUP_SUCCESSFUL:null
          }
        }); 

      }

         
      
    },
    (error) => {//Error callback
      this.spinnerService.resetSpinner();
      this.utils.showErrorMessage();
    }
  );

  }

  loginSuccesful(mResponse: MyResponse){
    this.utils.saveUserSessionData(mResponse);
    this.router.navigate(['home']);
    document.getElementById("a_session").innerHTML = Strings.LOGOUT;
    document.getElementById("btn_session").innerHTML = this.utils.getFirstWordFromString(localStorage.getItem("user_name"));
  }


  keyupEvent(el: HTMLInputElement){

    var element = el.name;
    var value = el.value;

    switch(element){

      case "name":
        if(value!="")
          document.getElementById("name_point").setAttribute("src","../../assets/img/right_input.png");
        else
          document.getElementById("name_point").setAttribute("src","../../assets/img/point_gray.png");
        break;

      case "email":
        if(this.utils.validateEmail(this.email))
          document.getElementById("email_point").setAttribute("src","../../assets/img/right_input.png");
        else if(value=="")
          document.getElementById("email_point").setAttribute("src","../../assets/img/point_gray.png");
        else
          document.getElementById("email_point").setAttribute("src","../../assets/img/bad_input.png");
        break;


      case "password":
        this.utils.checkPasswordStrength(value);
        break;


      case "phone":
        if(this.utils.isAValidPhoneNumber(this.phone))
          document.getElementById("phone_point").setAttribute("src","../../assets/img/right_input.png");
        else if(value=="")
          document.getElementById("phone_point").setAttribute("src","../../assets/img/point_gray.png");
        else
          document.getElementById("phone_point").setAttribute("src","../../assets/img/bad_input.png");
        break;

    }

  }

  goToPasswordForgotten(){
    this.router.navigate(['password_forgotten']);
  }

}

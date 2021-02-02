
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
  isAStrongPassword: boolean = false;

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
      this.email = environment_variables.email;
      this.password = environment_variables.password;
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
      (error) => {//Error callback
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

    if(!this.isAStrongPassword){
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.IT_IS_NOT_A_STRONG_PASSWORD } }); 
      return;
    }

    if(!this.checkEmail()){// If the email enters is not valid
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.IT_IS_NOT_A_VALID_EMAIL } }); 
      return;
    }

    if(!this.isAValidPhoneNumber()){
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.IT_IS_NOT_A_VALID_PHONE } }); 
      return;
    }

    this.user = new User(this.email, this.name, this.phone, this.password);

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

  saveUserSessionData(mResponse: MyResponse){
    this.user = mResponse.data as User;
    localStorage.setItem("token", "Bearer "+mResponse.token);
    localStorage.setItem("email", this.user.email);
    localStorage.setItem("userId", ""+this.user.id);
    localStorage.setItem("user_name", ""+this.utils.getFirstWordFromString(this.user.name));
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
        this.user = new User(social_user.email, social_user.name, "Not Registered", social_user.id, 0);
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
    this.saveUserSessionData(mResponse);
    this.router.navigate(['home']);
    document.getElementById("a_session").innerHTML = Strings.LOGOUT;
    document.getElementById("btn_session").innerHTML = localStorage.getItem("user_name");
  }

  checkPasswordStrength(password: string) {
    //if textBox is empty
    if(password==""){
      document.getElementById("password_point").setAttribute("src","../../assets/img/point_gray.png");
      return;
    }

    //Regular Expressions
    var regex = new Array();
    regex.push("[A-Z]"); //For Uppercase Alphabet
    regex.push("[a-z]"); //For Lowercase Alphabet
    regex.push("[0-9]"); //For Numeric Digits
    regex.push("[$@$!%*#?&]"); //For Special Characters

    var passed = 0;

    //Validation for each Regular Expression
    for (var i = 0; i < regex.length; i++) {
        if((new RegExp (regex[i])).test(password)){
            passed++;
        }
    }

    //Validation for Length of Password
    if(passed > 2 && password.length > 8){
        passed++;
    }

    //Display of Status
    var color = "";
    var passwordStrength = "";
    switch(passed){
        case 0:
          break;

        case 1:
          passwordStrength = "Password is Weak.";
          this.isAStrongPassword = false;
          color = "Red";
          document.getElementById("password_point").setAttribute("src","../../assets/img/bad_input.png");
          break;
          
        case 2:
            break;

        case 3:
          passwordStrength = "Password is Good.";
          this.isAStrongPassword = true;
          color = "yellow";
          document.getElementById("password_point").setAttribute("src","../../assets/img/point_yellow.png");
          break;

        case 4:
          break;

        case 5:
          this.isAStrongPassword = true;
          passwordStrength = "Password is Strong.";
          color = "Green";
          document.getElementById("password_point").setAttribute("src","../../assets/img/right_input.png");
          break;
    }
  }

  checkEmail(): boolean{

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(this.email).toLowerCase());
    
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
        if(this.checkEmail())
          document.getElementById("email_point").setAttribute("src","../../assets/img/right_input.png");
        else if(value=="")
          document.getElementById("email_point").setAttribute("src","../../assets/img/point_gray.png");
        else
          document.getElementById("email_point").setAttribute("src","../../assets/img/bad_input.png");
        break;


      case "password":
        this.checkPasswordStrength(value);
        break;


      case "phone":
        if(this.isAValidPhoneNumber())
          document.getElementById("phone_point").setAttribute("src","../../assets/img/right_input.png");
        else if(value=="")
          document.getElementById("phone_point").setAttribute("src","../../assets/img/point_gray.png");
        else
          document.getElementById("phone_point").setAttribute("src","../../assets/img/bad_input.png");
        break;

    }

  }

  isAValidPhoneNumber(): boolean{
    return this.phone.length==8 && /^\d+$/.test(this.phone);
  }

}

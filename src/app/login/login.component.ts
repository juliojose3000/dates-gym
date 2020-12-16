
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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public name: string;
  public phone: string;
  public email:string;
  public password: string;
  private auth: Authentication;
  private user: User;

  constructor(
    private userService: UserService, 
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    private spinnerService: SpinnerService,
    private utils: Utils) { }

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
    this.auth = new Authentication(this.email, this.password);
    this.spinnerService.requestStarted();
    this.authService.authenticate(this.auth).subscribe((mResponse: MyResponse) => {
        this.spinnerService.resetSpinner();
        if(mResponse.isSuccessful){
          this.saveUserSessionData(mResponse);
          this.router.navigate(['home']);
          document.getElementById("a_session").innerHTML = Strings.LOGOUT;
          document.getElementById("a_session2").innerHTML = Strings.LOGOUT;
          document.getElementById("a_login_user").innerHTML = "Julio Segura";
          document.getElementById("a_login_user2").innerHTML = "Julio Segura";
          document.getElementById("div_logout").style.display = "";
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
          this.saveUserSessionData(mResponse);
          this.router.navigate(['home']);
        }
      });          
      
    },
    (error) => {//Error callback
      this.spinnerService.resetSpinner();
      this.utils.showErrorMessage();
    }
  );

  }

  saveUserSessionData(mResponse: MyResponse){
    this.user = mResponse.data as User;
    localStorage.setItem("token", "Bearer "+mResponse.token);
    localStorage.setItem("email", this.user.email);
    localStorage.setItem("userId", ""+this.user.id);
  }


}

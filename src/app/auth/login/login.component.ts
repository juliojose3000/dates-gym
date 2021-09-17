
import { Component, OnInit } from '@angular/core';
import { Authentication } from '../../model/authentication.model';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { Token } from '../../model/token.model'
import { AuthenticationService } from '../../service/authentication.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MyResponse } from '../../model/myresponse.model';
import { MessageComponent } from '../../common/message/message.component';
import { MatDialog } from '@angular/material/dialog';
import { Codes, CSS_CLASSES, Strings } from '../../utils/resources';
import { SpinnerService } from '../../common/spinner/spinner.service';
import { Utils } from '../../utils/utils';
import { HeaderComponent } from '../../common/header/header.component';
import { environment_variables } from 'src/environments/environment.variables';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { HttpErrorResponse } from '@angular/common/http';
import { EnterPhoneNumberPopupComponent } from './enter-phone-number-popup/enter-phone-number-popup.component';
import { Subscription } from 'rxjs';
import { UserRoleEnum } from '../../model/enums/user-role.enum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  //For Sign Up
  public name: string;
  public phone: string;
  public email: string;
  public password: string;

  //For Sign In
  public login_email: string;
  public login_password: string;



  private auth: Authentication;
  private user: User;

  social_user: SocialUser;
  detailRecivedSubscription: Subscription;


  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    private spinnerService: SpinnerService,
    private utils: Utils,
    private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {

    if (environment_variables.quickpass) {
      this.login_email = environment_variables.email;
      this.login_password = environment_variables.password;

      this.email = environment_variables.email;
      this.name = environment_variables.name;
      this.phone = environment_variables.phone;
      this.password = environment_variables.password;
    }

    this.codigojs();
    
  }

  codigojs() {

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
    if (!this.haveUserFillTheInputs("sign_in")) {
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
      if (mResponse.isSuccessful) {
        this.loginSuccesful(mResponse);
      }
      else {
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
        console.log("LoginComponent - LoginMethod Error: " + error.message);
        this.spinnerService.resetSpinner();
        this.utils.showErrorMessage();
      }
    );
  } // login

  signUp() {

    if (!this.haveUserFillTheInputs("sign_up")) {
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.SIGN_UP_NULL_SPACES } });
      return;
    }

    if (!this.utils.checkPasswordStrength(this.password, "password_point")) {
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.IT_IS_NOT_A_STRONG_PASSWORD } });
      return;
    }

    if (!this.utils.validateEmail(this.email)) {// If the email enters is not valid
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.IT_IS_NOT_A_VALID_EMAIL } });
      return;
    }

    if (!this.utils.isAValidPhoneNumber(this.phone)) {
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.IT_IS_NOT_A_VALID_PHONE } });
      return;
    }

    this.user = new User(0, this.email, this.name, this.phone, this.password, false, UserRoleEnum.CUSTOMER);

    this.spinnerService.requestStarted();
    this.userService.create(this.user).subscribe((mResponse: MyResponse) => {
      this.spinnerService.resetSpinner();
      this.dialog.open(MessageComponent, {
        data: {
          title: mResponse.title,
          message: mResponse.description,
          class: mResponse.isSuccessful ? CSS_CLASSES.DIALOG_CLASS_FOR_SIGNUP_SUCCESSFUL : null
        }
      }).afterClosed().subscribe(() => {
        if (mResponse.isSuccessful) {
          this.loginSuccesful(mResponse);
        }
      });

    },
      (error) => {//Error callback
        this.spinnerService.resetSpinner();
        this.utils.showErrorMessage();
      });

  }

  haveUserFillTheInputs(action: string) {
    if (action == "sign_in") {
      if (this.login_email != undefined && this.login_password != undefined)
        return true;
      else
        return false;
    } else if (action == "sign_up") {
      if (this.email != undefined && this.password != undefined && this.phone != undefined && this.name != undefined)
        return true;
      else
        return false;
    }
  }

  signInWithGoogle(): void {
    console.log("signInWithGoogle");

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data) => {
        console.log(data);
        localStorage.setItem("LoginProvider", GoogleLoginProvider.PROVIDER_ID);
        this.socialSignInStartService();
      })
      .catch((error) => {
        console.log(error); //If user close the authentication window, it enters to catch
      });
    
  }

  signInWithFB(): void {
    console.log("signInWithFB");
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data) => {
        console.log(data);
        localStorage.setItem("LoginProvider", FacebookLoginProvider.PROVIDER_ID);
        this.socialSignInStartService();
      }).catch((error) => {
        console.log(error); //If user close the authentication window, it enters to catch
      });
    
  }

  socialSignInStartService() {
    console.log("socialSignInStartService");
    this.detailRecivedSubscription = this.socialAuthService.authState.subscribe(socialUser => {

      if (this.social_user == undefined || this.social_user != socialUser) {
        this.social_user = socialUser;
        this.user = new User();
        this.user.email = this.social_user.email;
        this.user.name = this.social_user.name;
        this.user.role = UserRoleEnum.CUSTOMER

        this.spinnerService.requestStarted();
        this.userService.userExists(this.user.email).subscribe((mResponse: MyResponse) => {
          this.spinnerService.resetSpinner();
          if (mResponse.code == Codes.USER_EMAIL_DOES_NOT_EXISTS) {
            this.dialog
              .open(EnterPhoneNumberPopupComponent)
              .afterClosed().subscribe((data) => {
                if (data == undefined) return; //this means the user clicks on cancel button
                this.user.phoneNumber = data.phoneNumber;
                this.socialSignIn(this.user);
              });

          } else {
            this.socialSignIn(this.user);
          }

        }, (error) => {
          console.log(error.message);
          this.spinnerService.resetSpinner();
          this.utils.showErrorMessage();
          if(this.detailRecivedSubscription != undefined)
            this.detailRecivedSubscription.unsubscribe();
        });


      }
    });

  }

  ngOnDestroy() {
    if(this.detailRecivedSubscription != undefined)
      this.detailRecivedSubscription.unsubscribe();
  }


  signOut(): void {
    this.socialAuthService.signOut();
  }

  socialSignIn(user: User) {
    console.log("socialSignIn");
    //return;
    this.user = user;
    this.spinnerService.requestStarted();
    this.userService.social_login(this.user).subscribe((mResponse: MyResponse) => {
      console.log(mResponse);
      this.spinnerService.resetSpinner();

      //Para Registro
      if (mResponse.code == Codes.SOCIAL_USER_CREATED_SUCCESSFUL) {

        this.dialog.open(MessageComponent, {
          data: {
            title: mResponse.title,
            message: mResponse.description,
            class: mResponse.isSuccessful ? CSS_CLASSES.DIALOG_CLASS_FOR_SIGNUP_SUCCESSFUL : null
          }
        }).afterClosed().subscribe(() => {
          if (mResponse.isSuccessful) {
            this.loginSuccesful(mResponse);
            return;
          }
        });

      }

      //Para login
      if (Codes.USER_CREATED_SUCCESSFUL) {
        this.loginSuccesful(mResponse);
      } else {
        this.dialog.open(MessageComponent, {
          data: {
            title: mResponse.title,
            message: mResponse.description,
            class: mResponse.isSuccessful ? CSS_CLASSES.DIALOG_CLASS_FOR_SIGNUP_SUCCESSFUL : null
          }
        });
      }
    }, (error) => {//Error callback
      console.log(error.message);
      this.spinnerService.resetSpinner();
      this.utils.showErrorMessage();
    });

  }

  loginSuccesful(mResponse: MyResponse) {
    this.utils.saveUserSessionData(mResponse);
    this.router.navigate(['home']);
    document.getElementById("a_session").innerHTML = Strings.LOGOUT;
    document.getElementById("btn_session").innerHTML = Strings.MY_ACCOUNT;

    if(localStorage.getItem("user_role") == UserRoleEnum.ADMIN.toString()){
      document.getElementById("div_admin").setAttribute("class", "dropdown");
    }
  }


  keyupEvent(el: HTMLInputElement) {

    var element = el.name;
    var value = el.value;

    switch (element) {

      case "name":
        if (value != "")
          document.getElementById("name_point").setAttribute("src", "../../assets/img/right_input.png");
        else
          document.getElementById("name_point").setAttribute("src", "../../assets/img/point_gray.png");
        break;

      case "email":
        if (this.utils.validateEmail(this.email))
          document.getElementById("email_point").setAttribute("src", "../../assets/img/right_input.png");
        else if (value == "")
          document.getElementById("email_point").setAttribute("src", "../../assets/img/point_gray.png");
        else
          document.getElementById("email_point").setAttribute("src", "../../assets/img/bad_input.png");
        break;


      case "password":
        this.utils.checkPasswordStrength(value, "password_point");
        break;


      case "phone":
        if (this.utils.isAValidPhoneNumber(this.phone))
          document.getElementById("phone_point").setAttribute("src", "../../assets/img/right_input.png");
        else if (value == "")
          document.getElementById("phone_point").setAttribute("src", "../../assets/img/point_gray.png");
        else
          document.getElementById("phone_point").setAttribute("src", "../../assets/img/bad_input.png");
        break;

    }

  }

  goToPasswordForgotten() {
    this.router.navigate(['password_forgotten']);
  }

  showPassword(inputId: string, eyeIconId: string) {
    this.utils.showPassword(inputId, eyeIconId);
  }

}

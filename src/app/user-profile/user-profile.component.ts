import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { MyResponse } from '../model/myresponse.model';
import { User } from '../model/user.model';
import { CSS_CLASSES, Strings } from '../resources/resources';
import { UserService } from '../service/user.service';
import { SpinnerService } from '../spinner/spinner.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public name: string;
  public phone: string;
  public email:string;
  public password: string;
  public confirmPassword: string;

  private user: User;

  constructor(private utils: Utils, 
    public dialog: MatDialog, 
    private spinnerService: SpinnerService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("user_name");
    this.email = localStorage.getItem("email");

    this.keyupEvent(document.getElementById("name_input") as HTMLInputElement);
    this.keyupEvent(document.getElementById("email_input") as HTMLInputElement);

    if(localStorage.getItem("user_phoneNumber")=="Not Registered"){
      document.getElementById("phone_input").setAttribute("placeholder","No registrado");
    }else{
      this.phone = localStorage.getItem("user_phoneNumber");
      this.keyupEvent(document.getElementById("phone_input") as HTMLInputElement);
    }
    
  }

  updateUserProfile(){

    if(!this.haveUserFillTheInputs()){
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.SIGN_UP_NULL_SPACES } }); 
      return;
    }

    if(this.password != undefined && !this.utils.checkPasswordStrength(this.password)){
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

    if(this.password!=this.confirmPassword){
      this.dialog.open(MessageComponent, { data: { title: Strings.ERROR, message: Strings.PASSWORDS_NEED_TO_BE_EQUALS } }); 
      return;
    }

    this.user = new User(this.utils.getUserId(), this.email, this.name, this.phone, this.password);

    console.log(this.user.toString());

    this.spinnerService.requestStarted();
    this.userService.updateProfile(this.user).subscribe((mResponse: MyResponse) => {
      this.spinnerService.resetSpinner();
      this.dialog.open(MessageComponent, {
        data: {
          title: mResponse.title,
          message: mResponse.description
        }
      }).afterClosed().subscribe(() => {
        if(mResponse.isSuccessful){
          this.utils.saveUserSessionData(mResponse);
          this.router.navigate(['home']);
        }
      });          
      
    },
    (error: HttpErrorResponse) => {//Error callback
      this.spinnerService.resetSpinner();
      this.utils.showErrorMessage();
      console.log(error.message);
    });

  }

  keyupEvent(el: HTMLInputElement){

    var element = el.name;
    var value = el.value;
    
    switch(element){

      case "name":
        if(this.name=="")
          document.getElementById("name_point").setAttribute("src","../../assets/img/point_gray.png");
        else
          document.getElementById("name_point").setAttribute("src","../../assets/img/right_input.png");
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

      case "confirm_password":
        if(this.password==this.confirmPassword)
          document.getElementById("confirm_password_point").setAttribute("src","../../assets/img/right_input.png");
        else
          document.getElementById("confirm_password_point").setAttribute("src","../../assets/img/bad_input.png");
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


  haveUserFillTheInputs(): boolean{
      if(this.email!=undefined && this.phone!=undefined && this.name!=undefined)
        return true;
      else
        return false;
  }

  showPassword(inputId: string, eyeIconId: string){
    this.utils.showPassword(inputId, eyeIconId);   
  }


}

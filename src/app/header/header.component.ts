import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';
import { Codes, Strings } from '../resources/resources';
import { Utils } from '../utils/utils';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAMobileScreen: boolean = false;

  constructor(private router: Router, public dialog: MatDialog, public utils: Utils) {}

  ngOnInit(): void {
    if(this.utils.getWidth()<=845) this.isAMobileScreen = true;

    const session = document.getElementById("a_session");
    const login_user = document.getElementById("btn_session");

    if(this.isAMobileScreen){
      document.getElementById("div_services").setAttribute("class", "display_none");
      document.getElementById("div_user").setAttribute("class", "display_none");
    }
      
    
    if(localStorage.getItem('token')!='null' && localStorage.getItem('token')!=null){//There is an active session
      login_user.innerHTML = localStorage.getItem("user_name");
      session.innerHTML = Strings.LOGOUT;
    }else{
      document.getElementById("div_user").setAttribute("class", "display_none");
      login_user.innerHTML = Strings.LOGIN;
    }

  }

  session(){
    if(document.getElementById("btn_session").innerHTML!=Strings.LOGIN) return;

    if(localStorage.getItem("token")!='null' && localStorage.getItem("token")!=null){//The user have a live session, so user logout its session

      //Invalid credentials
      this.dialog.open(PopupComponent, {
        data: {
            title: Strings.LOGOUT,
            message: Strings.LOGOUT_MESSAGE,
            buttonLeftText: Strings.BUTTON_LEFT_LOGOUT,
            buttonRightText: Strings.BUTTON_RIGHT_LOGOUT,
            code: Codes.LOGOUT
        }
      }); 

    }else{
      document.getElementById("a_session").innerHTML = Strings.LOGIN;
      document.getElementById("btn_session").innerHTML = Strings.LOGIN;
      this.router.navigate(['login']);
    }
  }

  logout(){
    this.dialog.open(PopupComponent, {
      data: {
          title: Strings.LOGOUT,
          message: Strings.LOGOUT_MESSAGE,
          buttonLeftText: Strings.BUTTON_LEFT_LOGOUT,
          buttonRightText: Strings.BUTTON_RIGHT_LOGOUT,
          code: Codes.LOGOUT
      }
    }); 
  }

  services(){
    document.getElementById("div_services").setAttribute("class", "dropdown-content");
  }

  goToWeightRoom(){
    document.getElementById("div_services").setAttribute("class", "display_none");
    this.router.navigate(['gym_services/weight_room']);
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  aboutUs(){
    this.router.navigate(['about_us']);
  }

  mouseup(element: HTMLButtonElement){
    switch(element.id){
      case "btn_services":
        document.getElementById("div_services").setAttribute("class", "dropdown-content");
        break;
      case "btn_session":
        if(document.getElementById("btn_session").innerHTML!=Strings.LOGIN)
          document.getElementById("div_user").setAttribute("class", "dropdown-content");
        else 
          this.session();
        break;
    }

  }

}

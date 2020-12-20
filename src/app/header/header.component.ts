import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';
import { Codes, Strings } from '../resources/resources';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    const session = document.getElementById("a_session");
    const session2 = document.getElementById("a_session2");
    const login_user = document.getElementById("a_login_user");
    const login_user2 = document.getElementById("a_login_user2");
    
    if(localStorage.getItem('token')!='null' && localStorage.getItem('token')!=null){//There is an active session
      login_user.innerHTML = localStorage.getItem("user_name");
      login_user2.innerHTML = localStorage.getItem("user_name");
      session.innerHTML = Strings.LOGOUT;
      session2.innerHTML = Strings.LOGOUT;
    }else{
      login_user.innerHTML = Strings.LOGIN;
      login_user2.innerHTML = Strings.LOGIN;
      document.getElementById("div_logout").style.display = "none";
      document.getElementById("div_logout2").style.display = "none";
    }

  }

  session(){
    if(document.getElementById("a_login_user").innerHTML!=Strings.LOGIN) return;

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
      document.getElementById("a_session2").innerHTML = Strings.LOGIN;
      document.getElementById("a_login_user").innerHTML = Strings.LOGIN;
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

  goToWeightRoom(){
    this.router.navigate(['gym_services/weight_room']);
    /*const element = document.getElementById("div_weight_room");
    element.style.display = "none";*/
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  aboutUs(){
    this.router.navigate(['about_us']);
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminGuard } from '../../guards/admin.guard';
import { UserRoleEnum } from '../../model/enums/user-role.enum';
import { PopupComponent } from '../popup/popup.component';
import { Codes, Strings } from '../../utils/resources';
import { Utils } from '../../utils/utils';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sessionText: string;

  constructor(private router: Router, public dialog: MatDialog, public utils: Utils, public adminGuard: AdminGuard) { }

  ngOnInit(): void {

    const session = document.getElementById("a_session");

    if (localStorage.getItem('token') != 'null' && localStorage.getItem('token') != null) {//There is an active session
      this.sessionText = Strings.MY_ACCOUNT;
      session.innerHTML = Strings.LOGOUT;
      document.getElementById("div_my_account_features").style.display = "block";
    } else {
      document.getElementById("div_my_account_features").style.display = "none";
      this.sessionText = Strings.LOGIN;
    }

    //Check is the user is admin
    if (localStorage.getItem('user_role') == null || localStorage.getItem('user_role') != UserRoleEnum.ADMIN.toString()) {
      document.getElementById("div_admin_features").style.display = "none";
    } else if (localStorage.getItem('user_role') == UserRoleEnum.ADMIN.toString()) {
      document.getElementById("div_admin_features").style.display = "block";
    }

    //If user clicks outside of side menu, so it will be closed
    document.body.addEventListener("click", function (event) {

      if (!document.getElementById("wrapper").contains(event.target as Node) &&
        (document.getElementById("show-menu") as HTMLInputElement).checked == true) {
        (document.getElementById("show-menu") as HTMLInputElement).checked = false; //Hide menu options
      }

    });

    //If user scrolling the page, the side menu will be closed
    window.onscroll = function () {
      if((document.getElementById("show-menu") as HTMLInputElement).checked == true)
        (document.getElementById("show-menu") as HTMLInputElement).checked = false;
    };

  }

  noscroll() {
    window.scrollTo(0, 0);
  }

  logout() {
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

  onClickEvent(goTo: string) {

    let hideMenu = true;

    switch (goTo) {
      case 'home':
        this.router.navigate(['home']);
        break;
      case 'aboutUs':
        this.router.navigate(['about_us']);
        break;
      case 'seeReservations':
        this.router.navigate(['admin/schedule']);
        break;
      case 'seeUsers':
        this.router.navigate(['admin/users']);
        break;
      case 'weightRoom':
        this.router.navigate(['gym_services/weight_room']);
        break;
      case 'userProfile':
        this.router.navigate(['user_profile']);
        break;
      case 'session':
        if (document.getElementsByName("btn_session")[0].innerHTML == Strings.MY_ACCOUNT) {
          hideMenu = false;
        } else {
          this.router.navigate(['login']);
        }
        break;
    }
    (document.getElementById("show-menu") as HTMLInputElement).checked = !hideMenu; //Hide menu options
  }

}

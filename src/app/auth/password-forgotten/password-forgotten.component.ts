import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../common/message/message.component';
import { MyResponse } from '../../model/myresponse.model';
import { PopupComponent } from '../../common/popup/popup.component';
import { Strings } from '../../utils/resources';
import { UserService } from '../../service/user.service';
import { SpinnerService } from '../../common/spinner/spinner.service';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.scss']
})
export class PasswordForgottenComponent implements OnInit {

  email: string;

  constructor(private userService: UserService, private spinnerService: SpinnerService, public dialog: MatDialog, private utils: Utils) { }

  ngOnInit(): void {
  }

  click() {
    if (this.email == undefined) {
      this.dialog.open(MessageComponent, {
        data: {
          title: Strings.ERROR,
          message: Strings.ENTERS_AN_EMAIL
        }
      });
      return;
    }

    if (!this.utils.validateEmail(this.email)) {
      this.dialog.open(MessageComponent, {
        data: {
          title: Strings.ERROR,
          message: Strings.ENTERS_A_VALID_EMAIL
        }
      });
      return;
    }

    this.spinnerService.requestStarted();
    this.userService.sendLinkResetPassword(this.email).toPromise().then((mResponse: MyResponse) => {
      this.spinnerService.resetSpinner();
      if (mResponse.isSuccessful) {
        document.getElementById("div_form").style.display = "none";
        document.getElementById("p_description").style.display = "block";
      }else{
        this.utils.showErrorMessageWithDescription(mResponse.description)
      }
    }, (error: HttpErrorResponse) => {
      this.spinnerService.resetSpinner();
      this.utils.showErrorMessage();
      console.log(error.message);
    });

  }

}

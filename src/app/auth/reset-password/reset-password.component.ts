import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageComponent } from '../../common/message/message.component';
import { MyResponse } from '../../model/myresponse.model';
import { ResetPassword } from '../../model/reset-password.model';
import { Strings } from '../../utils/resources';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';
import { SpinnerService } from '../../common/spinner/spinner.service';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  email: string;
  password: string;
  passwordConfirmed: string;
  code: string;
  isThePasswordStreght: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog,
    private utils: Utils,
    private router: Router) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['code'];
      console.log({ code: this.code }); // Print the parameter to the console. 
    });

  }

  ngOnInit(): void { }


  resetPassword(): void {

    if (this.email==undefined || this.password==undefined || this.passwordConfirmed==undefined) {
      this.dialog.open(MessageComponent, {
        data: {
          title: Strings.ERROR,
          message: Strings.FILL_INPUTS
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

    if(!this.isThePasswordStreght){
      this.dialog.open(MessageComponent, {
        data: {
          title: Strings.ERROR,
          message: Strings.IT_IS_NOT_A_STRONG_PASSWORD
        }
      });
      return;
    }

    if (this.password != this.passwordConfirmed) {
      this.dialog.open(MessageComponent, {
        data: {
          title: Strings.ERROR,
          message: Strings.PASSWORDS_NEED_TO_BE_EQUALS
        }
      });
      return;
    }

    var resetPasswordLink = new ResetPassword(this.email, this.code, this.password);

    this.spinnerService.requestStarted();
    this.userService.resetLink(resetPasswordLink).toPromise().then((mResponse: MyResponse) => {
      this.spinnerService.resetSpinner();
      this.dialog.open(MessageComponent, {
        data: {
          title: mResponse.title,
          message: mResponse.description
        }
      }).afterClosed().subscribe(result => {
        this.router.navigate(['login']);
      });

    }, (mResponse: MyResponse) => {
      this.spinnerService.resetSpinner();
      this.utils.showErrorMessage();
    });

  }

  keyupEvent(el: HTMLInputElement) {

    var element = el.name;
    var value = el.value;

    switch (element) {

      case "email":
        if (this.utils.validateEmail(this.email))
          document.getElementById("email_point").setAttribute("src", "../../assets/img/right_input.png");
        else if (value == "")
          document.getElementById("email_point").setAttribute("src", "../../assets/img/point_gray.png");
        else
          document.getElementById("email_point").setAttribute("src", "../../assets/img/bad_input.png");
        break;

      case "passwordConfirmed":
      case "password":
        this.isThePasswordStreght = this.utils.checkPasswordStrength(this.password, "password_point");
        if (this.password == this.passwordConfirmed)
        document.getElementById("confirmed_password_point").setAttribute("src", "../../assets/img/right_input.png");
      else
        document.getElementById("confirmed_password_point").setAttribute("src", "../../assets/img/bad_input.png");
        break;

    }

  }

  showPassword(inputId: string, eyeIconId: string){
    this.utils.showPassword(inputId, eyeIconId);   
  }

}

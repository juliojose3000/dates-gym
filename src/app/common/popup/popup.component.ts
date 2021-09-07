import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Codes, Strings } from '../../utils/resources';
import { SocialAuthService } from 'angularx-social-login';
import { Utils } from '../../utils/utils';
import { UserRoleEnum } from '../../model/enums/user-role.enum';

@Component({
  selector: 'popup-component',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

    title: string
    message: string;
    buttonLeftText: string;
    buttonRightText: string;
    code: number;

    constructor(
        public dialogRef: MatDialogRef<PopupComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: any, 
        private router: Router, 
        private socialAuthService: SocialAuthService,
        public utils: Utils) {}

    ngOnInit(): void {
        this.title = this.data.title;
        this.message = this.data.message;
        this.buttonLeftText = this.data.buttonLeftText;
        this.buttonRightText = this.data.buttonRightText;
        this.code = this.data.code;
    }

    submit(){
        switch(this.code){
            case Codes.LOGOUT:
                document.getElementById("btn_session").innerHTML = Strings.LOGIN;
                document.getElementById("div_user").setAttribute("class", "display_none");
                if(localStorage.getItem("user_role") == UserRoleEnum.ADMIN.toString())
                    document.getElementById("div_admin").setAttribute("class", "display_none");
                this.router.navigate(['login']);
                this.dimissDialog();
                localStorage.clear();//clean the local storage
                break;
        }

    }

    dimissDialog(){
        this.dialogRef.close({});
    }


}

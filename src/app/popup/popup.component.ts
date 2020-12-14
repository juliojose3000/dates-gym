import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Codes, Strings } from '../resources/resources';

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

    constructor(public dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {}

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
                localStorage.setItem("token", null);
                document.getElementById("a_session").innerHTML = Strings.LOGIN;
                document.getElementById("a_session2").innerHTML = Strings.LOGIN;
                document.getElementById("a_login_user").innerHTML = "Iniciar Sesión";
                document.getElementById("a_login_user2").innerHTML = "Iniciar Sesión";
                document.getElementById("div_logout").style.display = "none";
                document.getElementById("div_logout2").style.display = "none";
                this.router.navigate(['login']);
                this.dimissDialog();
                break;
        }

    }

    dimissDialog(){
        this.dialogRef.close({});
    }


}

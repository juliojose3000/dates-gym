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

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialogRef<PopupComponent>, private router: Router) {
    }

    ngOnInit(): void {
        this.title = this.data.title;
        this.message = this.data.message;
        this.buttonLeftText = this.data.buttonLeftText;
        this.buttonRightText = this.data.buttonRightText;
        this.code = this.data.code;
    }

    submit(){
        /*switch(this.code){
            case Codes.LOGOUT:

                break;
        }*/
        localStorage.setItem("token", null);
        const session = document.getElementById("a_session");
        const session2 = document.getElementById("a_session2");
        session.innerHTML = Strings.LOGIN;
        session2.innerHTML = Strings.LOGIN;
        this.router.navigate(['login']);
        this.dimissDialog();
    }

    dimissDialog(){
        this.dialog.close({});
    }


}

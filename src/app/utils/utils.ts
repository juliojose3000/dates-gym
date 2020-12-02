import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MessageComponent } from '../message/message.component';
import { MyResponse } from '../model/myresponse.model';
import { Strings } from '../resources/resources';

export class Utils{

    constructor(public dialog: MatDialog, private router: Router){}

    ngOnInit(){}

    goToLoginByExpiredToken(mResponse: MyResponse){
        localStorage.setItem("token", null);

        this.dialog.open(MessageComponent, {
            data: {
                title: mResponse.title,
                message: mResponse.description
            }
        }).afterClosed().subscribe( result => {
            this.router.navigate(['login']);
        }); 
    }

    showErrorMessage(){
        this.dialog.open(MessageComponent, {
            data: {
                title: Strings.ERROR,
                message: Strings.ERROR_DESCRIPTION
            }
        });
    }

}
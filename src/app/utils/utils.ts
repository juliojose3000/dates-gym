import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { MyResponse } from '../model/myresponse.model';
import {Codes, Strings} from '../resources/resources';

export class Utils{

    constructor(public dialog: MatDialog, private router: Router){}

    ngOnInit(){}

    goToLoginByExpiredToken(mResponse: MyResponse){
        this.dialog.open(MessageComponent, {
            data: {
                title: mResponse.title,
                message: mResponse.description
            }
        }).afterClosed().subscribe( result => {
            this.router.navigate(['login']);
        }); 
    }

}
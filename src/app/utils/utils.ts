import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { MyResponse } from '../model/myresponse.model';
import {Codes, Strings} from '../resources/resources';

export class Utils{

    constructor(public dialog: MatDialog, private router: Router){}

    ngOnInit(){}

    checkTokenExpired(mResponse: MyResponse){
        if(mResponse.code==Codes.TOKEN_EXPIRED){
            console.log(mResponse);
            this.dialog.open(MessageComponent, {
                data: {
                    title: Strings.GENERAL_ERROR,
                    message: Strings.TOKEN_EXPIRED
                }
            }).afterClosed().subscribe( result => {
                this.router.navigate(['login']);
            });  
        }
      }

}
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from '../header/header.component';
import { MessageComponent } from '../message/message.component';
import { MyResponse } from '../model/myresponse.model';
import { Shift } from '../model/shift.model';
import { DAYS_NAME, MONTHS_NAME, Strings } from '../resources/resources';

export class Utils{

    constructor(public dialog: MatDialog, private router: Router, public datepipe: DatePipe){}

    ngOnInit(){}

    goToLoginByExpiredToken(mResponse: MyResponse){
        localStorage.setItem("token", null);
        document.getElementById("a_login_user").innerHTML = Strings.LOGIN;
        document.getElementById("a_login_user2").innerHTML = Strings.LOGIN;
        document.getElementById("div_logout").style.display = "none";
        document.getElementById("div_logout2").style.display = "none";

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

    dateFormat(date: Date){
        var dateFormatted = this.datepipe.transform(date, "E dd MMM yyyy").split(" ");
        var dayNumber = Number(dateFormatted[1]);
        return `${DAYS_NAME[dateFormatted[0]]}, ${dayNumber} de ${MONTHS_NAME[dateFormatted[2]]}`;
    }

    isExpiredShift(shift: Shift){
        var dateString = this.datepipe.transform(shift.date, 'yyyy-MM-dd');
        var date_time = dateString+" "+shift.startHour;
        var shiftDateTime = new Date(date_time);
        var currentDateTime = new Date();
        return currentDateTime>shiftDateTime;
      }

}
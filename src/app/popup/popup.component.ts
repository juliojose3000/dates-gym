import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReserveService } from '../service/reserve.service';
import { User } from '../model/user.model';
import { Reservation } from '../model/reservation.model';
import { MyResponse } from '../model/myresponse.model';
import { DAYS_NAME, MONTHS_NAME } from '../resources/resources';

@Component({
  selector: 'popup-component',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

    title: string;
    date: Date;
    startHour: string;
    endHour: string;
    reservation: Reservation;
    dateToShow: string;
    buttonLeftText: string;
    buttonRightText: string;
    method:string;
    message:string;


    constructor(
        public dialogRef: MatDialogRef<PopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private reserveService: ReserveService) {
    }

    ngOnInit(): void {

        this.title = this.data.title;
        this.message = this.data.message;
        this.date = new Date(this.data.date);
        this.startHour = this.data.startHour;
        this.endHour = this.data.endHour;
        this.buttonLeftText = this.data.buttonLeftText;
        this.buttonRightText = this.data.buttonRightText;
        this.method = this.data.method;
        this.dateFormat();

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    
    submit(){
        this.reservation = new Reservation(new User(localStorage.getItem('email')), this.date, this.startHour);
        if(this.method=="reservate")
            this.reserveService.make(this.reservation, localStorage.getItem('token')).toPromise().then((mResponse: MyResponse)=>{
                this.closeDialog(mResponse);
            });
        else if(this.method=="cancel")
            this.reserveService.cancel(this.reservation, localStorage.getItem('token')).toPromise().then((mResponse: MyResponse)=>{
                this.closeDialog(mResponse);
            });

    }

    dateFormat(){

        var dayName = DAYS_NAME[this.date.toString().split(" ", 1)[0]];
        var monthName = MONTHS_NAME[this.date.toString().split(" ", 2)[1]];
        this.dateToShow = dayName+', '+this.date.getDate()+' de '+monthName+' del '+this.date.getFullYear();
        this.formatAMPM(this.startHour);

    }

    formatAMPM(time) {
        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
      
    closeDialog(mResponse: MyResponse){
        this.dialogRef.close({ 
            code: mResponse.code,
            isSuccessful: mResponse.isSuccessful,
            title: mResponse.title,
            description: mResponse.description
        });
    }

    dimissDialog(){
        this.dialogRef.close();
    }
    

}

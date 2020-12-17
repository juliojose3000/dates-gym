import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReserveService } from '../../service/reserve.service';
import { User } from '../../model/user.model';
import { Reservation } from '../../model/reservation.model';
import { MyResponse } from '../../model/myresponse.model';
import { DAYS_NAME, MONTHS_NAME } from '../../resources/resources';
import { SpinnerService } from '../../spinner/spinner.service';
import { Utils } from '../../utils/utils';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'reservation_popup-component',
  templateUrl: './reservation_popup.component.html',
  styleUrls: ['./reservation_popup.component.css']
})
export class ReservationPopupComponent implements OnInit {

    title: string;
    date: Date;
    dateString: string;
    startHour: string;
    endHour: string;
    reservation: Reservation;
    dateToShow: string;
    buttonLeftText: string;
    buttonRightText: string;
    method:string;
    message:string;


    constructor(
        public dialogRef: MatDialogRef<ReservationPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private reserveService: ReserveService,
        private spinnerService: SpinnerService,
        private utils: Utils,
        public datepipe: DatePipe) {
    }

    ngOnInit(): void {

        this.title = this.data.title;
        this.message = this.data.message;

        this.date = new Date(this.data.date);
        if(environment.production)
            this.date.setDate(this.date.getDate()+1);//For a strange reason, when I assign this.data.date to the variable this.date, the date loses one day. So in this line I add one day
        this.dateString = this.datepipe.transform(this.date, 'yyyy-MM-dd');

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
        //TODO para pasar a producción cambiar this.date por this.dateString
        this.reservation = new Reservation(new User(localStorage.getItem('email')), this.date, this.startHour);
        this.spinnerService.requestStarted();

        if(this.method=="reservate")
            this.reserveService.make(this.reservation, localStorage.getItem('token')).toPromise().then((mResponse: MyResponse)=>{
                this.closeDialog(mResponse);
            },() => {this.onError();});

        else if(this.method=="cancel")
            this.reserveService.cancel(this.reservation, localStorage.getItem('token')).toPromise().then((mResponse: MyResponse)=>{
                this.closeDialog(mResponse);
            },() => {this.onError();});

    }

    onError(){
        this.spinnerService.resetSpinner();//hide loader
        this.utils.showErrorMessage();//show error message
        this.dimissDialog();//close popup
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
        this.spinnerService.resetSpinner();
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

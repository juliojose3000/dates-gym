import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DAYS_NAME, MONTHS_NAME } from 'src/app/resources/resources';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    dateToShow: string;
    date: Date;
    startHour: string;
    customers: string;
    clients: User[];


    constructor(
        public dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.date = new Date(this.data.date);
            this.startHour = this.data.startHour;
            this.clients = this.data.clients;
    }

    ngOnInit(): void {
        this.dateFormat();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    

    dimissDialog(){
        this.dialogRef.close();
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
    

}

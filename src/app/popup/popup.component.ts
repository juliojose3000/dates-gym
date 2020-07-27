import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReserveService } from '../service/reserve.service';

@Component({
  selector: 'popup-component',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

    title: string;
    message: string;
    date: string;
    startHour: string;
    endHour: string;

    constructor(
            public dialogRef: MatDialogRef<PopupComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any,
            private reserveService: ReserveService) 
        {  }

    ngOnInit(): void {

        this.title = this.data.title;
        this.message = this.data.message;
        this.date = this.data.date;
        this.startHour = this.data.startHour;
        this.endHour = this.data.endHour;

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    
    submit(){

        this.reserveService.getSchedule(this.date, this.startHour);

    }
    

}

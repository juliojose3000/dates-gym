import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReserveService } from '../service/reserve.service';
import { User } from '../model/user.model';
import { Reservation } from '../model/reservation.model';
import { MyResponse } from '../model/myresponse.model';

@Component({
  selector: 'message-component',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

    title: string;
    message: string;


    constructor(
        public dialogRef: MatDialogRef<MessageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private reserveService: ReserveService) {
    }

    ngOnInit(): void {

        this.title = this.data.title;
        this.message = this.data.message;

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    
    closeDialog(){
        this.dialogRef.close({});
    }
    

}

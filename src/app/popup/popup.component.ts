import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReserveService } from '../service/reserve.service';
import { User } from '../model/user.model';
import { Reservation } from '../model/reservation.model';

@Component({
  selector: 'popup-component',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

    title: string;
    message: string;
    date: Date;
    startHour: string;
    endHour: string;

    user: User;
    reservation: Reservation;

    constructor(
        public dialogRef: MatDialogRef<PopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private reserveService: ReserveService) {

        

    }

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
         
        this.user = new User(2, "","","","",false);
        this.reservation = new Reservation(this.user, this.date, this.startHour);

        var response = this.reserveService.make(this.reservation);

        if(response){
            console.log("Se ha reservado la cita con éxito");
        }else{
            console.log("Ocurrió un problema. Inténtelo más tarde");
        }

    }
    

}

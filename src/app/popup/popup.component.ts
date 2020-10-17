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
    response: boolean;

    dateToShow: string;

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
        this.dateFormat();

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    
    submit(){
         
        this.user = new User(-1, "", "", localStorage.getItem('email'), "");
        this.reservation = new Reservation(this.user, this.date, this.startHour);

        let responsex: Promise<boolean>= <Promise<boolean>> this.reserveService.make(this.reservation, localStorage.getItem('token'));

        //TODO show a popup
        if(responsex){
            this.response = true;
            console.log("Se ha reservado la cita con éxito");
        }else{
            this.response = false;
            console.log("Ocurrió un problema. Inténtelo más tarde");
        }

        this.dialogRef.close({ 
            response: this.response,
        });

    }

    dateFormat(){

        var daysName = {
            'Mon': 'Lunes',
            'Tue': 'Martes',
            'Wed': 'Miércoles',
            'Thu': 'Jueves',
            'Fri': 'Viernes'
        };

        var monthsName = {
            'Jan': 'Enero',
            'Feb': 'Febrero',
            'Mar': 'Marzo',
            'Apr': 'Abril',
            'May': 'Mayo',
            'Jun': 'Junio',
            'July': 'Julio',
            'Aug': 'Agosto',
            'Sep': 'Septiembre',
            'Oct': 'Octubre',
            'Nov': 'Noviembre',
            'Dec': 'Diciembre'
        };

        var dayName = daysName[this.date.toString().split(" ", 1)[0]];

        var monthName = monthsName[this.date.toString().split(" ", 2)[1]];

        this.dateToShow = dayName+', '+this.date.getDate()+' de '+monthName+' del '+this.date.getFullYear();

        console.log(this.dateToShow);

        console.log(this.formatAMPM(this.startHour));

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

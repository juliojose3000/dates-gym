import { Component, OnInit } from '@angular/core';
import { Shift } from '../model/shift.model';
import { Schedule } from '../model/schedule.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';
import { ScheduleService } from '../service/schedule.service';
import { AuthenticationService } from '../service/authentication.service';
import { MessageComponent } from '../message/message.component';
import { MyResponse } from '../model/myresponse.model';
import { Utils } from '../utils/utils';
import { Codes, Strings, CSS_CLASSES } from '../resources/resources';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  schedule: Schedule;
  arrayShiefts: Array<Shift[]> = new Array<Shift[]>(); 
  date: string;
  startHour: string;
  class: string;

  constructor(public dialog: MatDialog, private scheduleService: ScheduleService, private utils: Utils) {

    this.scheduleService.get(localStorage.getItem('token')).subscribe((mResponse: MyResponse)=>{  
      if(mResponse.code==Codes.TOKEN_EXPIRED){
        this.utils.goToLoginByExpiredToken(mResponse);
      }else{
        this.schedule = mResponse.data as Schedule;
        this.arrayShiefts = this.schedule.shifts;
        //Busco si algun espacio ha sido reservado por el usuario actual
        this.arrayShiefts.forEach(function (shifts) {
          shifts.forEach(function(shift){
            shift.clients.forEach(function(client){
              if(String(client.id) == localStorage.getItem('userId')){
                shift.cssClass = "cell_reserved"; 
              }
            });
          });
        });//end busqueda
      }//else
    });

  }

  ngOnInit(): void {
  }

  //Cuando hago click en un espacio
  openDialog(date: string, startHour: string, endHour: string){
    const space = document.getElementById(date+"_"+startHour);//clicked space
    this.class = space.getAttribute("class");//get css attribute class

    /**Si la celda tiene el formato estandar, es que aún no ha sido reservada por el usuario, por ende, despliegue 
     * el popup preguntando si quiere reservar el espacio. En caso contrario, muestre el popup preguntando si quiere
     * cancelar la reservación
     */
    if(this.class == CSS_CLASSES.STANDARD_CELL)
      this.reserveDate(date, startHour, endHour);
    else if(this.class == CSS_CLASSES.CELL_RESERVED)
      this.cancelDate(date, startHour, endHour);
  }

  reserveDate(date: string, startHour: string, endHour: string){
    this.date = date;
    this.startHour = startHour;

    //Habro un modal
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        method: "reservate",
        title: "Reservar",
        message: Strings.RESERVATE_SPACE,
        date: date,
        startHour: startHour,
        endHour: endHour,
        buttonLeftText: "Reservar",
        buttonRightText: "Cancelar"
      }
    });

    //Cuando cierro el modal
    dialogRef.afterClosed().subscribe((mResponse: MyResponse) => {

      //Reservación exitosa
      if(mResponse.isSuccessful){
        const space = document.getElementById(this.date+"_"+this.startHour);//obtengo el espacio que reservó el usuario
        var text = space.innerHTML;//obtengo el texto que tiene ese espacio. Ej: Campos disponibles: 5
        var availableSpace = Number(text.split(": ")[1]);//obtengo la cantidad de campos disponibles. Ej: 5
        availableSpace = availableSpace-1;//resto 1 a la cantidad de campos disponibles del espacio. Ej: 4
        space.innerHTML = "Campos disponibles: "+availableSpace; //setteo el nuevo texto al elemento HTML. Ej: Campos disponibles: 4
        space.setAttribute("class","cell_reserved"); //cambio el color del espacio

      //Fallo en la reservación
      }else{
        if(mResponse.code==Codes.TOKEN_EXPIRED) {
          this.utils.goToLoginByExpiredToken(mResponse);
          return;
        }
      }
      //Muestro el resultado: Fallo o Éxito
      this.dialog.open(MessageComponent, {
        data: {
          title: mResponse.title,
          message: mResponse.description
        }
      });

    });

  }


  cancelDate(date: string, startHour: string, endHour: string){

    this.date = date;
    this.startHour = startHour;

    //Habro un modal
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        method: "cancel",
        title: "Cancelar reservación",
        message: Strings.CANCEL_RESERVATION,
        date: date,
        startHour: startHour,
        endHour: endHour,
        buttonLeftText: "Cancelar",
        buttonRightText: "Omitir"
      }
    });

    //Cuando cierro el modal
    dialogRef.afterClosed().subscribe((mResponse: MyResponse) => {
      //Cancelación exitosa
      if(mResponse.isSuccessful){
        const space = document.getElementById(this.date+"_"+this.startHour);//obtengo el espacio que reservó el usuario
        var text = space.innerHTML;//obtengo el texto que tiene ese espacio. Ej: Campos disponibles: 5
        var availableSpace = Number(text.split(": ")[1]);//obtengo la cantidad de campos disponibles. Ej: 5
        availableSpace = availableSpace+1;//sumo 1 a la cantidad de campos disponibles del espacio. Ej: 6
        space.innerHTML = "Campos disponibles: "+availableSpace; //setteo el nuevo texto al elemento HTML. Ej: Campos disponibles: 6
        space.setAttribute("class","cell"); //cambio el color del espacio

      //Fallo en la reservación
      }else{
        if(mResponse.code==Codes.TOKEN_EXPIRED) {
          this.utils.goToLoginByExpiredToken(mResponse);
          return;
        }
      }

      //Muestro el resultado: Fallo o Éxito
      this.dialog.open(MessageComponent, {
        data: {
          title: mResponse.title,
          message: mResponse.description
        }
      });

    });

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

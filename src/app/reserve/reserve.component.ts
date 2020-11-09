import { Component, OnInit } from '@angular/core';
import { Shift } from '../model/shift.model';
import { Schedule } from '../model/schedule.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';
import { ScheduleService } from '../service/schedule.service';
import { AuthenticationService } from '../service/authentication.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  schedule: Schedule;
  arrayShiefts: Array<Shift[]>; 
  response: boolean;
  message: string;
  title: string;
  date: string;
  startHour: string;
  class: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private scheduleService: ScheduleService,
    auten:AuthenticationService) 
  {


    this.scheduleService.get(localStorage.getItem('token')).subscribe((data: any)=>{
      console.log(data);
      this.schedule = data;
      this.arrayShiefts = this.schedule.shifts;

      this.arrayShiefts.forEach(function (shifts) {
        shifts.forEach(function(shift){
          shift.clients.forEach(function(client){
            if(String(client.id) == localStorage.getItem('userId')){
              console.log("Este espacio está reservado por mí");
              shift.cssClass = "cell_reserved"; 
            }
          });
        });
      });

    });


  }

  ngOnInit(): void {
  }

  //Cuando hago click en un espacio
  openDialog(date: string, startHour: string, endHour: string){

    const space = document.getElementById(date+"_"+startHour);//clicked space
    this.class = space.getAttribute("class");//get css attribute class

    if(this.class == "cell")
      this.reserveDate(date, startHour, endHour);
    else if(this.class == "cell_reserved")
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
        message: "Está seguro que desea reservar este espacio",
        date: date,
        startHour: startHour,
        endHour: endHour,
        buttonLeftText: "Reservar",
        buttonRightText: "Cancelar"
      }
    });

    //Cuando cierro el modal
    dialogRef.afterClosed().subscribe(result => {
      this.response = result.response;

      //Reservación exitosa
      if(this.response){
        this.title = "Éxito";
        this.message = "Su cita se ha reservado con éxito";
        const space = document.getElementById(this.date+"_"+this.startHour);//obtengo el espacio que reservó el usuario
        var text = space.innerHTML;//obtengo el texto que tiene ese espacio. Ej: Campos disponibles: 5
        var availableSpace = Number(text.split(": ")[1]);//obtengo la cantidad de campos disponibles. Ej: 5
        availableSpace = availableSpace-1;//resto 1 a la cantidad de campos disponibles del espacio. Ej: 4
        space.innerHTML = "Campos disponibles: "+availableSpace; //setteo el nuevo texto al elemento HTML. Ej: Campos disponibles: 4
        space.setAttribute("class","cell_reserved"); //cambio el color del espacio

      //Fallo en la reservación
      }else{
        this.title = "Error"
        this.message = result.message;
      }

      //Muestro el resultado: Fallo o Éxito
      this.dialog.open(MessageComponent, {
        data: {
          title: this.title,
          message: this.message
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
        message: "Está seguro que desea cancelar la reservación en este espacio",
        date: date,
        startHour: startHour,
        endHour: endHour,
        buttonLeftText: "Cancelar",
        buttonRightText: "Omitir"
      }
    });

    //Cuando cierro el modal
    dialogRef.afterClosed().subscribe(result => {
      this.response = result.response;

      //Reservación exitosa
      if(this.response){
        this.title = "Éxito";
        this.message = "Su cita se ha cancelado";
        const space = document.getElementById(this.date+"_"+this.startHour);//obtengo el espacio que reservó el usuario
        var text = space.innerHTML;//obtengo el texto que tiene ese espacio. Ej: Campos disponibles: 5
        var availableSpace = Number(text.split(": ")[1]);//obtengo la cantidad de campos disponibles. Ej: 5
        availableSpace = availableSpace+1;//sumo 1 a la cantidad de campos disponibles del espacio. Ej: 6
        space.innerHTML = "Campos disponibles: "+availableSpace; //setteo el nuevo texto al elemento HTML. Ej: Campos disponibles: 6
        space.setAttribute("class","cell"); //cambio el color del espacio

      //Fallo en la reservación
      }else{
        this.title = "Error"
        this.message = result.message;
      }

      //Muestro el resultado: Fallo o Éxito
      this.dialog.open(MessageComponent, {
        data: {
          title: this.title,
          message: this.message
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
  

  substractOneSpace(){
    const signUpButton = document.getElementById(this.date+", "+this.startHour);
  }


}

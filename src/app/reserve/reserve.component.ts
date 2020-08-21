import { Component, OnInit } from '@angular/core';
import { Shift } from '../model/shift.model';
import { Schedule } from '../model/schedule.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';
import { ScheduleService } from '../service/schedule.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {


  shiftsMonday: Shift[] = [
    new Shift('2020-08-58', '7:00 am','8:30 am',  6, 3, null),
    new Shift('2020-08-58', '9:00 am','10:30 am',  3, 3, null),
    new Shift('2020-08-58', '11:00 am','12:30 md',  4, 3, null),
    new Shift('2020-08-58', '3:00 pm','4:30 pm',  5, 3, null),
    new Shift('2020-08-58', '5:00 pm','6:30 pm',  7, 3, null),
    new Shift('2020-08-58', '7:00 pm','8:30 pm',  2, 3, null)
  ];

  shiftsTuesday: Shift[] = [
    new Shift('2020-08-58', '7:00 am','8:30 am',  5, 3, null),
    new Shift('2020-08-58', '9:00 am','10:30 am',  5, 3, null),
    new Shift('2020-08-58', '11:00 am','12:30 md',  5, 3, null),
    new Shift('2020-08-58', '3:00 pm','4:30 pm',  5, 3, null),
    new Shift('2020-08-58', '5:00 pm','6:30 pm',  5, 3, null),
    new Shift('2020-08-58', '7:00 pm','8:30 pm',  5, 3, null)
  ];

  shiftsWednesday: Shift[] = [
    new Shift('2020-08-58', '7:00 am','8:30 am',  6, 3, null),
    new Shift('2020-08-58', '9:00 am','10:30 am',  2, 2, null),
    new Shift('2020-08-58', '11:00 am','12:30 md',  5, 2, null),
    new Shift('2020-08-58', '3:00 pm','4:30 pm',  5, 4, null),
    new Shift('2020-08-58', '5:00 pm','6:30 pm',  5, 0, null),
    new Shift('2020-08-58', '7:00 pm','8:30 pm',  5, 1, null)
  ];

  shiftsThursday: Shift[] = [
    new Shift('2020-08-58', '7:00 am','8:30 am',  5, 3, null),
    new Shift('2020-08-58', '9:00 am','10:30 am',  5, 3, null),
    new Shift('2020-08-58', '11:00 am','12:30 md',  5, 3, null),
    new Shift('2020-08-58', '3:00 pm','4:30 pm',  5, 3, null),
    new Shift('2020-08-58', '5:00 pm','6:30 pm',  5, 3, null),
    new Shift('2020-08-58', '7:00 pm','8:30 pm',  5, 3, null)
  ];

  shiftsFriday: Shift[] = [
    new Shift('2020-08-58', '7:00 am','8:30 am',  5, 3, null),
    new Shift('2020-08-58', '9:00 am','10:30 am',  5, 3, null),
    new Shift('2020-08-58', '11:00 am','12:30 md',  5, 3, null),
    new Shift('2020-08-58', '3:00 pm','4:30 pm',  5, 3, null),
    new Shift('2020-08-58', '5:00 pm','6:30 pm',  5, 3, null),
    new Shift('2020-08-58', '7:00 pm','8:30 pm',  5, 3, null)
  ];

  schedule: Schedule;
  arrayShiefts: Array<Shift[]>; 
  date1: Date;
  date2: Date;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private scheduleservice: ScheduleService) 
  {

    this.arrayShiefts = new Array<Shift[]>();

    this.scheduleservice.getSchedule().subscribe((data: any)=>{
      console.log(data);
      this.schedule = data;
      this.arrayShiefts = data.shifts;
    });

  }

  ngOnInit(): void {
  }

  openDialog(date: string, startHour: string, endHour: string){

    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: "Reservar",
        message: "Está seguro que desea reservar este espacio",
        date: date,
        startHour: startHour,
        endHour: endHour
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.router.navigate(['']);
    });

  }

}

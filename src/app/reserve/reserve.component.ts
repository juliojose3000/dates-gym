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

  schedule: Schedule;
  arrayShiefts: Array<Shift[]>; 

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private scheduleService: ScheduleService) 
  {

    this.scheduleService.get().subscribe((data: any)=>{
      console.log(data);
      this.schedule = data;
      this.arrayShiefts = this.schedule.shifts;
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

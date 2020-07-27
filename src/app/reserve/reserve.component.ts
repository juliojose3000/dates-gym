import { Component, OnInit } from '@angular/core';
import { Shift } from '../model/shift.model';
import { Schedule } from '../model/schedule.model';

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

  constructor() 
  {

    this.arrayShiefts = new Array<Shift[]>();

    this.arrayShiefts.push(this.shiftsMonday);
    this.arrayShiefts.push(this.shiftsTuesday);
    this.arrayShiefts.push(this.shiftsWednesday);
    this.arrayShiefts.push(this.shiftsThursday);
    this.arrayShiefts.push(this.shiftsFriday);

    this.date1 = new Date();
    this.date2 = new Date();

    this.schedule = new Schedule(this.arrayShiefts, 55, this.date1, this.date2)
  }

  ngOnInit(): void {
  }

}

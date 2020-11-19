import { Shift } from './shift.model';

export class Schedule {

    shifts: Array<Shift[]>;
    weekNumber: number;
    startDate: Date;
    endDate: Date;

    constructor(
        shifts?: Array<Shift[]>,
        weekNumber?: number,
        startDate?: Date,
        endDate?: Date)
    {
        this.shifts=shifts;
        this.weekNumber=weekNumber;
        this.startDate=startDate;
        this.endDate=endDate;
    }

}
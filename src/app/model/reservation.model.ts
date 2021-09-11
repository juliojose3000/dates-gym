import { User } from './user.model';

export class Reservation{

    shiftDate: string;
    shiftStartHour: string;
    shiftEndHour: string;


    constructor(
        shiftDate: string,
        shiftStartHour: string,
        shiftEndHour: string)
    {
        this.shiftDate = shiftDate;
        this.shiftStartHour = shiftStartHour;
        this.shiftEndHour = shiftEndHour;
    }

    toString(){
        return 'Reservation [ ShiftDate = ' + this.shiftDate + ', ShiftStarHour = ' + this.shiftStartHour+' ]';
    }

}
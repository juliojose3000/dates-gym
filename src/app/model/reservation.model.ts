import { User } from './user.model';

export class Reservation{

    shiftDate: string;
    shiftStartHour: string;


    constructor(
        shiftDate: string,
        shiftStartHour: string)
    {
        this.shiftDate = shiftDate;
        this.shiftStartHour = shiftStartHour;
    }

    toString(){
        return 'Reservation [ ShiftDate = ' + this.shiftDate + ', ShiftStarHour = ' + this.shiftStartHour+' ]';
    }

}
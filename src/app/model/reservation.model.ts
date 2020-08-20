import { User } from './user.model';

export class Reservation{

    user: User;
    shiftDate: Date;
    shiftStartHour: string;


    constructor(
        user: User,
        shiftDate: Date,
        shiftStartHour: string)
    {
        this.user = user;
        this.shiftDate = shiftDate;
        this.shiftStartHour = shiftStartHour;
    }

}
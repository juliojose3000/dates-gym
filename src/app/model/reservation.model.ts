import { User } from './user.model';

export class Reservation{

    user: User;
    shiftDate: string;
    shiftStartHour: string;


    constructor(
        user: User,
        shiftDate: string,
        shiftStartHour: string)
    {
        this.user = user;
        this.shiftDate = shiftDate;
        this.shiftStartHour = shiftStartHour;
    }

}
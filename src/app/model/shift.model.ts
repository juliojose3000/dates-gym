import { User } from './user.model';

export class Shift{

    date: string; //date of year
    startHour: string;
    endHour: string;
    maxSpace: string; //Cupo máximo
    clients: User[];

    constructor(
        date: string,
        startHour: string,
        endHour: string,
        maxSpace: string,
        clients: User[])
    {
        this.date = date;
        this.startHour = startHour;
        this.endHour = endHour;
        this.maxSpace = maxSpace;
        this.clients = clients;
    }

}
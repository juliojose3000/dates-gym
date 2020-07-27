import { User } from './user.model';

export class Shift{

    date: string; //date of year
    startHour: string;
    endHour: string;
    maxSpace: number; //Cupo máximo
    reservedSpace: number;
    availableSpace: number;
    clients: User[];

    constructor(
        date: string,
        startHour: string,
        endHour: string,
        maxSpace: number,
        reservedSpace: number,
        clients: User[])
    {
        this.date = date;
        this.startHour = startHour;
        this.endHour = endHour;
        this.maxSpace = maxSpace;
        this.reservedSpace = reservedSpace;
        this.availableSpace = this.maxSpace - reservedSpace;
        this.clients = clients;
    }

}
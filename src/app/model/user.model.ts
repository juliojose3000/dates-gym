import { Reservation } from "./reservation.model";

export class User{

    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    isEnabled: boolean;
    role: number;
    reservations: Array<Reservation>;

    constructor(id?: number, email?: string, name?: string, phoneNumber?: string,password?: string, isEnabled?: boolean, role?: number, reservations?: Array<Reservation>){
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.isEnabled = isEnabled;
        this.role = role;
    }

    toString(){
        return 'User [ Id = '+ this.id + ', Name = ' + this.name + ', PhoneNumber = ' + this.phoneNumber + ', Email = ' + this.email + ', Password = ' + this.password + ', Role = ' + this.role + ' ]';
    }

}
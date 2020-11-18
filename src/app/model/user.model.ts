export class User{

    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    password: string;

    constructor(email: string, name?: string, phoneNumber?: string,password?: string, id?: number){
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }

}
export class User{

    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    role: number;

    constructor(id?: number, email?: string, name?: string, phoneNumber?: string,password?: string, role?: number){
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    toString(){
        return 'User [ Id = '+ this.id + ', Name = ' + this.name + ', PhoneNumber = ' + this.phoneNumber + ', Email = ' + this.email + ', Password = ' + this.password + ', IsAdmin = ' + this.role + ' ]';
    }

}
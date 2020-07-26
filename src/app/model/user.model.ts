export class User{

    id: number;
    name: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    isAdmin: boolean;

    constructor(
        id: number,
        name: string,
        lastname: string,
        phoneNumber: string,
        email: string,
        isAdmin: boolean)
    {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.isAdmin = isAdmin;
    }

}
export class User{

    id: number;
    name: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
    isAdmin: boolean;

    constructor(
        id: number,
        name: string,
        lastname: string,
        phoneNumber: string,
        email: string,
        username: string,
        password: string,
        isAdmin: boolean)
    {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
    }

}
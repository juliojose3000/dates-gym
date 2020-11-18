export class MyResponse{

    isSuccessful: boolean;
    title: string;
    description: string;
    code: number;
    token: string;
    data: Object;

    constructor(isSuccessful: boolean, title: string, description: string, code: number, token: string, data: Object)
    {
        this.isSuccessful = isSuccessful;
        this.title = title;
        this.description = description;
        this.code = code;
        this.token = token;
        this.data = data;
    }

}
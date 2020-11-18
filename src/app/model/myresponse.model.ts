export class MyResponse{

    //TODO por qué no funk isSuccesful
    successful: boolean;
    title: string;
    message: string;
    code: number;
    token: string;
    data: Object;

    constructor(successful: boolean, title: string, message: string, code: number, token: string, data: Object)
    {
        this.successful = successful;
        this.title = title;
        this.message = message;
        this.code = code;
        this.token = token;
        this.data = data;
    }

}
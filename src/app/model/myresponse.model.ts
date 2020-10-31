export class MyResponse{

    //TODO por qué no funk isSuccesful
    successful: boolean;
    message: string;
    code: number;
    token: string;
    data: Object;

    constructor(successful: boolean, message: string, code: number, token: string, data: Object)
    {
        this.successful = successful;
        this.message = message;
        this.code = code;
        this.token = token;
        this.data = data;
    }

}
export class ResetPassword{

    userEmail: string;
    resetLinkCode: string;
    newPassword: string;

    constructor(
        userEmail: string,
        resetLinkCode: string,
        newPassword: string)
    {
        this.userEmail = userEmail;
        this.resetLinkCode = resetLinkCode;
        this.newPassword = newPassword;
    }

}
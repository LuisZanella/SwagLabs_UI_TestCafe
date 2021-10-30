import { Selector } from 'testcafe';

export class LogInPage {
    private _userName: Selector;
    private _password: Selector;
    private _btnLogin: Selector;
    private _errorMessage: Selector;

    constructor() {
        this._userName = Selector('#user-name');
        this._password = Selector('#password');
        this._btnLogin = Selector('#login-button');
        this._errorMessage = Selector('div.error-message-container.error');
    }

    public async userLogIn(ctx: TestController, userName: string, password: string) : Promise<void> {
        await ctx.typeText(this._userName, userName)
                .typeText(this._password, password)
                .click(this._btnLogin);
    }

    public hasLogInError() {
        return this._errorMessage.hasChildElements;
    }

}
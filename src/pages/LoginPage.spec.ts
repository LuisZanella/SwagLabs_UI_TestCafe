import { Selector } from 'testcafe';

class LogInPage {
    private _txtUserName: Selector;
    private _txtPassword: Selector;
    private _btnLogin: Selector;
    private _errorMessage: Selector;

    constructor() {
        this._txtUserName = Selector('#user-name');
        this._txtPassword = Selector('#password');
        this._btnLogin = Selector('#login-button');
        this._errorMessage = Selector('div.error-message-container.error');
    }

    public async userLogIn(ctx: TestController, userName: string, password: string) : Promise<void> {
        await ctx.typeText(this._txtUserName, userName);
        await ctx.typeText(this._txtPassword, password)
        await ctx.click(this._btnLogin);
    }

    public async hasLogInErrorMessage() {
        return await this._errorMessage.hasChildElements;
    }

}

export default new LogInPage();
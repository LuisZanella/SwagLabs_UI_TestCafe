import { Selector } from 'testcafe';
import { getInnerTextNumberFromItem } from "../Utils/Utils.spec";
import * as faker from 'faker'

class CheckoutPage {

    private _btnFinish: Selector;
    private _btnContinue: Selector;
    private _txtFirstName: Selector;
    private _txtLastName: Selector;
    private _txtZipCode: Selector;


    constructor() {
        this._btnContinue = Selector('#continue');
        this._txtFirstName = Selector('#first-name');
        this._txtLastName = Selector('#last-name');
        this._txtZipCode = Selector('#postal-code');
        this._btnFinish = Selector('#finish');
    }

    public async fillCheckOutInformation(ctx: TestController){
        await ctx.typeText(this._txtFirstName, faker.name.firstName());
        await ctx.typeText(this._txtLastName, faker.name.lastName());
        await ctx.typeText(this._txtZipCode, faker.address.zipCode());
    }

    public async clickBtnContinue(ctx: TestController) {
        await ctx.click(this._btnContinue);
    }

    public async clickBtnFinnish(ctx: TestController) {
        await ctx.click(this._btnFinish);
    }
}

export default new CheckoutPage();
import { Selector } from 'testcafe';
import * as faker from 'faker';

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

  /**
   *
   * @param ctx             test case context
   *
   * Method to click the continue btn and continue
   * with order steps
   *
   */
  public async fillCheckOutInformation(ctx: TestController): Promise<void> {
    await ctx.typeText(this._txtFirstName, faker.name.firstName());
    await ctx.typeText(this._txtLastName, faker.name.lastName());
    await ctx.typeText(this._txtZipCode, faker.address.zipCode());
  }

  /**
   *
   * @param ctx             test case context
   *
   * Method to click the continue btn continue
   * with order steps
   *
   */
  public async clickBtnContinue(ctx: TestController): Promise<void> {
    await ctx.click(this._btnContinue);
  }

  /**
   *
   * @param ctx             test case context
   *
   * Method to click the finish btn and end the order
   *
   */
  public async clickBtnFinnish(ctx: TestController): Promise<void> {
    await ctx.click(this._btnFinish);
  }
}

export default new CheckoutPage();

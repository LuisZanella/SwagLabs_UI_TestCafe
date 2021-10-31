
import { getClientLocation } from '../Utils/Utils.spec';
import { Login, Inventory, Cart, Checkout } from "../pages/Index.spec";
import { multipleObjectAssertion } from '../support/Assertion.spec';
import { UserTestData } from '../testData/Index.spec';
import { User } from '../models/Index.spec';
import { ConstantData } from '../support/Index.spec';

fixture `Swag_Labs CheckOut Tests`
  .page `${process.env.ENV_URL}`;

/**
 * - Swag_Labs_CheckOut_p0
 * 
 *  @param   ctx   test case context
 * 
 * This is a positive test case to validate 
 * the user can go to the checkout complete page.
 * 
 */
UserTestData.forEach((user: User) => {
  test('User can checkout the order', async ctx => {
    // Step 1
    await Login.userLogIn(ctx, user.userName, user.password);
    await ctx.expect(getClientLocation()).eql(`${process.env.ENV_URL}${ConstantData.inventoryPathURL}`, `UserName: ${user.userName}` ,{ timeout: 10000 });
    // Step 2 and 3
    const itemsCount = await Inventory.getItemsCount();
    const items = await Inventory.addItemsToCart(ctx);
    await ctx.expect(itemsCount).eql(items.length, `Items found: ${JSON.stringify(items)}`);
    // Step 4
    await Inventory.clickShoppingCart(ctx);
    await ctx.expect(getClientLocation()).eql(`${process.env.ENV_URL}${ConstantData.cartPathURL}`, { timeout: 10000 });
    // Step 5
    const cartItems = await Cart.getCartItems(ctx);
    await multipleObjectAssertion(ctx, items, cartItems);
    // Step 6
    await Cart.clickBtnCheckOut(ctx);
    await ctx.expect(getClientLocation()).eql(`${process.env.ENV_URL}${ConstantData.checkOut_Step1_PathURL}`, { timeout: 10000 });
    // Step 7
    await Checkout.fillCheckOutInformation(ctx);
    // Step 8
    await Checkout.clickBtnContinue(ctx);
    await ctx.expect(getClientLocation()).eql(`${process.env.ENV_URL}${ConstantData.checkOut_Step2_PathURL}`, { timeout: 10000 });
    // Step 9
    await Checkout.clickBtnFinnish(ctx);
    await ctx.expect(getClientLocation()).eql(`${process.env.ENV_URL}${ConstantData.checkOutCompletePathURL}`, { timeout: 10000 });
  });
});
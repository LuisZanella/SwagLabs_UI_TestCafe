import { getClientLocation } from '@helpers/utils/Utils.spec';
import { Login, Inventory, Cart, Checkout } from '@pageModels/Index.spec';
import { multipleObjectAssertion } from '@helpers/support/Assertion.spec';
import { UserTestData } from '@data/Index.spec';
import { User } from '@helpers/interfaces/Index.spec';
import { ConstantData } from '@helpers/support/Index.spec';

fixture`Swag_Labs CheckOut Tests`.page`${process.env.ENV_URL}`;

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
  test('User can checkout the order', async (ctx) => {
    // Step 1
    await Login.userLogIn(ctx, user.userName, user.password);
    await ctx
      .expect(getClientLocation())
      .eql(`${process.env.ENV_URL}${ConstantData.inventoryPathURL}`, `UserName: ${user.userName}`);
    // Step 2 and 3
    const itemsCount = await Inventory.getItemsCount();
    const items = await Inventory.addItemsToCart(ctx);
    await ctx.expect(itemsCount).eql(items.length, `Items found: ${JSON.stringify(items)}`);
    // Step 4
    await Inventory.clickShoppingCart(ctx);
    await ctx.expect(getClientLocation()).eql(`${process.env.ENV_URL}${ConstantData.cartPathURL}`);
    // Step 5
    const cartItems = await Cart.getCartItems(ctx);
    await multipleObjectAssertion(ctx, items, cartItems);
    // Step 6
    await Cart.clickBtnCheckOut(ctx);
    await ctx
      .expect(getClientLocation())
      .eql(`${process.env.ENV_URL}${ConstantData.checkOut_Step1_PathURL}`);
    // Step 7
    await Checkout.fillCheckOutInformation(ctx);
    // Step 8
    await Checkout.clickBtnContinue(ctx);
    await ctx
      .expect(getClientLocation())
      .eql(`${process.env.ENV_URL}${ConstantData.checkOut_Step2_PathURL}`);
    // Step 9
    await Checkout.clickBtnFinnish(ctx);
    await ctx
      .expect(getClientLocation())
      .eql(`${process.env.ENV_URL}${ConstantData.checkOutCompletePathURL}`);
  });
});

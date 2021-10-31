import { getClientLocation } from '../Utils/Utils.spec';
import { Login, Inventory, Cart } from "../pages/Index.spec";
import { multipleObjectAssertion } from '../support/Assertion.spec';
import { UserTestData } from '../testData/Index.spec';
import { User } from '../models/Index.spec';
import { ConstantData } from '../support/Index.spec';

fixture `Swag_Labs Cart Tests`
  .page `${process.env.ENV_URL}`;

/**
 * - Swag_Labs_ShoppingCart_P0
 * 
 *  @param   ctx   test case context
 * 
 * This is a positive test case to validate 
 * that the items could be added to the shopping cart.
 * 
 */
UserTestData.forEach((user: User) => {
  test('Add items to the shopping car', async ctx => {
    //Step 1
    await Login.userLogIn(ctx, user.userName, user.password);
    await ctx.expect(getClientLocation()).eql(`${process.env.ENV_URL}${ConstantData.inventoryPathURL}`, `UserName: ${user.userName}` ,{ timeout: 10000 });
    //Step 2
    const itemsCount = await Inventory.getItemsCount();
    const items = await Inventory.addItemsToCart(ctx);
    await ctx.expect(itemsCount).eql(items.length, `Items found: ${JSON.stringify(items)}`);
    //Step 3
    await Inventory.clickShoppingCart(ctx);
    await ctx.expect(getClientLocation()).eql(`${process.env.ENV_URL}${ConstantData.cartPathURL}`, { timeout: 10000 });
    //Step 4
    const cartItems = await Cart.getCartItems(ctx);
    await multipleObjectAssertion(ctx, items, cartItems);

  });
});
/**
 * - Swag_Labs_ShoppingCart_p1
 * 
 *  @param   ctx   test case context
 * 
 *  This is a positive test case to validate 
 *  that the ‘Sauce Labs Onesie’ item from 
 *  the list can be added to the shopping cart.
 * 
 */
UserTestData.forEach((user: User) => {
  test(`Add "${ConstantData.shoppingSpecificItem}" item to the shopping car`, async ctx => {
    // Step 1
    await Login.userLogIn(ctx, user.userName, user.password);
    await ctx.expect(getClientLocation()).eql(`${process.env.ENV_URL}${ConstantData.inventoryPathURL}`, `UserName: ${user.userName}` ,{ timeout: 10000 });
    // Step 2
    const item = await Inventory.addItemsToCart(ctx, ConstantData.shoppingSpecificItem);
    // Step 3
    await Inventory.clickShoppingCart(ctx);
    await ctx.expect(getClientLocation()).eql(`${process.env.ENV_URL}${ConstantData.cartPathURL}`, { timeout: 10000 });
    // Step 4
    const cartItem = await Cart.getCartItems(ctx);
    await multipleObjectAssertion(ctx, item, cartItem);

  });
});
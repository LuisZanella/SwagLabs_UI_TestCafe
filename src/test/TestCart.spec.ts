import { getClientLocation } from '../Utils/Utils.spec'
import { Login, Inventory, Cart } from "../pages/Index.spec";
import { multipleObjectAssertion } from '../support/Assertion.spec'

fixture `Swag_Labs Cart Tests`
    .page `https://www.saucedemo.com/`;


/**
 * - Swag_Labs_ShoppingCart_P0
 * 
 *  @param   ctx   test case context
 * 
 * This is a positive test case to validate 
 * that the items could be added to the shopping cart.
 * 
 */
 test('Add items to the shopping car', async ctx => {
    await Login.userLogIn(ctx, 'standard_user', 'secret_sauce');

    const itemsCount = await Inventory.getItemsCount();
    const items = await Inventory.addItemsToCart(ctx);
    await ctx.expect(itemsCount).eql(items.length, `Items found: ${JSON.stringify(items)}`);

    await Inventory.clickShoppingCart(ctx);
    await ctx.expect(getClientLocation()).eql('https://www.saucedemo.com/cart.html', { timeout: 10000 });
    const cartItems = await Cart.getCartItems(ctx);
    await multipleObjectAssertion(ctx, items, cartItems);

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
 test('Add and Specific item to the shopping car', async ctx => {
    await Login.userLogIn(ctx, 'standard_user', 'secret_sauce');

    const item = await Inventory.addItemsToCart(ctx, 'Sauce Labs Onesie');
    await Inventory.clickShoppingCart(ctx);
    await ctx.expect(getClientLocation()).eql('https://www.saucedemo.com/cart.html', { timeout: 10000 });
    const cartItem = await Cart.getCartItems(ctx);
    await multipleObjectAssertion(ctx, item, cartItem);

});
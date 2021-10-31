
import { getClientLocation } from '../Utils/Utils.spec'
import { Login, Inventory, Cart, Checkout } from "../pages/Index.spec";
import { multipleObjectAssertion } from '../support/Assertion.spec'

fixture `Swag_Labs CheckOut Tests`
    .page `https://www.saucedemo.com/`;

/**
 * - Swag_Labs_CheckOut_p0
 * 
 *  @param   ctx   test case context
 * 
 * This is a positive test case to validate 
 * the user can go to the checkout complete page.
 * 
 */
 test('User can checkout the order', async ctx => {
    await Login.userLogIn(ctx, 'standard_user', 'secret_sauce');

    const itemsCount = await Inventory.getItemsCount();
    const items = await Inventory.addItemsToCart(ctx);
    await ctx.expect(itemsCount).eql(items.length, `Items found: ${JSON.stringify(items)}`);

    await Inventory.clickShoppingCart(ctx);
    await ctx.expect(getClientLocation()).eql('https://www.saucedemo.com/cart.html', { timeout: 10000 });
    const cartItems = await Cart.getCartItems(ctx);
    await multipleObjectAssertion(ctx, items, cartItems);

    await Cart.clickBtnCheckOut(ctx);
    await ctx.expect(getClientLocation()).eql('https://www.saucedemo.com/checkout-step-one.html', { timeout: 10000 });
    await Checkout.fillCheckOutInformation(ctx);
    await Checkout.clickBtnContinue(ctx);
    
    await ctx.expect(getClientLocation()).eql('https://www.saucedemo.com/checkout-step-two.html', { timeout: 10000 });
    await Checkout.clickBtnFinnish(ctx);
    await ctx.expect(getClientLocation()).eql('https://www.saucedemo.com/checkout-complete.html', { timeout: 10000 });
});
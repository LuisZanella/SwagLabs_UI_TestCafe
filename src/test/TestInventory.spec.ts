import { getClientLocation } from '../Utils/Utils.spec'
import { Login, Inventory } from "../pages/Index.spec";
import { isNextItemHigherAssertion } from '../support/Assertion.spec'

fixture `Swag_Labs Inventory Tests`
    .page `https://www.saucedemo.com/`;

/**
 * - Swag_Labs_LogOut_P0
 * 
 *  @param   ctx   test case context
 * 
 * This is a positive test case to validate 
 * if the user can logout and gets redirect to the LoginPage.
 * 
 */
    test('User logout', async ctx => {
        await Login.userLogIn(ctx, 'standard_user', 'secret_sauce');
        await Inventory.userLogOut(ctx);
        
        await ctx.expect(getClientLocation()).eql('https://www.saucedemo.com/', { timeout: 10000 });
    });

/**
 * - Swag_Labs_Products_P0
 * 
 *  @param   ctx   test case context
 * 
 * This is a positive test case to validate
 *  if the products can be ordered by low to high Price.
 * 
 */
     test('Product filter by low to high Price', async ctx => {
        await Login.userLogIn(ctx, 'standard_user', 'secret_sauce');
        await Inventory.filterLowToHighPrice(ctx);
        let items = await Inventory.getOrAddItemsInList(ctx, false);
        
        await isNextItemHigherAssertion(ctx, items, 'price');
    });

    



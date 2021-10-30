import { getClientLocation } from '../Utils/Utils.spec'
import { Login } from "../pages/Index";

fixture `Swag_Labs Login Tests`
    .page `https://www.saucedemo.com/`;


/**
 * - Swag_Labs_Login_P0
 * 
 *  @param   ctx   test case context
 * 
 * This is a positive test case to validate 
 * if the login works with valid user credentials.
 * 
 */

 test('Login with valid credentials', async ctx => {
    const login = new Login();
    await login.userLogIn(ctx, 'standard_user', 'secret_sauce')
    await ctx.expect(getClientLocation()).contains('https://www.saucedemo.com/inventory.html');
});


/**
 * - Swag_Labs_Login_N0
 * 
 *  @param   ctx   test case context
 * 
 * This is a negative test case to validate 
 * if the login doesn't works with invalid user credentials.
 * 
 * 
 */

    test('Login with invalid credentials', async ctx => {
        const login = new Login();
        await login.userLogIn(ctx, 'admin', 'admin')
        await ctx.expect(login.hasLogInError()).eql(true);
    });




import { getClientLocation } from '../Utils/Utils.spec'
import { Login } from "../pages/Index.spec";
import { User } from "../models/Index.spec"
import { UserTestData, InvalidUsersTestData } from '../testData/Index.spec';

fixture `Swag_Labs LogIn Tests`
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
 UserTestData.forEach((user: User) => {
    test('Login with valid credentials', async ctx => {
        //Step 1
        await Login.userLogIn(ctx, user.userName, user.password);
        await ctx.expect(getClientLocation()).eql('https://www.saucedemo.com/inventory.html', `UserName: ${user.userName}` ,{ timeout: 10000 });
    });
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
 InvalidUsersTestData.forEach((user: User) => {
    test('Login with invalid credentials', async ctx => {
        //Step 1
        await Login.userLogIn(ctx, user.userName, user.password);
        await ctx.expect(await Login.hasLogInErrorMessage()).eql(true, `UserName: ${user.userName}`);
    });
 })



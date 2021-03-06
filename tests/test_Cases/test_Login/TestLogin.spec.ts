import { getClientLocation } from '@helpers/utils/Utils.spec';
import { Login } from '@pageModels/Index.spec';
import { User } from '@helpers/interfaces/Index.spec';
import { UserTestData, InvalidUsersTestData } from '@data/Index.spec';
import ConstantData from '@helpers/support/ConstantData.spec';

fixture`Swag_Labs LogIn Tests`.page`${process.env.ENV_URL}`;

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
  test('Login with valid credentials', async (ctx) => {
    //Step 1
    await Login.userLogIn(ctx, user.userName, user.password);
    await ctx
      .expect(getClientLocation())
      .eql(`${process.env.ENV_URL}${ConstantData.inventoryPathURL}`, `UserName: ${user.userName}`);
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
  test('Login with invalid credentials', async (ctx) => {
    //Step 1
    await Login.userLogIn(ctx, user.userName, user.password);
    await ctx.expect(await Login.hasLogInErrorMessage()).eql(true, `UserName: ${user.userName}`);
    await ctx
      .expect(getClientLocation())
      .eql(`${process.env.ENV_URL}${ConstantData.loginPathURL}`, `UserName: ${user.userName}`);
  });
});

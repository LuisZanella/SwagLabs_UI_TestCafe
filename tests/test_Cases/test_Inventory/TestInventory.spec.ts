import { getClientLocation } from '@helpers/utils/Utils.spec';
import { Login, Inventory } from '@pageModels/Index.spec';
import { ConstantData, isNextItemHigherAssertion } from '@helpers/support/Index.spec';
import { UserTestData } from '@data/Index.spec';
import { User } from '@helpers/interfaces/Index.spec';

fixture`Swag_Labs Inventory Tests`.page`${process.env.ENV_URL}`;

/**
 * - Swag_Labs_LogOut_P0
 *
 *  @param   ctx   test case context
 *
 * This is a positive test case to validate
 * if the user can logout and gets redirect to the LoginPage.
 *
 */
UserTestData.forEach((user: User) => {
  test('User logout', async (ctx) => {
    // Step 1
    await Login.userLogIn(ctx, user.userName, user.password);
    await ctx
      .expect(getClientLocation())
      .eql(`${process.env.ENV_URL}${ConstantData.inventoryPathURL}`, `UserName: ${user.userName}`, {
        timeout: 10000,
      });
    // Step 2
    await Inventory.userLogOut(ctx);
    await ctx
      .expect(getClientLocation())
      .eql(`${process.env.ENV_URL}${ConstantData.loginPathURL}`, { timeout: 10000 });
  });
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
UserTestData.forEach((user: User) => {
  test('Product filter by low to high Price', async (ctx) => {
    // Step 1
    await Login.userLogIn(ctx, user.userName, user.password);
    await ctx
      .expect(getClientLocation())
      .eql(`${process.env.ENV_URL}${ConstantData.inventoryPathURL}`, `UserName: ${user.userName}`, {
        timeout: 10000,
      });
    //Step 2
    await Inventory.filterLowToHighPrice(ctx);
    const items = await Inventory.getOrAddItemsInList(ctx, false);
    await isNextItemHigherAssertion(ctx, items, 'price');
  });
});

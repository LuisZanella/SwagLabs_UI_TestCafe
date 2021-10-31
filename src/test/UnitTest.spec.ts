import { getClientLocation } from '../Utils/Utils.spec';

fixture `Swag_Labs Unit Test`
  .page `https://www.saucedemo.com/`;

/**
 * 
 *  @param   ctx   test case context
 * 
 * This is an unit test to see if
 * we can go to the main LogIn page
 * 
 */
test('Page location', async ctx => {
  await ctx
    .expect(getClientLocation()).eql('https://www.saucedemo.com/');
});
    
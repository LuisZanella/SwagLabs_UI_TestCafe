import ConstantData from '../support/ConstantData.spec';
import { getClientLocation } from '../Utils/Utils.spec';

fixture `Swag_Labs Unit Test`
  .page `${process.env.ENV_URL}`;

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
    .expect(getClientLocation()).eql(`${process.env.ENV_URL}${ConstantData.loginPathURL}`);
});
    
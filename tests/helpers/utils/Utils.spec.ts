import { NotANumberException } from '@helpers/utils/Exceptions.spec';
import { ClientFunction } from 'testcafe';

/**
 *
 * Method to get the current URL
 *
 */
export const getClientLocation = ClientFunction(() => document.location.href);

/**
 *
 * @param number          number to be verified
 *
 * Method to see if an element is a number
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (number: any): boolean => {
  return !isNaN(parseFloat(number)) && isFinite(number);
};

/**
 *
 * @param ctx             test case context
 * @param item            item where the searchElement will be searched
 * @param searchElement   property to get the searchElement from the item  (ie: class = .Item_class)
 *
 * Method to get a number from an Inner Text
 * that is inside of an Item
 *
 */
export const getInnerTextNumberFromItem = async (item: Selector, searchElement: string) => {
  let value = await item.find(searchElement).innerText;
  value = value.replace(/\$/g, '');
  if (!isNumber(value)) throw new NotANumberException();
  return parseFloat(value);
};

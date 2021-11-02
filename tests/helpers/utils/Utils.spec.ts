import { NotANumberException } from '@helpers/utils/Exceptions.spec';
import { ClientFunction } from 'testcafe';

export const getClientLocation = ClientFunction(() => document.location.href);

export const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export const getInnerTextNumberFromItem = async (item: Selector, element: string) => {
  let value = await item.find(element).innerText;
  value = value.replace(/\$/g, '');
  if (!isNumber(value)) throw new NotANumberException();
  return parseFloat(value);
};

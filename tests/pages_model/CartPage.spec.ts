import Item from '@helpers/interfaces/Item.spec';
import { getInnerTextNumberFromItem } from '@helpers/utils/Utils.spec';
import { Selector } from 'testcafe';

class CartPage {
  private _itemsInCart: Selector;
  private _btnCheckout: Selector;

  constructor() {
    this._itemsInCart = Selector('#cart_contents_container').find('div.cart_item');
    this._btnCheckout = Selector('#checkout');
  }

  public async getCartItems(ctx: TestController): Promise<Item[]> {
    const inventorySize = await this._itemsInCart.count;

    const currentItems: Item[] = [];

    for (let i = 0; i < inventorySize; i++) {
      const item = this._itemsInCart.nth(i);

      const currentItemName = await item.find('div.inventory_item_name').innerText;
      const currentQuantity = await getInnerTextNumberFromItem(item, 'div.cart_quantity');
      const currentPrice = await getInnerTextNumberFromItem(item, 'div.inventory_item_price');

      const currentItem: Item = {
        name: currentItemName,
        price: currentPrice,
        quantity: currentQuantity,
      };

      currentItems.push(currentItem);
      await ctx.scroll(item, 'center');
    }

    return currentItems;
  }

  public async clickBtnCheckOut(ctx: TestController) {
    await ctx.click(this._btnCheckout);
  }
}

export default new CartPage();

import { Selector } from 'testcafe';
import Item from '../models/Item.spec';
import { getInnerTextNumberFromItem } from "../Utils/Utils.spec";

class CartPage {

    private _itemsInCart: Selector;
    private _btnCheckout: Selector;

    constructor() {
        this._itemsInCart = Selector('#cart_contents_container').find('div.cart_item');
        this._btnCheckout = Selector('#checkout');
    }

    public async getCartItems(ctx: TestController):Promise<Item[]> {
        
        const inventorySize = await this._itemsInCart.count;

        let currentItems:Item[] = [];
        
        for (let i = 0; i < inventorySize; i++) {
            let item = this._itemsInCart.nth(i);

            let currentItemName = await item.find('div.inventory_item_name').innerText;
            let currentQuantity =  await getInnerTextNumberFromItem(item,'div.cart_quantity');
            let currentPrice =  await getInnerTextNumberFromItem(item,'div.inventory_item_price');

            let currentItem: Item = {
                name: currentItemName,
                price: currentPrice,
                quantity: currentQuantity
            }

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
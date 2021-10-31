import { Selector } from 'testcafe';
import { getInnerTextNumberFromItem } from "../Utils/Utils.spec";
import {Item} from '../models/Index.spec';


class InventoryPage {

    private _sltSortFilter : Selector;
    private _btnShoppingCart: Selector;
    private _btnLogoutSideBar: Selector;
    private _btnBurgerMenu: Selector;
    private _inventoryItems: Selector;

    constructor() {
        this._sltSortFilter = Selector('select[data-test="product_sort_container"]');
        this._btnLogoutSideBar = Selector('#logout_sidebar_link');
        this._btnBurgerMenu = Selector('#menu_button_container').find("button");
        this._btnShoppingCart = Selector('#shopping_cart_container').child('a.shopping_cart_link');
        this.refreshInventoryItems();
    }

    private refreshInventoryItems() {
        this._inventoryItems = Selector('#inventory_container').child('div.inventory_list');
    }

    public async filterLowToHighPrice(ctx: TestController){
        await ctx.click(this._sltSortFilter).click(this._sltSortFilter.find('[value="lohi"]'))
    }

    public async getOrAddItemsInList(ctx: TestController, addItems: boolean, addSpecificItem?: string): Promise<Item[]>{
        let itemsInCar: Item[] = [];
        const inventorySize = await this.getItemsCount();

        for (let i = 0; i < inventorySize; i++) {
            let btnAddItem = this._inventoryItems.child(i).find('button.btn.btn_primary.btn_small.btn_inventory');
            let itemPrice = await getInnerTextNumberFromItem(this._inventoryItems.child(i),'div.inventory_item_price');
            let itemName = await this._inventoryItems.child(i).find('div.inventory_item_name').innerText;
            
            let item : Item = {
                name: itemName,
                price: itemPrice,
                quantity: 1
            };

            await ctx.scroll(btnAddItem, 'center');
            if(addItems) {
                if(!addSpecificItem) {
                    await ctx.click(btnAddItem);
                    itemsInCar.push(item);
                } else {
                    if(itemName.localeCompare(addSpecificItem) === 0) {
                        await ctx.click(btnAddItem);
                        itemsInCar.push(item);
                    }
                }
            }

        }
        return itemsInCar;
    }

    public async getItemsCount(): Promise<number> {
        return await this._inventoryItems.childElementCount;
    }

    public async addItemsToCart(ctx: TestController, addItemsToCart?: string): Promise<Item[]> {
        const itemsInCart = await this.getOrAddItemsInList(ctx, true, addItemsToCart);
        await ctx.scroll(this._btnShoppingCart, 'top');
        return itemsInCart;
    }

    public async clickShoppingCart(ctx: TestController){
        await ctx.click(this._btnShoppingCart);
    }

    public async userLogOut(ctx: TestController) {
        await ctx.click(this._btnBurgerMenu);
        await ctx.click(this._btnLogoutSideBar);  
    }

}

export default new InventoryPage();
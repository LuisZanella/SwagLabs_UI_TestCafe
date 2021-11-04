import { getInnerTextNumberFromItem } from '@helpers/utils/Utils.spec';
import { Item } from '@helpers/interfaces/Index.spec';
import { Selector } from 'testcafe';

class InventoryPage {
  private _sltSortFilter: Selector;
  private _btnShoppingCart: Selector;
  private _btnLogoutSideBar: Selector;
  private _btnBurgerMenu: Selector;
  private _inventoryItems: Selector;

  constructor() {
    this._sltSortFilter = Selector('select[data-test="product_sort_container"]');
    this._btnLogoutSideBar = Selector('#logout_sidebar_link');
    this._btnBurgerMenu = Selector('#menu_button_container').find('button');
    this._btnShoppingCart = Selector('#shopping_cart_container').child('a.shopping_cart_link');
    this.refreshInventoryItems();
  }

  /**
   *
   * Method to refresh the items variable
   *
   */
  private refreshInventoryItems(): void {
    this._inventoryItems = Selector('#inventory_container').child('div.inventory_list');
  }

  /**
   *
   * @param ctx             test case context
   * @param indexList       the index of the item in the list
   * @param itemKeyName     the key name for the item
   *
   * Method to add an item to the Cart
   *
   */
  private async addItemToCart(
    ctx: TestController,
    indexList: number,
    itemKeyName: string
  ): Promise<void> {
    const btnAddItem = this._inventoryItems
      .child(indexList)
      .find(`[data-test="add-to-cart-${itemKeyName}"]`);
    await ctx.scroll(btnAddItem, 'center');
    await ctx.click(btnAddItem);
    this.refreshInventoryItems();
    const removeBtnExist = await this._inventoryItems
      .child(indexList)
      .find(`[data-test="remove-${itemKeyName}"]`).exists;
    await ctx.expect(true).eql(removeBtnExist, 'New button should appear');
  }

  /**
   *
   * @param ctx             test case context
   *
   * Method to click the filter Low To High Price
   *
   */
  public async filterLowToHighPrice(ctx: TestController): Promise<void> {
    await ctx.click(this._sltSortFilter).click(this._sltSortFilter.find('[value="lohi"]'));
  }

  /**
   *
   * @param ctx             test case context
   * @param addItems        boolean parameter to add all the items to the cart
   * @param addSpecificItem if the addItems paramter is active we can add only one specific item
   *
   * Method to click get all the items
   * in the list or to add items to the list
   *
   */
  public async getOrAddItemsInList(
    ctx: TestController,
    addItems: boolean,
    addSpecificItem?: string
  ): Promise<Item[]> {
    const itemsInCar: Item[] = [];
    const items: Item[] = [];
    const inventorySize = await this.getItemsCount();

    for (let i = 0; i < inventorySize; i++) {
      const itemPrice = await getInnerTextNumberFromItem(
        this._inventoryItems.child(i),
        'div.inventory_item_price'
      );
      const itemName = await this._inventoryItems.child(i).find('div.inventory_item_name')
        .innerText;
      const itemKeyName = itemName.toLowerCase().replace(/\s/g, '-');

      const item: Item = {
        name: itemName,
        price: itemPrice,
        quantity: 1,
      };

      if (addItems) {
        if (addSpecificItem && itemName.localeCompare(addSpecificItem) === 0) {
          await this.addItemToCart(ctx, i, itemKeyName);
          itemsInCar.push(item);
        }
        if (!addSpecificItem) {
          await this.addItemToCart(ctx, i, itemKeyName);
          itemsInCar.push(item);
        }
      } else {
        items.push(item);
      }
    }
    return addItems ? itemsInCar : items;
  }

  /**
   *
   * Method to count the Items in the list
   *
   */
  public async getItemsCount(): Promise<number> {
    return await this._inventoryItems.childElementCount;
  }

  /**
   *
   * @param ctx             test case context
   * @param addItemToCart   Optional parameter to add and specific item to the shopping cart
   *
   * Method to add items to the shopping cart
   *
   */
  public async addItemsToCart(ctx: TestController, addItemToCart?: string): Promise<Item[]> {
    const itemsInCart = await this.getOrAddItemsInList(ctx, true, addItemToCart);
    await ctx.scroll(this._btnShoppingCart, 'top');
    return itemsInCart;
  }

  /**
   *
   * @param ctx             test case context
   *
   * Method to click the shopping Cart
   *
   */
  public async clickShoppingCart(ctx: TestController): Promise<void> {
    await ctx.click(this._btnShoppingCart);
  }

  /**
   *
   * @param ctx test case context
   *
   * Method to click the logOut btn
   *
   */
  public async userLogOut(ctx: TestController): Promise<void> {
    await ctx.click(this._btnBurgerMenu);
    await ctx.click(this._btnLogoutSideBar);
  }
}

export default new InventoryPage();

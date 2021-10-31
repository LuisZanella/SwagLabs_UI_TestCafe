export const multipleObjectAssertion = async (ctx: TestController, expectedItems: unknown[], receivedItems:unknown[] ) => {
  for (let i = 0; i < expectedItems.length; i++) {
    const objectKeys = Object.keys(expectedItems[i]);
    objectKeys.forEach(async (el) => {
      const expectedElement = expectedItems[i][el];
      const currentElement = receivedItems[i][el];
      await ctx.expect(expectedElement).eql(currentElement, `Expected element: ${expectedElement} and we received: ${currentElement}`);
    });
  }
};

export const isNextItemHigherAssertion = async (ctx: TestController, receivedItems:unknown[], searchKey:string ) => {
  for (let i = 0; i < receivedItems.length-1; i++) {
    const currentItem = receivedItems[i][searchKey];
    const nextItem = receivedItems[i+1][searchKey];
        
    if(currentItem > nextItem) {
      await ctx.expect(currentItem).lt(nextItem, `The ${searchKey} should be lower but insted we got ${currentItem} and the next item is ${nextItem}`);
    } else {
      await ctx.expect(currentItem).lt(nextItem, `The ${searchKey} is correct for what we got ${currentItem} and the next item ${nextItem}`);
    }
  }
};
export const multipleObjectAssertion = async (ctx: TestController, expectedItems: Object[], receivedItems:Object[] ) => {
    for (let i = 0; i < expectedItems.length; i++) {
        const objectKeys = Object.keys(expectedItems[i]);
        objectKeys.forEach(async (el) => {
            let expectedElement = expectedItems[i][el];
            let currentElement = receivedItems[i][el];
            await ctx.expect(expectedElement).eql(currentElement, `Expected element: ${expectedElement} and we received: ${currentElement}`);
        })
    }
}

export const isNextItemHigherAssertion = async (ctx: TestController, receivedItems:Object[], searchKey:string ) => {
    for (let i = 0; i < receivedItems.length-1; i++) {
        let currentItem = receivedItems[i][searchKey];
        let nextItem = receivedItems[i+1][searchKey];
        
        if(currentItem > nextItem) {
            await ctx.expect(currentItem).lt(nextItem, `The ${searchKey} should be lower but insted we got ${currentItem} and the next item is ${nextItem}`);
        } else {
            await ctx.expect(currentItem).lt(nextItem, `The ${searchKey} is correct for what we got ${currentItem} and the next item ${nextItem}`);
        }
    }
}
export const multipleObjectAssertion = async (
  ctx: TestController,
  expectedItems: unknown[],
  receivedItems: unknown[]
) => {
  for (let i = 0; i < expectedItems.length; i++) {
    const objectKeys = Object.keys(expectedItems[i]);
    for (let i = 0; i < objectKeys.length; i++) {
      const expectedElement = expectedItems[i][objectKeys[i]];
      const currentElement = receivedItems[i][objectKeys[i]];
      await ctx
        .expect(expectedElement)
        .eql(
          currentElement,
          `Expected element: ${expectedElement} and we received: ${currentElement}`
        );
    }
  }
};

export const isNextItemHigherAssertion = async (
  ctx: TestController,
  receivedItems: unknown[],
  searchKey: string
) => {
  for (let i = 0; i < receivedItems.length - 1; i++) {
    const currentItem = receivedItems[i][searchKey];
    const nextItem = receivedItems[i + 1][searchKey];
    await ctx
      .expect(currentItem)
      .lte(
        nextItem,
        `The ${searchKey} should be lower but insted we got ${currentItem} and the next item is ${nextItem}`
      );
  }
};

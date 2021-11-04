export const multipleObjectAssertion = async (
  ctx: TestController,
  expectedItems: unknown[],
  receivedItems: unknown[]
): Promise<void> => {
  for (let i = 0; i < expectedItems.length; i++) {
    const objectKeys = Object.keys(expectedItems[i]);
    for (let j = 0; j < objectKeys.length; j++) {
      const expectedElement = expectedItems[i][objectKeys[j]];
      const currentElement = receivedItems[i][objectKeys[j]];
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
): Promise<void> => {
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

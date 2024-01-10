const incrementCounter = require('./raceCondition');

describe('Race Condition Test', () => {
  it('should test race condition with multiple increments', async () => {
    const increments = 100;

    // Cria um array de promises com 100 chamadas a incrementCounter
    const promises = Array.from({ length: increments }, () => incrementCounter());

    const results = await Promise.all(promises);

    // Asserções do Jest
    expect(results).toHaveLength(increments);
    expect(results[results.length - 1]).toBe(increments);
  }, 5000);
});

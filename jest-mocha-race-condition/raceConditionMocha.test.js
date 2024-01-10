const chai = require('chai');
const incrementCounter = require('./raceCondition');

const { expect } = chai;

describe('Race Condition Test', function () {
  this.timeout(5000);

  it('should test race condition with multiple increments', async () => {
    const increments = 100;

    // Cria um array de promises com 100 chamadas a incrementCounter
    const promises = Array.from({ length: increments }, () => incrementCounter());

    const results = await Promise.all(promises);

    // Asserções usando o Chai
    expect(results).to.have.lengthOf(increments);
    expect(results[results.length - 1]).to.equal(increments);
  });
});

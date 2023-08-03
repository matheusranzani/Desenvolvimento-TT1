const assert = require('assert');
const sum = require('./sum');

describe('Sum function', () => {
  it('should return the sum of two numbers', () => {
    assert.equal(sum(1, 2), 3);
  });
});

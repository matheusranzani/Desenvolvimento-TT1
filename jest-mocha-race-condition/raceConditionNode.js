const incrementCounter = require('./raceCondition');

(async () => {
  const promises = [];
    promises.push(incrementCounter());
    promises.push(incrementCounter());

    const results = await Promise.all(promises);
    console.log(results);
})();

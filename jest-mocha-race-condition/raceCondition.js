const fs = require('fs');
let sharedCounter = 0;

function incrementCounter() {
  return new Promise((resolve) => {
    fs.readFile('package.json', () => {
      sharedCounter++;
      resolve(sharedCounter);
    });
  });
}

module.exports = incrementCounter;

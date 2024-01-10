const fs = require('fs');

console.log(1);

// Callback
// fs.readFile('./text1.txt', (error1, content1) => {
//     fs.readFile('./text2.txt', (error2, content2) => {
//         console.log(4);

//         console.log(error1, String(content1))
//         console.log(error2, String(content2))
//     })
// });

// Promise
const readFile = file => new Promise((resolve, reject) => {
    fs.readFile(file, (error, content) => {
        if (error) {
            reject(error);
        } else {
            resolve(content);
        }
    })
});

// Promise
// readFile('./text1.txt')
//     .then(content => {
//         console.log(String(content));
//         return readFile('./text2.txt');
//     })
//     .then(content => {
//         console.log(String(content));
//     });

// Async/Await
const init = async () => {
    try {
        const content1 = await readFile('./text1.txt');
        const content2 = await readFile('./text2.txt');

        // console.log(String(content1));
        // console.log(String(content2));

        return String(content1) + '\n' + String(content2);
    } catch (error) {
        console.log(error);
    }
};

// console.log(init());
init().then(contents => console.log(contents));

console.log(2);
console.log(3);

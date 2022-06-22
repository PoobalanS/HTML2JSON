// const fs = require('fs');

const {convert,findChild,removeNewline } = require('./convert.js');

const data = require('./data.js');

// var logger = fs.createWriteStream('output.js', {
// 	flags: 'a' // 'a' means appending (old data will be preserved)
//   })

// var writeLine = (line) => logger.write(`\n${line}`);

// writeLine(result);

// console.log(convert())

// console.log(removeNewline(data.child))

console.log(findChild(data.child,'001',1))
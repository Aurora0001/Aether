'use strict';
const emojiList = require('./emoji.json');
let x = [];
Object.keys(emojiList).map(name => {
  if (x.indexOf(emojiList[name].category) === -1) {
    x.push(emojiList[name].category);
  }
});
console.log(JSON.stringify(x));

'use strict';
const emojiList = require('./emoji.json');
let x = [];
Object.keys(emojiList).map(name => {
  const emojiCode = emojiList[name].unicode.split('-')
    .map(item => String.fromCodePoint(parseInt(item, 16))).join('');
  x.push({
    unicode: emojiCode,
    name: name.split('_').join(' '),
    category: emojiList[name].category[0].toUpperCase() + emojiList[name].category.slice(1)
  });
});
console.log(JSON.stringify(x));

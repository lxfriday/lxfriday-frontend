var BSTMap = require('./BSTMap');
var LinkedListMap = require('./LinkedListMap');
var fs = require('fs');

var file = fs.readFileSync('./test.txt', { encoding: 'utf8' });
var bstMap = new BSTMap();
var listMap = new LinkedListMap();

var start = Date.now();

for(var i = 0; i < file.length; i++) {
  bstMap.add(file[i], file[i]);
}

console.log(bstMap.getSize());
console.log(bstMap.contains('a'));
console.log('bst time used: ' + (Date.now() - start) + ' ms');



start = Date.now();

for(var i = 0; i < file.length; i++) {
  listMap.add(file[i], file[i]);
}

console.log(listMap.getSize());
console.log(listMap.contains('a'));
console.log('linkedlist time used: ' + (Date.now() - start) + ' ms');

// 文件越大的时候，结果差异越大
// 106
// true
// bst time used: 525 ms
// 106
// true
// linkedlist time used: 1777 ms

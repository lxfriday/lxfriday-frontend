var BSTSet = require('./BSTSet');
var LinkedListSet = require('./LinkedListSet');
var fs = require('fs');

var file = fs.readFileSync('./test.txt', { encoding: 'utf8' });
var bstSet = new BSTSet();
var listSet = new LinkedListSet();

var start = Date.now();

for(var i = 0; i < file.length; i++) {
  bstSet.add(file[i]);
}

console.log(bstSet.getSize());
console.log(bstSet.contains('a'));
console.log('bst time used: ' + (Date.now() - start) + ' ms');



start = Date.now();

for(var i = 0; i < file.length; i++) {
  listSet.add(file[i]);
}

console.log(listSet.getSize());
console.log(listSet.contains('a'));
console.log('linkedlist time used: ' + (Date.now() - start) + ' ms');

// 文件越大的时候，结果差异越大
// 106
// true
// bst time used: 525 ms
// 106
// true
// linkedlist time used: 1777 ms

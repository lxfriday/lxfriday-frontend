const quickSort = require('./QuickSort');
const heapSort = require('./HeapSort');

var arr = [];

for (var i = 0; i < 10000000; i++) {
  arr.push(Math.floor(Math.random() * 500000));
}

let start = Date.now();
quickSort(arr);
console.log('quick sort: '+ (Date.now() - start) +' s');

start = Date.now();
heapSort(arr);
console.log('heap sort: '+ (Date.now() - start) +' s');

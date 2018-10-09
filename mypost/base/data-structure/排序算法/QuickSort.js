/**
 * 快排-递归版
 *
 * @author lxfriday
 */

function quickSort(arr, left, right) {
  let length = arr.length;
  left = typeof left === 'number'? left : 0;
  right = typeof right === 'number'? right : length - 1;

  if (left < right) {
    const partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }

  return arr;
}

function swap(arr, a, b) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function partition(arr, left, right) {
  const start = left;
  let index = start + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[start]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, start, index - 1);
  return index - 1;
}
//
// console.log(quickSort([3, 4, 5, 6, 1, 2, 77, 5, 4, 3, 1, 8, 9, 0]));


module.exports = quickSort;

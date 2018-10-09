/**
 * 堆排序
 *
 * @author lxfriday
 */

function swap(arr, a, b) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function heapSort(arr) {
  const length = arr.length;

  for (let i = Math.floor(length / 2); i >= 0; i--) {
    siftDown(arr, i, length);
  }

  for (let i = length - 1; i >= 0; i--) {
    swap(arr, 0, i);
    siftDown(arr, 0, i);
  }

  return arr;
}

// 下沉，将对应元素放到适合其的位置上
function siftDown(arr, index, length) {
  let j = index * 2 + 1;

  while (j < length) {
    if (j + 1 < length && arr[j + 1] > arr[j]) {
      j = j + 1;
    }

    if (arr[index] > arr[j]) {
      break;
    }

    swap(arr, index, j);
    index = j;
    j = 2 * index + 1;
  }
}

// console.log(heapSort([3, 4, 6, 7, 1, 2, 9, 10, 14, 12, 20]));
// [ 1, 2, 3, 4, 6, 7, 9, 10, 12, 14, 20 ]


module.exports = heapSort;


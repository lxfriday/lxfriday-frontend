# 排序算法总结

相关概念

    稳定：如果 a 原本在 b 前面，而 a=b ，排序之后 a 仍然在 b 前面
    不稳定：如果 a 原本在 b 前面，而 a=b ，排序之后 a 可能会出现在 b 后面
    时间复杂度：对排序数据的总的操作次数。反映当 n 变化时，操作次数呈现什么规律
    空间复杂度：是指算法在计算机内执行时所需存储空间的度量，它也是数据规模 n 的函数

---

常见的排序算法可以分成两大类：

- **非线性时间比较类排序**：通过比较来决定元素间的相对次序，由于其时间复杂度不能突破O(NlogN)，因此称为非线性时间比较类排序。

- **线性时间非比较类排序**：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此称为线性时间非比较类排序。

---

1. [快速排序](#quick-sort) O(N*logN)
1. [堆排序](#heap-sort)   O(N*logN)
1. [归并排序](#merge-sort) O(N*logN)
1. [希尔排序](#shell-sort) O(n1.5)
1. [插入排序](#insertion-sort) O(n2)
1. [选择排序](#selection-sort) O(n2)
1. [冒泡排序](#bubble-sort) O(n2)
1. [基数排序](#8) O(d(n+r))

## [快速排序 (Quick Sort)](#quick-sort)

|图1|图2|
|:-:|:-:|
|![快速排序动图](http://qiniu1.lxfriday.xyz/image/849589-20171015230936371-1413523412.gif)|![快速排序动图2](http://qiniu1.lxfriday.xyz/image/739525-20160328215109269-23458370.gif)|

**快速排序是指通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序**

### 描述

快排使用分治法把一个串（list）分成两个子串（sub-lists）

- 从数组挑出一个元素，称为基准 "pivot"
- 重新排序数组，所有元素比基准值小的放在基准前面，比基准大的放在基准后面（相同的数可以放到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区 "partion" 操作。
- 递归地（recursive）把小于基准值的子序列和大于基准值的子序列排序。

代码实现

```js

function quickSort(arr, left, right) {
  var len = arr.length;
  var partitionIndex;
  var left = typeof left !== 'number' ? 0 : left; // 初始状态下没有 left
  var right = typeof right !== 'number' ? len - 1 : right; // 初始状态下没有 right
  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  // left 作为基准
  var pivot = left; // 设定基准值
  // 基准后面开始的第一个位置
  var index = pivot + 1;
  // i 从基准后面第一位(index位开始比较)到 right 所处位置
  for (var i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}

// 交换 arr 上 i、j 下标对应的值
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 初始状态
//   a        b   c    d  e
// pivot   index

// 经过一轮 partition
// partitionIndex 左侧的都小于它，右侧的都大于它
// 然后再对两侧的再调用 partition，直到最后

```

## [堆排序 (Heap Sort)](#heap-sort)

**堆排序是指利用这种数据结构所设计的一种排序算法。堆积是一种近似完全二叉树的结构，并同时满足堆积的性质：子节点的键值或索引总是小于（或者大于）它的父节点。**

## [归并排序 (Merge Sort)](#merge-sort)

**归并排序是建立在归并操作上的一种有效的排序算法。该算法采用分治法（Divide and Conquer）。将已有序的的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，则成为2-路归并**

![归并排序图](http://qiniu1.lxfriday.xyz/849589-20171015230557043-37375010.gif)

### 描述

- 把长度为 n 的输入序列分成两个长度为 n/2 的子序列
- 对这两个子序列分别采用归并排序
- 将两个排序好的子序列合并成一个最终的排序序列

代码实现

```js
function mergeSort(arr) {
  var len = arr.length;
  // 分化的最细层之后，返回最基本的元素数组()，再对
  if (len < 2) return arr;
  var middle = Math.floor(len / 2);
  var left = arr.slice(0, middle);
  var right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

// 将 left 和 right 数组归排序到并到一个数组中
function merge(left, right) {
  var result = [];

  while(left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  // 这个时候 left 或者 right 中已经有一个的长度为 0
  // 将不为空的那个全部放到 result
  while(left.length) result.push(left.shift());

  while(right.length) result.push(right.shift());

  return result;
}

```

## [希尔排序 (Shell Sort)](#shell-sort)

**第一个突破O(n2)的排序算法，是简单插入排序的改进版。它与插入排序不同之处在于，它会优先比较距离较远的元素。希尔排序又叫做缩小增量排序**


![希尔排序图](http://qiniu1.lxfriday.xyz/image/849589-20180331170017421-364506073.gif)

### 描述

先将整个排序的记录序列分隔成若干子序列分别进行直接插入排序，具体算法描述：

- 选择一个增量序列 t1，t2，... ，tk，其中ti > tj，tk = 1
- 按增量序列个数k，对序列进行k趟排序
- 每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m的子序列，分别对各子表进行直接插排。仅当增量因子为1时，整个序列作为一个表来处理，表长度即为整个序列的长度

## [插入排序 (Insertion Sort)](#insertion-sort)

**它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入**

![插入排序图](http://qiniu1.lxfriday.xyz/849589-20171015225645277-1151100000.gif)

### 描述

插入排序采用 in-place 在数组上实现

- 从第一个元素开始，该元素可以认为已经被排序
- 取出下一个元素，在已经排序的元素序列中从后向前扫描
- 如果该元素（已排序）大于新元素，将该元素移到下一个位置
- 重复步骤3，直到已经排序的元素小于或者等于新元素的位置
- 将新元素插入到该位置后
- 重复步骤 2~5


代码实现

```js
function insertionSort(arr) {
  var len = arr.length;
  var preIndex;
  var current;
  for(let i = 1; i < len; i++) {
    current = arr[i];
    preIndex = i - 1;
    // 经过一轮扫描，可以将0-i位上的元素全部排好
    while(preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}
```

## [选择排序 (Selection Sort)](#selection-sort)

**首先在未排序序列中找到最小（最大）元素，存放到排序序列的起始位置，然后再从剩余元素中寻找最小（最大）元素，然后放到第二，依此类推，直到所有元素排序完毕**

![选择排序图](http://qiniu1.lxfriday.xyz/image/849589-20171015224719590-1433219824.gif)

### 描述

n 个记录的直接排序可经过 n - 1 趟直接排序得到有序结果。

```js
function selectionSort(arr) {
  var len = arr.length;
  var minIndex;
  var temp;
  for(var i = 0; i < len - 1; i++) {
    minIndex = i;
    for(var j = i + 1; j < len ; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    swap(arr, minIndex, i)
  }
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
```

## [冒泡排序 （Bubble Sort）](#bubble-sort)

**它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该序列已经排序完成。该算法中较小的元素会经由交换慢慢浮到数列顶端**

![冒泡排序图](http://qiniu1.lxfriday.xyz/849589-20171015223238449-2146169197.gif)

### 描述

- 比较相邻的元素。如果第一个比第二个大，就交换它们
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数
- 针对所有的元素重复以上步骤，除了最后一个
- 重复步骤1~3，直到排序完成

```js
function bubbleSort(arr) {
  var len = arr.length;
  // 已经排好序的个数
  for (var i = 0; i < len - 1; i++) {
    // 本轮需要比较的次数
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
```






```js
// 测试代码
const arr = [];
for(let i = 0; i < 50; i++) {
  arr.push(Math.floor(Math.random() * 1000));
}

console.log(quickSort(arr));
```


![参考](http://qiniu1.lxfriday.xyz/image/849589-20180402133438219-1946132192.png)


## 参考文章
1. [https://www.cnblogs.com/onepixel/articles/7674659.html](https://www.cnblogs.com/onepixel/articles/7674659.html)
1. [runoob 排序算法总结](http://www.runoob.com/w3cnote/sort-algorithm-summary.html)
1. [http://www.cnblogs.com/eniac12/p/5329396.html](http://www.cnblogs.com/eniac12/p/5329396.html)

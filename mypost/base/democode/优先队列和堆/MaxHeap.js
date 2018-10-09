/**
 * MaxHeap
 *
 * @author lxfriday
 */

class MaxHeap {
  constructor() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  isEmpty() {
    return !this.data.length;
  }

  // 0-based index
  parent(index) {
    if (index === 0) {
      throw new Error('0 has no parent');
    }
    return Math.floor((index - 1) / 2);
  }

  leftChild(index) {
    return 2 * index + 1;
  }

  rightChild(index) {
    return 2 * index + 2;
  }

  // 交换数组的两个位置上的元素
  swap(a, b) {
    if (a < 0 || a >= this.data.length || b < 0 || b >= this.data.length) {
      throw new Error('index error');
    }
    const temp = this.data[a];
    this.data[a] = this.data[b];
    this.data[b] = temp;
  }

  add(e) {
    if (!this.data.includes(e)) {
      this.data.push(e);
      this.siftUp(this.data.length - 1);
    }
  }

  // 指定索引处的上浮
  siftUp(k) {
    const data = this.data;
    while (k > 0 && data[this.parent(k)] < data[k]) {
      this.swap(k, this.parent(k));
      k = this.parent(k);
    }
  }

  findMax() {
    if (!this.data.length) {
      throw new Error('堆中没有元素');
    }

    return this.data[0];
  }

  extractMax() {
    const data = this.data;
    const ret = data[0];

    this.swap(0, data.length - 1);
    data.pop();
    this.siftDown(0);

    return ret;
  }

  siftDown(k) {
    const data = this.data;

    while (this.leftChild(k) < data.length) {
      let j = this.leftChild(k);

      if ((j + 1 < data.length)
        && data[j + 1] > data[j]) {
        j = j + 1;
      }
      if (data[k] > data[j]) {
        break;
      }
      this.swap(k, j);
      k = j;
    }
  }
}


const maxHeap = new MaxHeap();

maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(3);
maxHeap.add(3);
maxHeap.add(4);
maxHeap.add(5);
maxHeap.add(6);
maxHeap.add(7);
maxHeap.add(8);
maxHeap.add(9);
maxHeap.add(10);
maxHeap.add(11);
maxHeap.add(12);

console.log(maxHeap.data);
console.log('maxHeap.size()', maxHeap.size());
var size = maxHeap.size();
for (let i = 0; i < 12; i++) {
  console.log(maxHeap.extractMax());
}

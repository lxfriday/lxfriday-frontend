// 链表的增删改查时间复杂度都是 O(n)
class Node {
  constructor(e, next) {
    this.e = e;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.dummyHead = new Node(null, null);
    this.size = 0;
  }

  isEmpty() {
    return !!this.size;
  }

  // 0-based index
  add(index, e) {
    if (index < 0 || index > this.size) {
      throw new Error('index Error');
    }

    var prev = this.dummyHead;

    for (var i = 0; i < index; i++) {
      prev = prev.next;
    }

    prev.next = new Node(e, prev.next);
    this.size++;
  }

  // 在链表头添加新的元素
  addFirst(e) {
    this.add(0, e);
  }

  // 在最后添加元素
  addLast(e) {
    this.add(this.size, e);
  }

  get(index) {

    if (index <0 || index >= this.size) {
      throw new Error('index Error');
    }

    var current = this.dummyHead.next;

    for (var i = 0; i < index; i++) {
      current = current.next;
    }

    return current.e;
  }

  getFirst() {
    return this.get(0);
  }

  getLast() {
    return this.get(this.size - 1);
  }

  set(index, el) {

    if (index <0 || index >= this.size) {
      throw new Error('index Error');
    }

    var current = this.dummyHead.next;

    for (var i = 0; i < index; i++) {
      current = current.next;
    }

    current.e = el;
  }

  // 查找链表中是否含有元素e
  contains(e) {

    var cur = this.dummyHead.next;
    while (cur !== null) {
      if (cur.e === e) {
        return true;
      }
      cur = cur.next;
    }

    return false;
  }

  toString() {

    var cur = this.dummyHead.next;
    var res = '';
    while (cur !== null) {
      res += cur.e + ' -> ';
      cur = cur.next;
    }
    res += 'NULL';
    return res;
  }

  remove(index) {

    if (index <0 || index >= this.size) {
      throw new Error('index Error');
    }

    var prev = this.dummyHead;
    for (var i = 0 ; i < index; i++) {
      prev = prev.next;
    }
    var retNode = prev.next;
    prev.next = retNode.next;
    retNode.next = null;
    this.size--;
    return retNode;
  }

  removeFirst() {
    return this.remove(0);
  }

  removeLast() {
    return this.remove(this.size - 1);
  }
}

module.exports = LinkedList;

// var ll = new LinkedList();
// for (var i = 0; i < 5; i++) {
//   ll.addFirst(i);
// }
//
// ll.add(2, 666);
// console.log('' + ll);
//
// ll.removeFirst();
// console.log('' + ll);
// console.log(ll.size);
// ll.removeLast();
// console.log('' + ll);
// console.log(ll.size);


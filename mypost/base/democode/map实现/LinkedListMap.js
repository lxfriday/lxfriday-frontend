/**
 * 链表实现的映射
 *
 * @author lxfriday
 */

class Node{
  constructor(key, value, next) {
    this.key = key || null;
    this.value = value || null;
    this.next = next || null;
  }
}

class LinkedListMap {
  constructor() {
    this.dummyHead = new Node();
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return !this.size;
  }

  getNode(key) {

    var cur = this.dummyHead;
    while (cur !== null) {
      if (cur.key === key) {
        return cur;
      }
      cur = cur.next;
    }
    return null;
  }

  contains(key) {

    return this.getNode(key) !== null;
  }

  add(key, value) {

    var node = this.getNode(key);
    if (node == null) {
      this.dummyHead.next = new Node(key, value, this.dummyHead.next);
      this.size++;
    } else {
      node.value = value;
    }
  }

  set(key, value) {

    var node = this.getNode(key);
    if (node === null) {
      throw new Error(`key ${key} not exist`);
    }
    node.value = value;
  }

  remove(key) {

    var prev = this.dummyHead;
    while (prev !== null) {
      if (prev.next.key === key) break;
      prev = prev.next;
    }

    if (prev.next !== null) {
      var delNode = prev.next;
      pre.next = delNode.next;
      delNode.next = null;
      this.size--;
      return delNode;
    }

    return null;
  }
}

module.exports = LinkedListMap;

// var llMap = new LinkedListMap();
//
// llMap.add(1, 'a');
// llMap.add(2, 'b');
// llMap.add(3, 'c');
// llMap.add(1, 'a');
//
// console.log(llMap.getNode(1));
// console.log(llMap.getSize());
//

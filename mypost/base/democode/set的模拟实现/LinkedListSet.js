var LinkedList = require('./base/LinkedList');

class LinkedListSet {
  constructor() {
    this.list = new LinkedList();
  }

  getSize() {
    return this.list.size;
  }

  isEmpty() {
    return this.list.isEmpty();
  }

  contains(e) {
    return this.list.contains(e);
  }

  add(e) {
    if (!this.list.contains(e)) {
      this.list.addFirst(e);
    }
  }
}

module.exports = LinkedListSet;

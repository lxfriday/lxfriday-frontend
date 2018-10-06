var BST = require('./base/BST');

class BSTSet{
  constructor() {
    this.bst = new BST();
  }

  getSize() {
    return this.bst.size;
  }

  isEmpty() {
    return this.bst.isEmpty();
  }

  add(e) {
    this.bst.add(e);
  }

  contains(e) {
    return this.bst.contains(e);
  }
}

module.exports = BSTSet;

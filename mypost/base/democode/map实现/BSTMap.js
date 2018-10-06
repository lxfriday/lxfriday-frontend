/**
 * BST 实现Map
 *
 * @author lxfriday
 */
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BSTMap {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return !this.size;
  }

  add(k, v) {
    var that = this;
    function addNode(node, key, value) {

      if (node === null) {
        that.size++;
        return new Node(key, value);
      }

      if (key < node.key) {
        node.left = addNode(node.left, key, value);
      } else if (key > node.key) {
        node.right = addNode(node.right, key, value);
      } else {
        node.value = value;
      }

      return node;
    }

    this.root = addNode(this.root, k, v);
  }

  // 返回以 node 为根节点的二分搜索树中，key 所在的节点
  getNode(node, key) {

    if (node === null) return null;
    if (node.key === key) {
      return node;
    } else if (key < node.key) {
      return this.getNode(node.left, key);
    } else {
      return this.getNode(node.right, key);
    }
  }

  contains(key) {

    return this.getNode(this.root, key) !== null;
  }

  get(key) {
    return this.getNode(this.root, key);
  }

  set(key, value) {

    var node = this.getNode(this.root, key);
    if (node === null) {
      throw  new Error(`key ${key} does not exist in map`);
    }
    node.value = value;
  }

  remove(k){
    var that = this;

    function removeNode(node, key) {

      if (node === null) return null;
      if (key < node.key) {
        node.left = removeNode(node.left, key);
        return node;
      } else if (key > node.key) {
        node.right = removeNode(node.right, key);
        return node;
      } else {
        // el === node.e
        // 删除当前节点
        if (node.left === null) {
          var rightNode = node.right;
          that.size--;
          node.right = null;
          return rightNode;
        }
        if (node.right === null) {
          var leftNode = node.left;
          that.size--;
          node.left = null;
          return leftNode;
        }
        // 左右子树都不为空
        // 找到比待删除节点大的最小节点，即待删除节点右子树的最小节点
        // 用这个节点替换待删除的节点
        var successor = that.minimum(node.right);
        successor.right = that.removeMin(node.right);
        successor.left = node.left;
        return successor;
      }
    }

    var node = this.getNode(this.root, k);
    if (node !== null) {
        this.root = removeNode(this.root, k);
        return node.value;
    }

    return null;
  }
}

module.exports = BSTMap;

//
// var bstMap = new BSTMap();
// bstMap.add(1, 'a');
// bstMap.add(2, 'b');
// bstMap.add(3, 'c');
// bstMap.add(1, 'a');
// console.log(bstMap.getSize());
// console.log(bstMap);

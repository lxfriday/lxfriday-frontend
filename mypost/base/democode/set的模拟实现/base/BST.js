// 二叉搜索树
class Node {
  constructor(e) {
    this.e = e;
    this.left = null;
    this.right= null;
  }
}

class BST {
  constructor() {
    this.size = 0;
    this.root = null;
  }

  isEmpty() {
    return !!this.size;
  }

  // 向二分搜索树中添加新的元素
  add(e) {
    const that = this;
    function addNode(node, el) {

      if (node === null) {
        that.size++;
        return new Node(el);
      }

      if (el < node.e) {
        node.left = addNode(node.left, el);
      } else if (el > node.e){
        node.right = addNode(node.right, el);
      }

      return node;
    }

    that.root = addNode(that.root, e);
  }

  // 二分搜素树中是否包含元素e
  contains(e) {
    function containNode(node, el) {

      if (node === null) return false;
      if (node.e === el) return true;
      if (el < node.e) {
        return containNode(node.left, el);
      } else {
        return containNode(node.right, el);
      }
    }

    return containNode(this.root, e);
  }

  // 查找最小值
  minimum(startNode) {

    function minimunNode(node) {
        if (node.left === null) return node;
        return minimunNode(node.left);
    }

    return minimunNode(startNode || this.root);
  }

  // 查找最大值
  maxmum(startNode) {

    function maxmumNode(node) {
      if (node.right === null) return node;
      return maxmumNode(node.right);
    }

    return maxmumNode(startNode || this.root);
  }

  // 删除最小值
  removeMin(startNode) {
    var that = this;
    var minimum = this.minimum(startNode);

    // 删除最小值，返回删除之后新的结构
    function removeMinNode(node) {
      if (node.left === null) {
        var rightNode = node.right;
        node.right = null;
        that.size--;
        return rightNode;
      }

      node.left = removeMinNode(node.left);
      return node;
    }

    return removeMinNode(startNode || this.root);
  }

  // 删除最大值
  removeMax(startNode) {
    var that = this;
    var maxmum = this.maxmum(startNode);

    function removeMaxNode(node) {
      if (node.right === null) {
        var leftNode = node.left;
        node.left = null;
        that.size--;
        return leftNode;
      }

      node.right = removeMaxNode(node.right);
      return node;
    }

    removeMaxNode(startNode || this.root);

    return maxmum;
  }

  // 删除任意元素
  remove(e) {
    var that = this;

    function removeNode(node, el) {
      if (node === null) return null;
      if (el < node.e) {
        node.left = removeNode(node.left, el);
        return node;
      } else if (el > node.e) {
        node.right = removeNode(node.right, el);
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

    that.root = removeNode(that.root, e);
  }
}

module.exports = BST;

// var bst = new BST();
// bst.add(3);
// bst.add(2);
// bst.add(4);
// bst.add(1);
// console.log(bst);
// bst.removeMin();
// console.log(bst);

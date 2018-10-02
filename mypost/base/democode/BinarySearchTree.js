// 二叉搜索树

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right= null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 向 bst 中插入一个元素
  insert(key) {
    const newNode = new Node(key);
    function insertNode(node, newNode) {
      if (newNode.key < node.key) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    }

    if (this.root === null) {
      this.root = newNode;
    } else {
      insertNode(this.root, newNode);
    }
  }

  // 中序遍历
  inOrderTraverse(cb) {
    function inOrderTraverseNode(node) {
      if (node !== null) {
        // 左中右
        inOrderTraverseNode(node.left, cb);
        cb(node.key);
        inOrderTraverseNode(node.right, cb);
      }
    }
    inOrderTraverseNode(this.root);
  }

  // 后序遍历
  postOrderTraverse(cb) {
    function postOrderTraverseNode(node) {
      if (node !== null) {
        // 左右中
        postOrderTraverseNode(node.left, cb);
        postOrderTraverseNode(node.right, cb);
        cb(node.key);
      }
    }
    postOrderTraverseNode(this.root);
  }

  // 最小值查找
  min() {
    function minNode(node) {
      return node ? (node.left ? minNode(node.left) : node) : null;
    }
    return minNode(this.root);
  }
  // 最大值查找
  max() {
    function maxNode(node) {
      return node ? (node.right ? maxNode(node.right) : node) : null;
    }
    return maxNode(this.root);
  }

  // 搜索固定的值
  search(key) {
    function searchNode(node, key) {
      if (node === null) return false;
      if (node.key === key) return true;
      return searchNode((key < node.key) ? node.left : node.right, key);
    }
    return searchNode(this.root, key);
  }

  // 移除一个元素，会触发其右子树的重排
  // 先查找、后重排
  // remove(key) {
  //   function removeNode(node, key) {
  //     if (node === null) return false;
  //     if (node.key === key) {
  //       console.log(node);
  //       if (node.left === null && node.right === null) {
  //         let _node = node;
  //         node = null;
  //         return _node;
  //       }
  //     } else if (node.left !== null && node.key > key) {
  //       if (node.left.key === key) {
  //         node.left.key = this.min(node.left.right).key;
  //         removeNode(node.left.right, node.left.key);
  //         return node.left;
  //       }
  //     }
  //   }
  // }
}

var bst = new BinarySearchTree();
bst.insert(9);
bst.insert(5);
bst.insert(2);
bst.insert(6);
bst.insert(7);
bst.insert(10);
bst.insert(12);
bst.insert(15);
bst.insert(13);
bst.insert(2);

console.log(bst.min());
console.log(bst.max());
console.log(bst.search(15));

// bst.inOrderTraverse(v => console.log(v));
// bst.postOrderTraverse(console.log);
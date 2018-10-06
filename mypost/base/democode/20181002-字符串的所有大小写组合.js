// 方法一：使用二叉树实现
class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// 添加一个元素的时候自动构建所有可能的情形，二叉树的所有叶子节点即为所有的组合情形
class AllCaseBinaryTree {
  constructor() {
    this.root = new Node(null);
  }

  // 添加一个新的字符
  add(val) {
    const that = this;
    const isChar = /[a-zA-Z]/.test(val);
    function addChar(node, prevVal) {
      prevVal = prevVal || '';
      if (!node.left && !node.right) {
        if (isChar) {
          node.left = new Node(prevVal + val.toLowerCase());
          node.right = new Node(prevVal + val.toUpperCase());
        } else {
          node.val = node.val? node.val + val : val;
         }
      } else {
        addChar(node.left, node.left.val);
        addChar(node.right, node.right.val);
      }
    }

    addChar(this.root, this.root.val);
  }

  // 获取所有的叶子结点（取出所有的组合情形）
  get() {
    const res = [];

    function readNode(node) {
      if (!node.left && !node.right) {
        res.push(node.val);
        console.log(node.val);
      } else {
        readNode(node.left);
        readNode(node.right);
      }
    }

    readNode(this.root);

    return res;
  }
}

const start = Date.now();
const tree = new AllCaseBinaryTree();

tree.add('a');
tree.add('b');
tree.add('c');
tree.add('d');
tree.add('e');
tree.add('f');
tree.add('g');
tree.add('h');
tree.add('i');
tree.add('j');


console.log(tree.get());

console.log('time used: ' + (Date.now() - start) + ' ms');

// 方法二：直接使用二叉树的结论构建

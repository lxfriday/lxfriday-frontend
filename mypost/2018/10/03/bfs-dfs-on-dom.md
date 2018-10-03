# 对 DOM 树进行深度优先和广度优先遍历

```html
  <div class="container">
    <span>1</span>
    <div>
      2
      <span>
        4
      </span>
    </div>
    <div>
      3
      <span>
        5
      </span>
    </div>
  </div>
```

## 深度优先
```js
function dfs(node) {
  if (node.childNodes.length) {
    node.childNodes.forEach(dfs);
  }
  if (node.nodeType === 3) {
    console.log(node.nodeValue);
  }
}
dfs(document.querySelector('.container'))
// 1
// 2
// 4
// 3
// 5
```

## 广度优先

```js
var arr = [document.querySelector('.container')];
function bfs() {
    var node = arr.shift();
    node.childNodes.forEach(childNode => {
        arr.push(childNode);
    });

    if (node.nodeType === 3 && node.nodeValue.trim()) {
        console.log(node.nodeValue);
    }

    if (arr.length) {
        bfs();
    }
}
bfs();
// 1
// 2
// 3
// 4
// 5
```
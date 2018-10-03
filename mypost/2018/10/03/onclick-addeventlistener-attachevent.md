# onclick、addEventListener、attachEvent 比较

## onclick
`onclick` 有两种绑定事件的形式

```html
<div id="box1" onclick="doSth(event)"></div>
```
or
```js
var box1 = document.getElementById('box1');
box1.onclick = doStr;
```
取消事件
```js
box1.onclick = null;
```
优缺点：

1. 只能绑定一个事件

## addEventListener、removeEventListener

用法
```js
var box1 = document.getElementById('box1');
function doStr(event) {
}
// 绑定事件，不用带 on
box1.addEventListener('click', doStr, false);

// 取消事件
box1.removeEventListener('click', doStr);

```
**addEventListener** 对同一类事件的同一个回调函数，只能绑定一次，绑定多次无效


优缺点：

1. 一个对象能绑定多个事件
1. 可以屏蔽重复的函数

## attachEvent、detachEvent

用法
```js
function func() {
    var box1 = document.getElementById('box1');
    
    function log() {
        console.log(this);
        console.log(window.event);
        console.log('clicked');
    }

    box1.attachEvent('onclick', function() {
      log.call(box1)
    });
    setTimeout(function() {
        box1.detachEvent('onclick', log);
        console.log('removed');
    }, 3000);
}

// 添加事件
window.attachEvent('onload', func);
// 取消事件
// window.detachEvent('onload', func);
```

优缺点：

1. `this` 需要通过 call 绑定，本身没有 `this`
1. event 要通过 `window.event` 的形式获取
1. 同一个函数注册绑定多次之后，不能屏蔽掉，会执行多次


## 参考
- [onclick、addEventListener、attachEvent详解](https://blog.csdn.net/csdn_yudong/article/details/70156293)
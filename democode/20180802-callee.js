/**
 *  测试 arguments的 callee 属性
 */

var data = [];
for (var i = 0; i < 3; i++) {
  (data[i] = function () {
    console.log(arguments.callee);
    console.log(arguments.callee.i);
  }).i = i;

  //(function(){}).i = i 这是给函数赋值一个属性，然后再通过arguments.callee.i获取到这个值

  // {
  //   data[i] = function() {
  //     console.log(i);
  //   }
  // }
}

// 使用 let 声明的变量在块级作用域内能强制执行更新变量
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/block
for (let i = 0; i < 3; i++) {
    data[i] = function() {
      console.log(i);
    }
}
data[0]();
data[1]();
data[2]();

/**
 *  测试 arguments的 callee 属性
 */

var data = [];
for (let i = 0; i < 3; i++) {
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

data[0]();
data[1]();
data[2]();

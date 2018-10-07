// 自己定义的模块处理方式
define(function() {
  var add = function () {
    console.log('add');
  };
  
  console.log('load math.js');

  return {
    add,
  };
});

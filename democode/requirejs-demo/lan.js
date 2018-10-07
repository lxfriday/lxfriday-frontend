// 自己定义的模块处理方式
define(function() {
  var en = function () {
    console.log('en');
  };

  console.log('load lan.js');

  return {
    en,
  };
});

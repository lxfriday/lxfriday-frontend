// 对于 commonjs 的处理方式
define(function(require, exports, module) {
  module.exports = {
    say() {
      console.log('say');
    },
  };
});

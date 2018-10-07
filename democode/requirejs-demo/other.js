define(function (require, exports, module) {
  var common = require('./common.js');
  common.say()
  var math = require('./math.js');
  math.add();
  var lan = require('./lan.js');

  // requirejs 先加载后执行
  // load math.js
  // load lan.js
  // say
  // add

  module.exports = {
    common,
    math,
    lan,
  };

  // say
  // add
  // en
});

/**
 * 模拟实现 apply
 * @param {*} ctx 
 * @param {*} arg 
 */
Function.prototype.apply2 = function(ctx, arg) {
  ctx = Object(ctx || window);


  // 将当前函数挂在 ctx 上
  ctx.fn = this;

  // 如果没有参数，则直接执行
  if (!arg) {
    ctx.fn();
  } else {
    // 如果有参数，则拼接成字符串数组
    const argArr = [];
    for(let i = 0; i < arg.length; i++ ) {
      argArr.push('arg[' + i + ']');
    }

    const result = eval('ctx.fn(' + argArr + ')');

    delete ctx.fn;
    return result;
  }
}

var value = 'global value';

function bar(name, age) {
  return {
    name,
    age,
    value: this.value
  };
}

var foo = {
  value: 'foo value'
};

console.log(bar.apply2(null, ['lxfriday', 12]));

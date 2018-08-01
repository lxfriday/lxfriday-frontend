/**
 * 模拟实现 call 方法，(浏览器环境)
 * @param {*} ctx
 */
Function.prototype.call2 = function(ctx) {
  ctx = ctx || window;
  const args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }

  // 把当前函数挂到ctx上
  ctx.fn = this;

  // eval("ctx.fn('arguments[1],arguments[1], ...)")
  // 如果是 eval("ctx.fn('lxfriday,111')") 会报错，实际执行时变成了 ctx.fn(lxfriday, 111)
  // 其中的 lxfriday 是一个未定义的变量

  const result = eval(`ctx.fn(${args})`);

  // 删除暂时使用的自定义生成的属性
  delete ctx.fn;

  // 返回结果
  return result;
};

// 如果变量定义成 const value = 'global ...' // this.value将会变成 undefined
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

// console.log(bar.call2());
console.log(bar.call2(null, 'lxfriday', 12));

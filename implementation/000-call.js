/**
 * 模拟实现 call 方法
 * @param {*} ctx
 */
Function.prototype.call2 = function(ctx) {
  if (!ctx) {
    ctx = global;
  }
  const args = [];
  let len = 0;
  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push(`arguments[${i}]`);
  }

  // 把当前函数挂到ctx上
  ctx.fn = this;

  const result = eval(`ctx.fn(${args})`);

  // 删除暂时使用的自定义生成的属性
  delete ctx.fn;

  // 返回结果
  return result;
};

global.value = 'global value';

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

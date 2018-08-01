/**
 * 模拟实现 bind 函数
 */

// 返回一个函数
// 能够绑定参数
// 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 被忽略，同时调用时的参数被提供给模拟函数

Function.prototype.bind2 = function(ctx) {
  // 调用 bind 的不是函数需要报错
  if (typeof this !== 'funcction') {
    throw new Error('Error， function required');
  }
  const that = this;
  const args = Array.prototype.slice.call(arguments, 1);

  const fNop = function() {};

  const fBound = function() {
    const args2 = Array.prototype.slice.call(arguments);
    // fBound 为bind之后新生成的函数， new fBound() 的 this 必然是 fBound 的实例
    return that.apply(this instanceof fNop ? this : ctx, args.concat(args2));
  }

  // 将原型进行中转，防止手动赋值对其原型的影响
  fNop.prototype = this.prototype;
  fBound.prototype = new fNop();
  return fBound;
}

var foo = {
  value: 'foo value',
};

bar.prototype.grade = 100;

function bar(name, age, sex) {
  this.habit = 'hello this is my habit';
  console.log('name => ', name);
  console.log('age => ', age);
  console.log('sex => ', sex);
  
  console.log('this.value => ', this.value);
  console.log('this.grade => ', this.grade);
}

var bindFoo = bar.bind2(foo, 'lxfriday');


bindFoo.prototype.xxxx = 'ssssss';

console.log(bar.prototype.xxxx);


// 情况1：绑定后的结果当普通函数使用，其 this 为绑定的时候的 ctx
// bindFoo(23, 'male');
 
// 情况2：绑定后的结果作为构造函数，其 this 指向新生成的对象
var obj = new bindFoo(23, 'male');
console.log(obj);


/**
 * 模拟实现 new 
 */

// new 运算符创建一个用户定义的*对象类型的实例*或*具有构造函数的内置对象类型*之一
// 1、用 new 生成的实例，可以访问构造函数里的属性(this.xxx = sss)，也可以访问到构造函数的原型中的属性
// 2、构造函数有返回值：返回对象则结果也是返回该对象，返回其他值则不用管，使用新生成的对象
// objectFactory()

function objectFactory() {
  var obj = new Object();

  // arguments中删除的即为返回的是第一个，即为构造函数
  var Constructor = [].shift.call(arguments);

  // 注意：以下的1、2步骤的顺序不能换，要先将obj对象的原型指向构造函数的原型，再将其作为this调用构造函数
  // 顺序颠倒之后：在构造函数调用的时候，无法访问到原型链上的属性
  // 1、先将生成的对象的原型更改到指向构造函数的原型
  obj.__proto__ = Constructor.prototype;

  // 2、再给与参数和this执行构造函数

  var result = Constructor.apply(obj, arguments);

  return typeof result === 'object' ? result : obj;
}

function Person(name, sex) {
  this.name = name;
  this.sex = sex;

  console.log('this.language => ', this.language);
  

  this.type = 'human';
}

Person.prototype.language = 'Chinese';
Person.prototype.sayYourName = function() {
  console.log(this.name);
}

var newObj = objectFactory(Person, 'lxfriday', 'male');
new Person('lxfriday', 'male')

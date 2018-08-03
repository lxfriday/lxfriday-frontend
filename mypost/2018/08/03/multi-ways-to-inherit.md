# 继承的多种方式以及优缺点

评价的方面：

1. 原型链的属性是否会因为某个实例更改而影响到其他实例
1. 构造函数是否会重复调用
1. 原型方法是否会在创建实例的时候每次都创建


类型

1. [原型链继承](#1)
1. [借用构造函数继承](#2)
1. [组合继承](#3)
1. [原型式继承](#4)
1. [寄生继承](#5)
1. [寄生组合继承(最佳方案)](#6)

## 1. [原型链继承](#1)

```js
function Parent() {
  this.name = 'lxfriday';
}

Parent.prototype.getName = function() {
  console.log(this.name);
}

function Child() {

}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName());  // lxfriday

```

缺点

1、引用类型的属性被所有实例共享

2、在创建 Child 的实例时，不能向 Parent 传参(共享一个 Parent 实例，属性永远都指向同一个 Parent 实例的属性，更改之后能被所有 Child 实例访问)。

## 2、[借用构造函数(经典继承)](#2)

```js

function Parent(age) {
  this.names = ['lxfriday'];
  this.age = age;
}

function Child(age, sex) {
  // 把新创建的对象的this，传进去，
  Parent.call(this, age);
  this.sex = sex;
}

var child1 = new Child(23, 'male');

child1.names.push('liu');

// Child { names: [ 'lxfriday', 'liu' ], age: 23, sex: 'male' }
console.log(child1);
// true
console.log(child1 instanceof Child);

var child2 = new Child();

// ["lxfriday"]
console.log(child2.names);

```

优点

1. 避免了引用类型的属性被所有实例共享
1. 可以在 Child 中向 Parent 传参

缺点

1. 方法也都定义在了构造函数中，每次生成实例会都重复创建方法
1. 无法使用父类的原型方法和属性

## 3、[组合继承](#3)

原型链继承和经典继承共同使用

```js

function Parent(name) {
  this.name = name;
  this.colors = ['red', 'green', 'blue'];
}

Parent.prototype.getName = function() {
  console.log(this.name);
}

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

// Child 不具备 Parent 的原型链方法
Child.prototype = new Parent();
// 把构造函数改掉，否则将不会是 Child 的实例
Child.prototype.constructor = Child;

var child1 = new Child('lxfriday', 23);
child1.colors.push('black');
console.log(child1);

console.log(child1.name);
console.log(child1.age);
console.log(child1.colors);

var child2 = new Child('xiaoming', 12);
console.log(child2.name);
console.log(child2.age);
console.log(child2.colors);
```

优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

缺点： 会两次调用 Parent 函数

## 4、[原型式继承](#4)

```js

// 就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
function createObj(o) {
  function F() {};
  F.prototype = o;
  return new F();
}

var person = {
  name: 'lxfriday',
  friends: ['Jim', 'Daisy'],
};

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1 name';
console.log(person2.name); // lxfriday

person1.friends.push('Taylor');
console.log(person2.friends); // ['Jim', 'Daisy', 'Taylor']
```

缺点

包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

注意：修改person1.name的值，person2.name的值并未发生改变，并不是因为person1和person2有独立的 name 值，而是因为person1.name = 'person1'，给person1添加了 name 值，并非修改了原型上的 name 值。

## 5、[寄生式继承](#5)

```js
function createObj (o) {
  var clone = Object.create(o);
  clone.sayName = function() {
    console.log('hi');
  }
  return clone;
}
```

缺点：跟借用构造函数模式样，每次创建对象都会创建一遍方法

## 6、[寄生组合继承](#6)

```js

function Parent(name, age) {
  this.name = name;
  this.age = age;
}

Parent.prototype.getName = function() {
  console.log(this.name);
}

Parent.prototype.getAge = function() {
  console.log(this.age);
}

function Child(name, age, sex) {
  Parent.call(this, name, age);
  this.sex = sex;
}

// 将 o 深入的对象作为返回的对象的原型
function createObj(o) {
  var F = function() {};
  F.prototype = o;

  return new F();
}

function prototype(child, parent) {
  var prototype = createObj(parent.prototype);
  // 全量修改 prototype 的时候，注意修改 constructor
  child.prototype = prototype;
  child.prototype.constructor = child;
}

// 使用
prototype(Child, Parent);

var child1 = new Child('lxfriday', 23, 'male');
console.log(child1);
child1.getName();
child1.getAge();

```

优点：它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype上面创建不必要的、多余的属性。同时原型链还能保持不变。
还能够正常使用 instanceof 和 isPrototypeOf。

开发人员普遍认为寄生组合继承是引用类型最理想的继承范式。

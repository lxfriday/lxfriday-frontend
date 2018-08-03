# 创建对象的多种方式，以及优缺点

1. 工厂模式
1. 构造函数模式
1. 原型模式
1. 组合模式(常用)
1. 寄生构造函数模式

## 1、工厂模式

```js
 function createPerson(name) {
   var o = new Object;
   o.name = name;
   o.getName = function () {
     console.log(this.name);
   }
   return o;
 }

 // 不适用new进行创建
 var person1 = createPerson('kevin');
```
缺点是对象无法识别，所有的实例都指向一个原型

## 2、构造函数模式

```js
function Person(name) {
  this.name = name;
  this.getName = function () {
    console.log(this.name);
  }
}
```

优点： 实例可以识别为一个特定的类型

缺点： 每次创建实例的时候，每个方法都要被创建一次

## 2.1、构造函数模式的优化

```js
function Person(name) {
  this.name = name;
  this.getName = getName;
}

function getName () {
  console.log(this.name);
}

var person1 = new Person('lxfriday');
```

缺点：封装太难看


## 3、原型模式

```js
function Person() {

}

Person.prototype.name = 'lxfriday';
Person.prototype.getName = function() {
  console.log(this.name);
};
var person1 = new Person();
```

优点：方法不会重新被创建

缺点：1、所有的属性和发放都会被共享；2、不能在构造函数里面初始化参数

## 3.1、原型模式优化

```js
function Person() {}
Person.prototype = {
  constructor: Person,
  name: 'lxfriday',
  getName: function() {
    console.log(this.name);
  }
};
```


## 4、组合模式

```js
function Person(name) {
  this.name = name;
}
Person.prototype = {
  constructor: Person,
  getName: function() {
    console.log(this.name);
  }
};

var person1 = new Person('lxfriday');
```

优点：该共享的共享，该私有的私有，使用最广泛的方式


## 5、寄生构造函数模式(寄生-构造函数-模式，也就是说寄生在构造函数的一种方法)

```js
function Person(name) {
  var o = new Object;
  o.name = name;
  o.getName = function () {
    console.log(this.name);
  }
  return o;
}

var person1 = Person('kevin');
console.log(person1 instanceof Person); // false
console.log(person1 instanceof Object); // true
```

# 类的继承

## 子类的 constructor

使用 `extends` 关键字继承，子类必须在构造函数中调用 `this`，

存在两种情况

1、自己写了构造函数，但是里面没有写调用 `super` ，在实例化子类的时候，会直接报错

```js
// ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

2、自己没有写构造函数，将会自动默认添加一个构造函数，使得能够顺利构造 `this`

```js
class P {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class C extends P {}

// 等同于

class C extends P {
  constructor(...args) {
    super(...args);
  }
}

```

实际上，子类必须在构造函数中调用 `super` 方法，否则新建实例时会报错。这是由于，子类的 `this` 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用 `super` 方法，子类就得不到 `this` 对象。


## super 关键字

`super` 关键字，可以当做函数使用，也可以当做对象使用。

1、作为函数使用

`super()` 执行的时候，其内部的 `this` 指向的是 **子类**

`super()` 只能用在子类的构造函数中，用在其他地方就会报错

2、作为对象使用时，在普通方法中，指向父类的原型对象；在静态方法中指向父类

`super` 可以访问定义在 Class 原型上的属性和方法

`super` 无法访问定义在父类实例上的方法或属性

在子类普通方法中通过 `super` 调用父类方法的时候，父类方法内部的 `this` 指向当前的子类实例，相当于执行 `super.xx.call(this)`

使用 `super` 的时候，必须显式指定 `super` 的类型（函数或者对象），否则会报错

## 类的 prototype 属性和 __proto__ 属性

**Class 中同时存在 `prototype` 和 `__proto__`，其同时存在两条继承链**

1、子类的 `__proto__` 属性，表示构造函数的继承，总是指向父类

2、子类的 `prototype` 属性的 `__proto__` 属性，表示方法的继承，总是指向父类的 `prototype` 属性

```js
class A {}

class B extends A {}

B.__proto__ === A;

B.prototype.__proto__ === A.prototype;
```

这是由于，类的继承是按照下面的方式进行的

```js
class A {}
class B {}
Object.setPrototypeOf(B.prototype, A.prototype);
Object.setPrototypeOf(B, A);


// Object.setPrototypeOf 的模拟实现

Object.setPrototypeOf = function(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

```


```js
Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;

```

可以这样来理解：作为一个对象，子类的原型属性指向父类；作为一个构造函数，子类的原型对象的是父类的原型对象的一个实例

## 原生构造函数的继承

原生构造函数是语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数如下

- String()
- Array()
- Number()
- Boolean()
- Object()
- RegExp()
- Error()
- Function()
- Date()

在ES6之前这些原生构造函数无法继承(寄生组合继承也会存在一些问题)。原生构造函数会忽略 `apply` 传入的 `this` 。即原生构造函数无法绑定 `this`，导致获取不到内部属性。

ES5是先新建子类的实例对象 `this`，再将父类的构造函数属性添加到子类上，由于父类的属性无法获取，导致无法继承原生的构造函数。

ES6是先新建父类实例对象的 `this`，再用子类的构造函数修饰 `this`。使得父类的所有行为都可以继承。

## Mixin 模式的实现

```js
function mix(...mixins) {
  class Mix {}

  for (const mixin of mixins) {
    copyProperties(Mix.prototype, mixin);
    copyProperties(Mix.prototype, Reflect.getPrototypeOf(mixin));
  }

  return Mix;
}

function copyProperties(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      Reflect.defineProperty(target, key, Reflect.getOwnPropertyDescriptor(source, key));
    }
  }
}
```

上面代码中的 `mix` 函数，可以将多个对象合成为一个类。使用的时候只要继承这个类即可。

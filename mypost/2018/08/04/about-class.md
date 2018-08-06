# Class 学习笔记

## Class 基本构成

```js
class Person {}
```

定义的一个类，在原型上会至少包含2个方法：

- `constructor` 构造函数(即使声明的时候没有构造函数，底层也会自动添加一个空的构造函数)

- `toString` 将类的实现变为字符串(完整重复类的声明的字符串)

**类的所有属性都定义在类的 `prototype` 属性上**

```js
class P {
  constructor(){}
  toString(){}
  toValue(){}
}

// 等同于

P.prototype = {
  constructor(){},
  toString(){},
  toValue(){},
};

// 用 Object.assign 能很方便的一次向类添加多个方法
Object.assign(P, {
  sayName(){},
  saySex(){},
});

```

**类内部定义的所有的方法，都是不可枚举的**

注意是类内部的，用 `Object.assign` 添加的可以枚举出来

```js
class P {
  constructor(){}
  toString(){}
}

// []
Object.keys(P.prototype);
// ['constructor', 'toStringg']
Object.getOwnPropertyNames(P.prototype);
```

**类必须使用 `new` 调用，否则会报错。这和普通构造函数存在区别。后者不用 `new` 也可以执行**

会报

```js
// TypeError: Class constructor P cannot be invoked without 'new'
```

## Class 表达式

与函数一样，类也可以使用表达式的形式定义

```js
const C1 = class P {
  sayClassName() {
    return P.name
  }
};

```

也可以省略等号右边的类名

```js
const C2 = class {
  sayClassName() {
    return this.name;
  }
};

```

采用 Class 表达式，写出立即执行的 Class

```js
const p = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    return this.name;
  }
}('lxfriday');

```

## 不存在变量提升

```js
new Foo(); // Reference Error: Foo is not defined
class Foo {}
```

这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。

```js
{
  let Foo = class {};
  class Bar extends Foo {
  }
}
```

上面的代码不会报错，因为 `Bar` 继承 `Foo` 的时候， `Foo` 已经有定义了

但是如果存在类的声明提升，则会报错。因为 `class` 会被提升到代码头部，而 `let` 命令是不提升的，所以导致 `Bar` 继承 `Foo` 的是时候， `Foo` 还没有定义。

## this 的指向

类的方法内部如果含有 `this` ，它默认指向类的实例。但是，单独使用的时候则可能会报错。单独提取出来，方法的 `this` 会指向该方法运行时所在的环境。会出现找不到对应的属性、方法而报错。

```js
class P {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }
  print(text) {
    console.log(text);
  }
}

const { printName } = new P();
printName(); // TypeError: Cannot read property 'print' of undefined
```

解决办法：

1、 在构造函数中绑定 `this`

```js
class P {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}

```

2、 使用箭头函数

```js
class P {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}

```

3、 使用 `Proxy` ，获取方法的时候，自动绑定 `this`

```js
function selfish(target) {
  const cache = new WeakMap();
  const handler = {
    get(target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') return value;
      // 将 value 的上下文固定绑定到 target 上。存入 cache 以免重复 bind
      if (!cache.has(value)) cache.set(value, value.bind(target));
      return cache.get(value);
    }
  };

  const proxy = new Proxy(target, handler);
  return proxy;
}
```

## 存值函数和取值函数是设置在属性的 Descriptor 对象上

```js
class CustomHTMLElement {
  constructor(el) {
    this.element = el;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }

}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, 'html'
);

console.log('get in ', 'get' in descriptor);
console.log('set in ', 'set' in descriptor);

```

## Class 的 Generator 方法

```js
class Foo {
  constructor(...args) {
    this.args = args;
  }

  // * 表示该方法是一个 Generator 函数
  // Symbol.iterator 方法返回一个 Foo 类的默认遍历器，for ... of 循环会自动调用这个遍历器
  * [Symbol.iterator]() {
    for (const arg of this.args) {
      yield arg;
    }
  }
}


for (const x of new Foo('hello', 'world')) {
  console.log(x);
}

// hello
// world
```

## Class 的静态方法

类相当于实例的原型，类中定义的非静态方法会被实例继承。加了 `static` 的静态方法不能被实例继承，只能直接通过类调用。(但可以被类的实例继承)

```js
class P {
  consreuctor(name) {
    this.name = name;
  }
  sayName() {
    return this.name;
  }

  static sayHello() {
    console.log('hello');
  }
}

const p1 = new P('lxfriday');
p1.sayName(); // lxfriday
p1.sayHello(); // TypeError: p1.sayHello is not a function
P.sayHello(); // hello
```

静态方法中的 `this` 指的是类而不是类的实例

```js
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world);
  }
}

Foo.bar(); // hello
```

父类的静态方法，可以被子类继承

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {

}

Bar.classMethod(); // hello
```

静态方法也是可以从 `super` 对象上调用的

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod();

```

## Class 的静态属性和实例属性

静态属性指的是 `Class` 本身的属性，即 `Class.propName` ，而不是定义在实例对象上的属性

**目前只能通过下面一种方式定义类的静态属性**

因为ES6明确规定， `Class` 内部只有静态方法没有静态属性

```js
class Foo {}
Foo.prop1 = 1;
```

目前正常环境中错误的写法

```js
class Foo {
  prop1: 1 // 写法1
  static prop: 1 // 写法2
}
```

## 下面是关于[静态属性](https://github.com/tc39/proposal-class-fields)的提案，对实例属性和静态属性都规定了写法

1、类的实例属性

```js
class P {
  myProp = 42;
  constructor() {
    console.log(this.myProp);
  }
}

```

2、类的静态属性

类的静态属性只要在类的实例属性前面加上 `static` 关键字

```js
class P {
  static prop = 1;
}
```

新提案的优势：

老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。另外，**新写法是显示声明（declarative），而不是赋值处理，语义更好**

## new.target 属性

该属性一般用在构造函数中，返回 `new` 命令作用于的那个构造函数。如果构造函数不是通过 `new` 命令调用的，`new.target` 则会返回 `undefined`。

```js
function P(name) {
  if (new.target !== 'undefined') {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

```

x
Class 内部调用 `new.target` ，会返回当前 Class。当子类继承父类时，会返回子类

利用这个特点，设计只有继承才能使用的类

```js
class Animal {
  constructor() {
    console.log(new.target);
    if (new.target === Animal) {
      throw new Error('Animal 类不能直接实例化')
    }
  }
}

class Dog extends Animal{
  constructor() {
    super();
    // ..
  }
}

```



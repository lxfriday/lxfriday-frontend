# instance 判断的依据

判断依据就是 `prototype`

```js
function Person(name) {
  this.name = name;
}

var p1 = new Person('p1');

// 意思是说p1.__proto__ 能不能再 Person 的原型链上找到
p1 instanceof Person; // true

// 更改了 Person 的原型的指向，但是 p1.__proto__ 还是指向的老地方
Person.prototype = { a: 1 }; // 

p1 instanceof Person; // false

p1 instanceof Object; // true

```

在实现js继承的时候，每一个用 `new` 构造出来的对象都会有一个私有属性，在FF和Chrome中这个私有属性叫做 `__prototype`，在IE中也有一个这样类似的私有属性，但没有暴露给用户。

这个属性指向其构造函数的 `prototype` ，在执行 `p1 = new Person('p1')` 的时候，会有这样的赋值 `p1.__proto__ = Person.prototype` 所以在Chrome和FF中：

`p1 instanceof Person` 相当于 `p1.__proto__ === Perosn.prototype || p1.__proto__.__proto__ === Perosn.prototype ...` 

IE中也是类似，只不过这个属性不叫 `__proto__` 

**属性、函数的重载**

当你读取 `o2.pro`的时候，会现在 `o2` 中寻找有没有一个叫 `pro` 的属性，没有的话就去 `o2.__proto__` 中找有没有，还没有的话，就去 `o2.__proto__.__proto__` 中去找（记住一个对象的 `__proto__` 就是其构造函数的 `prototype`）。。。这样一直下去其实最终会找到 `Object.prototype`，这样就实现了所有的对象都继承了  `Object` 。
当你写入 `o2.pro` 的时候就只会在 `o2` 中查找，不会递归的查找 `o2.__proto__` ,这样就会得到一个新的（如果没有的话）`pro` 属性，然后当你再次访问 `o2.pro` 的时候，就是访问的这个新的属性，即使 `o2.__proto__` 中有这个属性，这就完成了属性/函数的重载


**参考**

-[JavaScript中instanceof到底是以什么为依据呢？](https://segmentfault.com/q/1010000002697768)

# ToPrimitive

ToPrimitive 类型转换的处理方式

算法：ToPrimitive() -- 将值转换为原始值

要任意值转换为数字或者字符串，首先会被转换成原始值，然后再转换成最终的结果。

ECMAScript 规范中有一个这样的内部函数， `ToPrimitive()` （JavaScript中不能访问）能实现这个功能。

`ToPrimitive(input, PreferredType)`

可选参数 `PreferredType` 表示转换后的类型，它可以是 `Number` 或 `String` ，具体取决于其结果是希望转换成数字还是字符串。

## PreferredType

### PreferredType 是 Number

转换步骤如下

1. 如果 `input` 是原始值，返回这个值（没有其他需要做的）。
1. 否则，如果 `input` 是对象，调用 `input.valueOf()`。 如果结果是原始值，则返回结果。
1. 否则，调用 `input.toString()` 。如果结果是原始值，返回结果。
1. 否则，抛出一个 `TypeError` （说明将输入转换成原始值出错了）。

### PreferredType 是 String

将 Number 的转换步骤中第二步和第三步交换。


### PreferredType 也可以被省略

这种情况下，日期会被认为是 String 而其他值会被认为是 Number ，因此+运算符和==运算符可以操作 ToPrimitive()。

## 实战

**valueOf** 的默认实现会返回 `this` ，而 **toString** 的默认实现会返回类型信息。

```js
var empty = {};

empty.valueOf() === this ; // true

empty.toString(); // '[object Object]' 

```

```js
Number({}); // NaN , 直接跳过了 valueOf ，被 toString 转换成了 '[object Object]'，再转换成了 NaN
```

重写 `valueOf` 、 `toString` 可以修改默认的行为

```js
var n = { valueOf: function () { return 123 } };
Number(n); // 123
String(n); // '[object Object]'

var n = { toString: function () { return '7' } };
Number(n); // 7
String(n); // '7'
```

## 知识补充

### 原始值

JavaScript 中，对值的区分有点自由，

- 原始值包括：布尔、数字、字符串、null、undefined
- 其他的值都是对象

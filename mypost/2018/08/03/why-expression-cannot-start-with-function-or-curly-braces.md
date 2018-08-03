# 为什么表达式语句不能以大括号或 function 开头({}.toString() 报错原因)

语句：JavaScript应用程序是由许多**语法正确**的语句组成。语句的通就是告诉浏览器应该怎么样执行程序。语句之间使用 ";" 作为结尾，其中主要包括表达式语句、块语句、空语句和声明语句。

块语句(在其他语言中被称为复合语句)：用于组合另零个或多个语句。该块由一对大括号界定，可以是 labelled

```js
{}.toString(); // Uncaught SyntaxError: Unexpected token .

```

## 函数声明

    函数声明：定义一个具有指定参数的函数，以 function 开头，期中包括函数名，参数名，和函数语句块

例子：
```js
function funcName(arg1) {
  // 语句块
}
```
而 `function () {}.toString()` ，是以 `function` 开头的，JS中会将以 `function` 开头的语句认定为函数声明语句，其代码必须符合函数声明的语句规范。其声明中未包括函数名，不符合规范。

正确的做法是
```js
// 以 "(" 开头的语句JS并不会将其视作函数 
(function(){}).toString();

// 匿名函数
(function(){})()

void function(){}()

```

非函数声明的代码，不能以 `function` 开头

## 语句块

    将零个或多个语句联合在一起，形成一条复合语句，用大括号将其包括。

```js
{}; // undefined
{a: 'a'}; // 'a'
{a: 'a'}.a; // Uncaught SyntaxError: Unexpected token .
```

第二行代码，输出 'a' ，这里的冒号是一个[标识符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label)，类似于C语言中的标记符。JS中是和和 break 或 continue 语句一起使用。
第三行代码等同于 `a:'a';.a` 没有通过对象主体获取属性 'a' ，所以报错。

上面的 `{}.toString()` 等同于 `;.toString()` 没有通过对象主体调用 "toString" 方法，不符合[JS中期望的表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Unexpected_token)


**总结**

JS语句中为什么不能以 "function" 或者大括号开头?

- 以 "function" 开头，但必须是一个函数声明 
- 以大括号开头，该大括号不再被当作一个对象，而是一个块语句



参考文章

- [语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements)
- [块语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/block)
- [标记语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label)
- [JS语句为什么不能以“function”与大括号开头](https://segmentfault.com/a/1190000012721319)

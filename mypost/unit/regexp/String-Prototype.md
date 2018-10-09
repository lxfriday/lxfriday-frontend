# JS 中通过 String.prototype 调用的和正则匹配相关的内容

## `String.prototype.replace`
### 参数
1. regexp || string 用来进行匹配的正则或者字符串
1. string || function 用来替换的字符串或者每次匹配到都会调用的函数

**第二个函数是 function 的用法**

- `match` 匹配到的子串
- `p1,p2,p3 ...` 没有设置捕捉的情况下没有该参数，例子 `/(\a+)(\b+)/`，则 `p1` 为 `\a+` 匹配到的，`p2` 为 `\b+` 匹配到的
- `offset` 被匹配到的子串在整个字符串中的起始索引位置
- `string` 整个被匹配的原始字符串

```js
'1 2 3'.replace(/\d/g, console.log)
// 1 1 0 1 2 3
// 1 2 2 1 2 3
// 1 3 4 1 2 3
// "undefined undefined undefined"
'1 2 3'.replace(/(\d)/g, console.log)
// 1 1 1 0 1 2 3
// 1 2 2 2 1 2 3
// 1 3 3 4 1 2 3
// "undefined undefined undefined"
'aaaaaabbbbc'.replace(/(a+)(b+)/, console.log)
// aaaaaabbbb aaaaaa bbbb 0 aaaaaabbbbc
// "undefinedc"
```

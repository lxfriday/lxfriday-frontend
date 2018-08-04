# ES5中 Object.Create 的实现

`ES5 sham` 中 `Object.create` 模拟实现

```js
var createEmpty;
// 判断输入值是否是原始值
var isPrimitive = function isPrimitive(o) {
  return o == null || (typeof o !== 'object' && typeof o !== 'function');
};
// 是否支持 __proto__
var supportsProto = !({ __proto__: null } instanceof Object); // 正常浏览器中 {__proto__: null} instanceof Object 为false

// 省略部分
createEmpty = function () {
  return { __proto__: null };
};

Object.create = function create(prototype, properties) {
  var object;
  var Type = function Type() {}; // An empty constructor.

  // 传入 null 则返回一个没有原型的空对象
  if (prototype === null) {
    // 参数为 null 则创建出来的对象是没有原型的
    object = createEmpty();
  } else {
    // 第一个参数不为 null，时只能是对象
    if (prototype !== null && isPrimitive(prototype)) {
      throw new TypeError('Object prototype may only be an Object or null'); // same msg as Chrome
    }
    Type.prototype = prototype;
    object = new Type();
  }

  // void 0 为 undefined ，为了防止 undefined 被篡改
  if (properties !== void 0) {
    Object.defineProperties(object, properties);
  }

  return object;
};

```

需要特别注意：

参数为 `null` 的时候，返回的对象是一个没有原型的空对象

1. 第一个参数只能为 `null` 或者 对象

1. 第二个参数不能为 `undefined`

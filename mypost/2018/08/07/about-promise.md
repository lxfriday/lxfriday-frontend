# Promise 相关

## [Promise 的模拟实现](../../../../implementation/implementation-of-promise.js)

## 使用 Promise 实现 Ajax 操作

```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject) {
    
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    client.setRequestHeader('Accept', 'application/json');
    client.responseType = 'json';
    client.send();
  });
  return promise;
};

getJSON('xxxx').then(function(data) {
  console.log(data);
}, function(err) {
  conso.log('出错了', err);
})
```

## resolve reject 传递的参数带来的行为影响

调用 `resolve` `reject` 的时候，传递的参数会传递给后面的 `then` 的回调函数。 `reject` 传递的参数通常是 `Error` 对象的实例，表示抛出错误。`resolve` 的参数可能是另一个 `Promise` 实例。即一个异步操作的结果是返回另一个异步操作。

**注意** 这个时候 `p1` 的状态决定了 `p2` 的状态。如果 `p1` 的状态是 `pending` 则 `p2` 会等待 `p1` 的状态改变。

```js
const p1 = new Promise(function(resolve) { setTimeout(() => resolve(1), 1000); });
const p2 = new Promise(function(resolve) { setTimeout(() => resolve(p1), 1000); });

p2.then(data => console.log(data)).catch(err => console.log('catch err'));
```

回调 Promise，让计数器有条不紊的进行 

```js
let count = { a: 0 };
const timeout = function(c) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      console.log(c.a++);
      resolve(c);
    }, 1000);
  });
}

let p1 = Promise.resolve(count);

for (let index = 0; index < 20; index++) {
  p1 = p1.then(timeout);
}

// 从0到19依次打印出来
```

`resolved` 的 Promise 是在 **本轮事件循环的末尾执行，总是晚于本轮循环的同步任务** ，所以，在 `resolve()` 后面的语句会正常执行，且会先于 resolve 执行。但不推荐在 `resolve()` 后面写其他执行语句，让  `resolve()` 作为最后一条语句比较好。

## Promise 的原型方法

### Promise.prototype.then()

`then` 方法返回的是一个新的 `Promise` 实例(不是原来的那个 `Promise` 实例)。因此可以采用链式写法，即 `then` 方法后面再调用另一个 `then` 方法。


### Promise.prototype.catch()

`Promise.prototype.catch` 方法是 `.then(null, rejection)` 的别名，用于指定发生错误时的回调函数

**Promise 可以吃掉本轮事件循环的错误**

```js
new Promise(function(resolve, reject) {
  xxx;
})
setTimeout(console.log, 3000, 'hello console');

// 会先报错，但是定时器到3秒的时候仍然会执行打印
```

在另外一轮事件循环中报错则无法捕捉，添加 `.catch` 也捕捉不到

```js
const p = new Promise(function(resolve, reject) {
  resolve('ok');
  setTimeout(() => xxxx, 3000);
});

p.then(data => console.log(data)).catch(err => console.log(err));
```

若前面的语句中没有错误出现，则会直接跳过 `.catch`

```js
Promise.resolve().catch(err => console.log('err => ', err)).then(() => console.log('go on'));
```

### Promise.prototype.finally()

`finally` 里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果

`finally` 本质上是 `then` 方法的特例

```js
promise.finally(() => {
  // 语句
});

// 等同于
promise.then(
  result => {
    // 语句

    return result;
  },
  err => {
    // 语句

    throw error;
  },
);
```

`.finally` 的模拟实现，特点：

- 不管前面的状态是 `fulfilled` 还是 `rejected` ，都会执行 `finally` 里面的回调
- 回调没有参数
- 返回一个 Promise ，且总是会返回原来的值

```js
Promise.prototype.finally = function(cb) {
  const P = this.constructor;
  return this.then(
    value => P.resolve(cb()).then(() => value),
    reason => P.resolve(cb()).then(() => throw reason),
  );
};
```

## Promise 的属性方法

### Promise.all()

用于将多个 Promise 实例包装成一个 Promise 实例。接受一个含有 Iterator 接口的类数组或者数组。数组中的条目需要是 Promise 实例，如果不是则会被 `Promise.resolve` 方法包裹之后作为参数。

```js
const p = Promise.all([p1, p2, p3]);
```

`p` 的状态由 `p1`、`p2`、`p3` 决定，分成两种情况

1、 `p1`、`p2`、`p3` 的结果都变成 `fulfilled` ， `p` 的结果才会变成 `fulfilled`，同时 `p1`、`p2`、`p3` 的返回值构成一个数组，传递给 `p` 的回调函数

2、 `p1`、`p2`、`p3` 其中有一个的状态变成了 `rejected` ，此时第一个返回 `rejected` 的实例的返回值，会传递给 `p` 的回调函数(同时其他的 Promise 实例就不会执行了)


```js
// 都返回 fulfilled

const pps = [1000, 2000, 3000, 4000, 5000].map(function(t){
	return new Promise(function(resolve, reject){
		setTimeout(() => {
			console.log(t);
			resolve(t);
		}, t);
	});
});

Promise.all(pps).then(data => console.log({finalData: data})).catch(err => console.log('err ' + err));

// 其中有一个是 rejected

const pps = [1000, 2000, 3000, 4000, 5000].map(function(t){
	return new Promise(function(resolve, reject){
		setTimeout(() => {
			console.log(t);
      if (t === 3000) {
        reject(t);
      } else {
        resolve(t);
      } 
		}, t);
	});
});

Promise.all(pps).then(data => console.log({finalData: data})).catch(err => console.log('err ' + err));

// 1000
// 2000
// 3000
// err 3000
// 4000
// 5000
```

当 Promise 实例定义了自己的 `catch` 方法的时候，当它 `rejected` 之后，并不会触发 `Promise.all` 的 `catch` 方法

```js
const p1 = new Promise(function(resolve, reject) {
  resolve('hello');
})
.then(d => d)
.catch(e => e);

const p2 = new Promise(function(resolve, reject) {
  throw new Error('报错了');
})
.then(d => d)
.catch(e => e);

Promise.all([p1, p2])
.then(d => d)
.catch(e => console.log(e));

```

`p2` 的 `rejected` 被自己的 `catch` 捕捉之后，也会返回一个 Promise，状态变成 `resolved`，导致 `Promise.all` 方法参数里面的两个实例的状态都是 `resolved` ，因此会调用 `then` 方法的回调，不调用去 `catch` 方法。

### Promise.race()

`Promise.race` 的参数同 `Promise.all` ，如果不是 Promise 实例，会先包装

只要 `p1`、`p2`、`p3` 中有一个实例的状态率先改变，就会将结果直接传给后面的回调。忽略掉其他实例的结果。

```js
const p = Promise.race([p1, p2, p3]);
```

### Promise.resolve()

`Promise.resolve` 等价于下面的写法

```js
new Promise(resolvle => resolve('foo'));
```

#### 参数是一个 Promise 实例

不做任何修改，原封不用的返回原来的实例

#### 参数是一个 `thenable` 对象

`thenable` 对象指的是具有 `then` 方法的对象

```js
const thenableObj = {
  then: function(resolve, reject) {
    resolve(11)
  }
};
```

`Promise.resolve` 方法会将这个对象转为 Promise 对象，然后就立即执行 `thenable` 对象的 `then` 方法。

```js
const thenableObj = {
  then: function(resolve, reject) {
    resolve(11)
  }
};

const p1 = Promise.resolve(thenableObj);
p1.then(function(value) {
  console.log(value);
});
```

#### 参数不是具有 `then` 方法的对象，或者根本就不是对象，或者没有值

`Promise.resolve` 方法返回一个新的 Promise 对象，状态为 `resolved`，参数会传递给后面的回调函数

```js
const p = Promise.resolve('Hello');

p.then(d => console.log(d));

// hello
```

**注意** 立即 `resolve` 的 Promise 对象，是在本轮事件循环结束时，而不是在下轮事件循环开始时。

```js
// settTimeout(fn, 0) 在下一轮事件循环开始时执行
setTimeout(() => console.log('three'), 0);
// Promise.resolve 在本轮事件循环结束时执行
Promise.resolve().then(() => console.log('two'));
// console.log 是立即执行
console.log('one');

// one
// two
// three
```

### Promise.reject()

会返回一个 Promise 实例，该实例的状态为 `rejected`

`Promise.reject` 等同于

```js
new Promise(function(resolve, reject) {
  reject('出错了');
});
```

**注意** `Promise.reject` 的参数会原封不动的作为后面回调的参数

```js
const thenableObj = {
  then: function(resolve, reject) {
    reject('error!!!!');
  }
};

const p = Promise.reject(thenableObj);

p.then(null, err => console.log('err => ', {
  err,
  equal: err === thenableObj, // true 是原对象的引用
}));

```

# Promise/A+ 规范

promise 代表异步操作的最终结果。和 promise 交互的基本方式是通过它的 `then` 方法，它注册回调来接收 promise 的最终结果或者 promise 不能 fulfill 的原因。

## 1、几个术语
- `promise`
- `thenable`
- `value`
- `exception` 通过 `throw` 抛出的异常
- `reason` promise 为什么变成 `rejected`

## 2、要求

### 2.1、 Promise 状态

promise 只有三种状态 `pending`、`fulfilled`、`rejected`

#### 2.1.1、当处于 `pending` 状态
1. promise 可以变成 `fulfilled`、`rejected`

#### 2.1.2、当处于 `fulfilled` 状态
1. promise 不能变成其他状态
1. 必须有一个不能变的值

#### 2.1.3、当处于 `rejected` 状态
1. promise 不能变成其他状态
1. 必须有一个不能变的 reason

**注意** 不能变 指的是immutable identity(===)，但不是指的deep immutability

### 2.2、`then` 方法

promise 必须提供一个 `then` 方法，用来访问它现在的或者最终的值或者reason

`then` 方法接受两个参数

```js
promise.then(onFulfilled, onRejected)
```

#### 2.2.1 `onFulfilled` 和 `onRejected` 都是可选的参数
1. 如果 `onFulfilled` 不是一个函数，则它会被忽略
1. 如果 `onRejected` 不是一个函数，则它会被忽略
1. 如果 `onFulfilled` 是一个函数
    1. 它必须等待 `promise` 变成 `fulfilled` 状态后才执行，同时 `promise` 的 value 作为它的参数
    1. 它必须等待 `promise` 变成 `fulfilled` 状态之后才会执行
    1. 它只会被调用不超过一次
1. 如果 `onRejected` 是一个函数
    1. 它必须等待 `promise` 变成 `rejected` 状态后才执行，同时 `promise` 的 reason 作为它的参数
    1. 它必须等待 `promise` 变成 `rejected` 状态之后才会执行
    1. 它只会被调用不超过一次
1. `onFulfilled` 或者 `onRejected` 必须等到执行上下文栈只包含 platform code 的时候才执行
1. `onFulfilled` 和 `onRejected` 必须作为函数执行，没有 `this`
1. 在同一个 promise 上面可以调用多次 `then`
    1. 当 `promise` 的状态是 `fulfilled`，所有相应的 `onFulfilled` 回调会按照 `then` 原始的顺序依次执行
    1. 当 `promise` 的状态是 `rejected` ，所有相应的 `onRejected` 回调会按照 `then` 原始的顺序依次执行
1. `then` 必须返回一个 promise

    ```js
    promise2 = promise1.then(onFulfilled, onRejected);
    ```
    1. 如果 `onFulfilled` 或者 `onRejected` 返回一个值 `x` ，那么执行 Promise Resolution Procedure `[[Resolve]](promise2, x)`
    1. 如果 `onFulfilled` 或者 `onRejected` 抛出一个异常 `e`，那么 `promise2` 必须用 `e` 作为被 reject 的 reason
    1. 如果 `onFulfilled` 不是一个函数并且 `promise1` 的状态是 `fulfilled`，那么 `promise2` 必须是 `fulfilled` 状态并且拥有同 `promise1` 相同的后续回调参数
    1. 如果 `onRejected` 不是一个函数并且 `promise1` 的状态是 `rejected`，那么 `promise2` 必须是 `rejected` 状态并且 reason 同 `promise1`

### 2.3 The Promise Resolution Procedure

The **promise resolution procedure** is an abstract operation taking as input **a promise and a value** , which we denote as `[[Resolve]](promise, x)`。如果 `x` 是 `thenable` 对象，`promise` 将会使用 `x` 的状态(`x` 是 promise)。否则 `promise` 的状态会变成 `fulfilled` 同时将 `x` 作为回调的参数。

执行 `[[resolve]](promise, x)` (`promise` 是执行后的结果，`x` 是 `onFulfilled` 或者 `onRejected` 执行后的返回值)，按照下面的步骤进行

1. 如果 `promise` 和 `x` 指向同一个对象， `promise` 变成 `rejected` 状态并抛出 `TypeError` 异常
1. 如果 `x` 是一个 promise，则应用它的状态
    1. 如果 `x` 处于 `pending` 状态， `promise` 必须保持 `pending` 状态直到 `x` 变成 `fulfilled` 或者 `rejected`
    1. 如果 `x` 处于 `fulfilled`状态，则fulfill `promise`，同时将值作为后面回调的参数
    1. 如果 `x` 处于 `rejected` 状态， 则reject `promise`，同时将reason作为后面回调的reason
1. 如果 `x` 是对象或者函数
    1. 让 `then` 变成 `x.then`
    1. 如果检索 `x.then` 导致抛出异常 `e`，reject `promise` with `e` as the reason
    1.  如果 `then` 是一个函数，则把 `x` 作为 `this` 执行函数，第一个参数 `resolvePromise` 第二个参数 `rejectPromise`
        1. 如果 `resolvePromise` 执行，同时以 `y` 作为参数，则执行 `[[Resolve]](promise, y)`
        1. 如果 `rejectPromise` 执行，同时以 `r` 作为reason，reject `promise` with `r`
        1. 如果 `resolvePromise` 和 `rejectPromise` 都被执行了，或者其中一个多次执行，则只有第一个执行的有效，其它的都会被忽略
        1. 如果执行 `then` 的时候抛出异常 `e`
            1. 如果 `resolvePromise` 或者 `rejectPromise` 执行了，则忽略异常
            1. 否则 reject `promise` with `e` as the reason
    1. 如果 `then` 不是函数，则 fulfill `promise` with `x`
1. 如果 `x` 不是对象或者函数，fulfill `promise` with `x`
















## 参考链接

- [https://promisesaplus.com](https://promisesaplus.com)

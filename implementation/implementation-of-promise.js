/**
 * Promis 的简单模拟实现
 */


// state: PENDING、FULFILLED、REJECTED
class MPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new Error('Executor must be a functon! ');
    }

    this.$state = 'PENDING';
    this.$chained = [];
    // new Promise(function(resolve, reject) {  })

    const resolve = res => {
      // 首先判断状态
      if (this.$state !== 'PENGDING') {
        return;
      }

      // 如果 res 是 thenable (带有then方法额对象)
      // 将锁定 promise 来保持跟 thenable 的状态一致
      if (res !== null && typeof res.then === 'function') {
        // 这种状态下，promise 是resolved 但是仍然处于 PENDING 状态
        return res.then(resolve, reject);
      }

      // --------------------------
      // 更改状态，修改传递的值
      this.$state = 'FULFILLED';
      this.$internalValue = res;
      // --------------------------


      // 执行 fufilled 的值
      for (const { onFulfilled } of this.$chained) {
        onFulfilled(res);
      }
    };
    const reject = res => {
      if (this.$state !== 'PENGDING') {
        return;
      }
      this.$state = 'REJECTED';
      this.$internalValue = res;
      for (const { onRejected } of this.$chained) {
        onRejected(res);
      }
    };

    try {
      executor(resolve, reject);
    } catch(err) {
      reject(err);
    }
  }

  // 依据前面的状态返回的结果
  then(onFulfilled, onRejected) {
    return new MPromise((resolve, reject) => {
      const _onFulfilled = res => {
        try {
          resolve(onFulfilled(res));
        } catch (err) {
          reject(err);
        }
      };

      const _onRejected = res => {
        try {
          reject(onRejected(res));
        } catch (err) {
          reject(err);
        }
      };

      if (this.$state === 'FULFILLED') {
        _onFulfilled(this.$internalValue);
      } else if (this.$state === 'REJECTED') {
        _onRejected(this.$internalValue);
      } else {
        this.$chained.push({
          onFulfilled: _onFulfilled,
          onRejected: _onRejected,
        });
      }
    });
  }
}


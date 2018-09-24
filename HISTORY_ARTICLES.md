# 好文共欣赏
    (👍 赞) (⚡ 重要)(⭐ 我的博客文章)

- 2018.09.23
    - [理解事件循环二(macrotask和microtask)](https://github.com/ccforward/cc/issues/48)
        - Microtasks: process.nextTick, promise
        - Macrotasks: setTimeout, setInterval, setImmediate, I/O
    - [理解 JavaScript 中的 macrotask 和 microtask](https://juejin.im/entry/58d4df3b5c497d0057eb99ff)
        - 如果我的某个 microtask 任务又推入了一个任务进入 microtasks 队列，那么在主线程完成该任务之后，仍然会继续运行 microtasks 任务直到任务队列耗尽。
        - 而事件循环每次只会入栈一个 macrotask ，主线程执行完该任务后又会先检查 microtasks 队列并完成里面的所有任务后再执行 macrotask
    - [Stack的三种含义 -- 阮一峰](http://www.ruanyifeng.com/blog/2013/11/stack.html)
        - 栈中的数据占用空间大小是确定的，堆中数据占用的大小是不确定的，堆需要GC进行空间回收，栈在当前执行上下文结束之后进行回收
    - ⚡ [JavaScript 运行机制详解：再谈Event Loop -- 阮一峰](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
    - [从setTimeout-setInterval看JS线程](https://segmentfault.com/a/1190000013702430)
    - 👍 [你不曾察觉的隐患：危险的 target="_blank" 与 “opener”](https://segmentfault.com/a/1190000016421263)

- 2018.09.22
    - ⚡ [深入剖析 JavaScript 的深复制](http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)
    - ⚡ [JavaScript中的缓冲数组和强类型数组 ArrayBuffer、TypedArray](https://zhuanlan.zhihu.com/p/30938992)

- 2018.08.13
    - ⚡ [setTimeout、setImmediate、process.nextTik 的区别](https://www.cnblogs.com/onepixel/articles/7605465.html)
        - idle观察者(process.nextTik) >> io观察者(setTimeout) > check观察者(setImmediate)
    - ⚡ [排序算法详解](https://www.cnblogs.com/onepixel/articles/7674659.html)

- 2018.08.10
    - ⚡ [Promises/A+ 规范](https://promisesaplus.com)

- 2018.08.03
    - 👍 [继承的多种方式及优缺点](https://github.com/mqyqingfeng/Blog/issues/16)
    - ⭐ [为什么表达式语句不能以大括号或 function 开头({}.toString() 报错原因)](./mypost/2018/08/03/why-expression-cannot-start-with-function-or-curly-braces.md)


- 2018.08.02
    - [JavaScript深入之创建对象的多种方式以及优缺点](https://github.com/mqyqingfeng/Blog/issues/15#issue-227556285)
    - 👍 [JS中运算符的优先级 运算符的优先级决定了表达式中运算执行的先后顺序](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
        - 结合性决定了拥有相同优先级的运算符的执行顺序(左结合、右关联)
        - 20 圆括号(最大)
        - 19 成员访问、需要计算的成员访问、new
        - 18 后置++、后置--
        - 3 赋值运算符(从右到左) =、+=、-=、*=
        - 0 ,

    - [emoji符号 🌹🍀🍎💰📱🌙🍁🍂🍃🌷💎🔪🔫🏀⚽⚡👄👍🔥](http://www.fhdq.net/emoji.html)

- 2018.07.31
    - 👍 [乐意黎 JS根据useAgent来判断edge, ie, firefox, chrome, opera, safari 等浏览器的类型及版本](https://blog.csdn.net/aerchi/article/details/51697592)


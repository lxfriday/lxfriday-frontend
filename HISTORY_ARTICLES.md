# 好文共欣赏
    (👍 赞) (⚡ 重要)(⭐ 我的博客文章)
    
- 2018.10.03
    - [页面重排与重绘（Reflow & Repaint)](https://zhuanlan.zhihu.com/p/35184404)
        ![intro](http://qiniu1.lxfriday.xyz/common/v2-b03158856ef36b4668d101e13ea949ed_hd.jpg)
        - reflow（重排）：当涉及到 DOM 节点的布局属性发生变化时，就会重新计算该属性，浏览器会重新描绘相应的元素
        - repaint（重绘）：当影响 DOM 元素可见性的属性发生变化（color、visibility等），浏览器会重新描绘相应的元素。重排必然会引起重绘
        - 浏览器渲染的大致流程：
            1. 渲染 HTML 文档，构建 DOM 树
            1. 解析 CSS 属性，构建 CSSOM 树
            1. 结合 DOM 树和 CSSOM 树，构建 render 树
            1. 在 render 树的基础上布局，计算每个节点的几何结构
            1. 把每个节点绘制在屏幕上
        - 一个页面可以简单的看成由两部分构成
            - DOM 节点，描述页面的结构
            - DOM 节点的属性，描述 DOM 节点如何呈现
        - reflow 发生在第4步， repaint 发生在第5步
        - **如何减少reflow、repaint**
            - 避免 js 逐条更改样式，使用 className
            - 避免频繁操作 dom ，创建 documentFragment 或 div，在它上面应用 DOM 操作之后，添加到文档中
            - 在设置为 `display: none` 的元素上操作，最后显示出来
            - 避免频繁读取元素集合属性（scrollTop等）
            - 绝对定位具有复杂动画的元素。使其脱离文档流，避免引起父元素及其后续元素大量重排
    - [对 DOM 树进行深度优先和广度优先遍历](./mypost/2018/10/03/bfs-dfs-on-dom.md)
    - [querySelectorAll 方法相比 getElementsBy 系列方法有什么区别？](https://www.zhihu.com/question/24702250)
        - w3c 标准：`querySelectorAll` 属于 W3C 中的 Selectors API 规范，而 `getElementsBy*` 系列则是属于 W3C DOM 规范
        - 接收参数： `querySelectorAll` 接收的参数是一个 CSS 选择符（必须严格符合 CSS 选择器命名规范，否则会抛出异常 DOMException），`getElementsBy*` 的参数只能是单一的 className、tagName、name、id
        - 返回值：`querySelectorAll` 返回的是一个 Static Node List（页面 DOM 变动不会影响之前已经获取到的返回值），`getElementsBy*` 返回的是 Live Node List（之前的返回值会受到页面的 DOM 变动影响）
        - chrome 中的效果
            - `document.querySelectorAll('a').toString();    // return "[object NodeList]"`
            - `document.getElementsByTagName('a').toString();    // return "[object HTMLCollection]"`
            - `Note: Collections in the HTML DOM are assumed to be live meaning that they are automatically updated when the underlying document is changed.`
        - HTMLCollection 是属于 **Document Object Model HTML** 规范，而 NodeList 属于 **Document Object Model Core** 规范。
            ```js
                var ul = document.getElementsByTagName('ul')[0],
                    lis1 = ul.childNodes,
                    lis2 = ul.children;
                console.log(lis1.toString(), lis1.length);    // "[object NodeList]" 11
                console.log(lis2.toString(), lis2.length);    // "[object HTMLCollection]" 4

            ```
        - NodeList 对象会包含文档中的所有节点，如 Element、Text 和 Comment 等。
        - HTMLCollection 对象只会包含文档中的 Element 节点。


- 2018.10.01
    - [图 JS实现](mypost/base/democode/Graph.js)
        - 图的实现：邻接矩阵、邻接表、关联矩阵
    - [集合（百度百科）](https://baike.baidu.com/item/%E9%9B%86%E5%90%88/2908117?fr=aladdin)
        - [JS 实现](mypost/base/democode/Set.js)
        - 集合的表示方法有：列举、描述、图像、符号法
        - 列举法：N = {1,2,3,4,5} （这也是计算机中常用的表示法）
     - [二叉搜索树的 JS 实现](mypost/base/democode/BinarySearchTree.js)
    - [红黑树](https://baike.baidu.com/item/%E7%BA%A2%E9%BB%91%E6%A0%91/2413209?fr=aladdin#reference-[1]-133754-wrap)
        - 红黑树的节点是红色或黑色的
        - 根节点是黑色的
        - 每个叶节点（NIL、空节点）是黑色的
        - 每个红色节点的两个子节点都是黑色的（从每个叶子节点到根的所有路径上不能有两个连续的红色节点）
        - 从任一节点到其每个叶子节点的所有路径都包含相同数目的黑色节点
    - [理解红黑树左旋和右旋](http://www.cnblogs.com/skywang12345/p/3245399.html)
        - 左旋意味着将节点变成其右子节点的左子节点，然后其原有右子节点的左子节点变成节点的右节点（右旋类推）

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


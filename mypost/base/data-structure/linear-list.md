# 线性表

## 定义

一个线性表是n个具有相同特性的数据元素的有限序列（数据元素是一个抽象的符号，其具体含义在不同的情况下一般不同）

## 拓展

在稍复杂的线性表中，一个数据元素可由多个数据项组成，此种情况下常把数据元素称为记录（record），含有大量记录的线性表又称为文件（file）。

线性表中的个数n定义为线性表的长度，n=0时称为空表。在非空表中每个数据元素都有一个确定的位置，如用a<sub>i</sub>表示数据元素，则称i为该数据元素在线性表中的位序

线性表的相邻元素之间存在着序偶关系。（a<sub>1</sub>，...，a<sub>n</sub>）表示一个顺序表，则表中a<sub>i-1</sub>领先于a<sub>i</sub>，a<sub>i</sub>领先于a<sub>i+1</sub>，称a<sub>i-1</sub>是a<sub>i</sub>的直接前驱元素，a<sub>i+1</sub>是a<sub>i</sub>的直接后继元素。

## 分类

“线性”和“非线性”，只在 **逻辑层次** 上讨论，而不考虑存储层次，所以双向链表和循环链表依旧是线性表。

在 **数据结构层次** 上划分，线性表可分为一般线性表和受限线性表。一般线性表即常说的“线性表”，可以自由的删除或者添加结点。受限线性表主要包括栈和队列，受限表示对结点的操作受限。

## 特征

1. 集合中必存在唯一的一个“第一元素”
1. 集合中必存在唯一的一个“最后元素”
1. 除最后一个元素外，均有唯一的后继（后件）
1. 除最后一个元素外，均有唯一的前驱（前件）

## 存储结构

线性表主要由顺序表示或者链式表示。

顺序表示指的是用 **同一组地址连续的存储单元** 依次存储线性表的数据元素，称为线性表的顺序存储结构或顺序映像（sequential mapping）。它以“物理位置相邻”来表示线性表中数据元素间的逻辑关系，可随机存取表中的任一元素。

链式表示指的是用 **一组任意的存储单元** 存储线性表中的数据元素，称为线性表的链式存储结构。它的存储单元可以是连续的，也可以是不连续的。在表示数据元素之间的逻辑关系时，除了存储其本身的信息之外，还需存储一个指示其直接后继的信息（即直接后继的存储位置），这两部分信息组成数据元素的 **存储映像**，称为 **结点（node）** 。它包括两个域：存储数据元素信息的域为 **数据域**；存储直接后继存储位置的域称为 **指针域**。指针域中存储的信息称为指针或链。

## 结构特点

1. 均匀性：虽然不同数据表的数据元素可以是各种各样的，但对于同一线性表的各数据元素必定具有 **相同的数据类型** 和 **长度**
1. 有序性：各数据元素在线性表中的位置只取决于他们的序号，数据元素之前的相对位置是线性的，即存在唯一的“第一个”和“最后一个”的数据元素，除了第一个和最后一个外，其他元素前面均只有一个数据元素（直接前驱）和后面均只有一个数据元素（直接后继）

---

## 线性表、顺序表、链表的概念区分

|存储类别|顺序存储|单链表|
|:-:|:-:|:-:|
|存储分配方式|用一段连续的存储单元依次存储线性表的数据元素|采用链式存储结构，用一组任意的存储单元存放线性表的元素|
|时间性能|查找O（1）、插入和删除O（n）|查找O（n）、插入和删除O（1）|
|空间性能|需要预分配存储空间，分配小了容易上溢，分配大了容易浪费|不需要分配存储空间，只要有就可以分配，元素个数不受限制|

线性表是逻辑结构，顺序表、链表是存储结构

### 线性表及其分类

1. 元素个数有限
1. 逻辑上元素有先后顺序
1. 数据类型相同
1. 仅讨论元素间的逻辑关系

线性表包括：顺序存储、链式存储。

顺序存储包括顺序表。

链式存储包括单链表、双链表、循环链表（这三个都是指针实现），静态链表（借助数组实现）。链表的定义是递归地，它或者为空null，或者指向另一个节点node引用，这个节点含有下一个节点或链表的引用。有点是插入删除操作不需要移动大量的元素，缺点是查找只能从头遍历整个链表。

#### 顺序表

使用数组实现，一组地址连续的存储单元，数组大小有两种方式指定，一是 **静态分配**，二是 **动态扩展**。

线性表从1开始，数组从0开始。

优点：随机访问，查找O（1），存储密度高；逻辑上相邻，物理上也相邻。

缺点： 插入删除操作需要移动大量元素。

#### 单链表

使用任意存储单元来存储线性表中的数据元素。单链表分为带头结点和不带头结点两种，不管有没有头结点，头指针都指向链表的第一个节点（有头结点指向头结点）。

头结点：数据域可不设置任何信息，头结点的指针域有指向链表的第一个元素。

带头结点的好处：

1. 链表第一位置节点上的操作和其他位置上的操作一致
1. 无论链表是否为空，头指针都指向头结点（非空），空表和非空表处理一样

JS实现单链表

```js

// 链表的结点
class Node {
  constructor(el) {
    this.element = el;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // 向链表尾部添加一个元素
  append(el) {
    const node = new Node(el);
    let current = this.head;
    // 长度为0，则赋予为头结点
    if (current === null) {
      this.head = node;
    } else {
      // 长度不为0，则接到尾结点的next属性上
      while(current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }

  // 向链表中插入一个元素
  insert(pos, el) {
    if (pos >= 0 && pos <= this.length) {
      const node = new Node(el);
      let current = this.head;
      let prev = null;
      let index = 0;
      if (pos === 0) {
        // 插到头结点上
        this.head = node;
        node.next = current;
      } else {
        // 插到中间的某个结点上
        while(index++ < pos) {
          prev = current;
          current = current.next;
        }
        prev.next = node;
        node.next = current;
      }
      this.length++;
      return true;
    }
    return false;
  }

  // 依据下标删除
  removeAt(pos) {
    if (pos > -1 && pos < this.length) {
      let current = this.head;
      let prev = null;
      let index = 0;
      if (pos === 0) {
        this.head = current.next;
      } else {
        while(index++ < pos) {
          prev = current;
          current = current.next;
        }
        prev.next = current.next;
      }
      this.length--;
      return current.element;
    }
    return null;
  }

  // 查找某个元素所在的index
  indexOf(el) {
    let index = -1;
    let current = this.head;
    while(current) {
      if (current.element === el) {
        return index + 1;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  // 依据元素删除
  removeByValue(el) {
    const index = this.indexOf(el);
    if (index !== -1) {
      return this.removeAt(index)
    }
    return false;
  }

  // 获取每个结点上的值，推入数组中
  nodeElementArray() {
    const result = [];
    let current = this.head;
    while(current) {
      result.push(current.element);
      current = current.next;
    }
    return result;
  }
}

```

#### 双链表

相比于单链表，每个结点添加了一个指向前驱的结点。 [prior|data|next]

#### 循环单链表

和单链表的区别在于，表中最后一个节点的指针不为null，而改为指向头结点（第一个节点），从而整个链表形成一个环。（只有尾指针的循环单链表，可以很方便的操作表头和表尾，因为尾指针的后继就是头指针）

#### 循环双链表

和双链表的区别在于，头结点的prior指针指向尾结点，尾结点的next指针指向头结点。

#### 静态链表

静态链表是借助数组来描述线性表的链式存储结构，结点也有数据域和指针域，这里的指针是结点的相对地址（数组下标），也需要预先分配一块连续的内存空间。


### 顺序表和链表的比较

1. 顺序表可以顺序存取也支持随机存取；链表只能顺序存取；
1. 顺序表逻辑上相邻的物理上也相邻；而链表不一定；
1. 顺序表插入和删除需要移动大量的元素；链表只需要修改指针即可；


## 参考资料

- [https://baike.baidu.com/item/%E7%BA%BF%E6%80%A7%E8%A1%A8/3228081](https://baike.baidu.com/item/%E7%BA%BF%E6%80%A7%E8%A1%A8/3228081)
- [https://www.cnblogs.com/wincai/p/5893475.html](https://www.cnblogs.com/wincai/p/5893475.html)

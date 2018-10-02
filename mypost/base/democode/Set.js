/**
 * 模拟实现 Set
 *
 * @author lxfriday
 */
class Set {
  constructor(arrayLikeArg) {
    this.items = {};
    if (arrayLikeArg) {
      arrayLikeArg.forEach(v => this.items[v] = v);
    }
  }
  // 检查是否存在
  has(key) {
    return this.items.hasOwnProperty(key);
  }
  // 新增
  add(key) {
    if (!this.has(key)) {
      this.items[key] = key;
    }
  }
  // 删除
  remove(key) {
    if (this.has(key)) {
      delete this.items[key];
      return true;
    }
    return false;
  }

  // 求并集
  union(otherSet) {
    const unionSet = new Set();
    this.items.values.forEach(v => unionSet.add(v));
    otherSet.values.forEach(v => unionSet.add(v));
    return unionSet;
  }

  // 求交集
  intersection(otherSet) {
    const intersection = new Set();
    this.items.values.forEach((v) => {
      if (otherSet.has(v)) {
        intersection.add(v);
      }
    });
    return intersection;
  }

  // 求差集
  difference(otherSet) {
    const difference = new Set();
    this.items.values.forEach((v) => {
      if (!otherSet.has(v)) {
        difference.add(v);
      }
    });
    return difference;
  }

  // 求该集合是否是其他集合的子集
  subSet(otherSet) {
    if (this.size > otherSet.size) return false;
    return !this.items.some(v => !otherSet.has(v));
  }

  get size() {
    return Object.keys(this.items).length;
  }

  get values() {
    return Object.keys(this.items);
  }
}

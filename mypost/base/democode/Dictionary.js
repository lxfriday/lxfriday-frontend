/**
 * JS 实现字典
 *
 * @author lxfriday
 */

// JS中的 Object 对象是字典在 JS 中的实现
module.exports = class Dictionary {
  constructor() {
    this.items = {};
  }

  set(key, value) {
    this.items[key] = value;
  }

  get(key) {
    return this.items[key];
  }

  remove(key) {
    delete this.items[key];
  }

  get size() {
    return Object.keys(this.items).length;
  }

  get keys() {
    return Object.keys(this.items);
  }

  get values() {
    return Object.keys(this.items).reduce((r, c, i) => {
      r.push(this.items[c]);
      return r;
    }, []);
  }
};

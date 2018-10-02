/**
 * 散列
 *
 * @author lxfriday
 */

class HashTable {
  constructor() {
    this.table = [];
  }

  // 散列函数
  static loseloseHash(key) {
    let hash = 0;
    // a-z  97-122
    // A-Z  65-90
    for (let codePoint of key) {
      hash += codePoint.charCodeAt();
    }
    return hash % 37;
  }

  put(key, value) {
    const position = HashTable.loseloseHash(key);
    this.table[position] = value;
  }

  get(key) {
    return this.table[HashTable.loseloseHash(key)];
  }

  remove(key) {
    // 不能直接把这个位置上的值删除掉
    this.table[HashTable.loseloseHash(key)] = undefined;
  }
}
/**
 * 全排列
 *
 * @author lxfriday
 */

// 输入一个字符串,按字典序打印出该字符串中字符的所有排列。
// 例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。

function permutation(str) {
  var arr = [];
  var res = {};

  for (var i = 0; i < str.length; i++) {
    arr = permutate(arr, str[i]);
  }

  arr.forEach(function (v) {
    res[v] = v;
  });

  // 去重并按照字典序排列
  var resArr = Object.keys(res).sort((a, b) => {
    if (a < b) {
      return -1;
    }
    return 1;
  });

  return resArr;
}

function permutate(arr, val) {
  var res = [];

  arr.forEach(function (str) {
    for (var i = 0; i <= str.length; i++) {
      var newStr = `${str.substring(0, i)}${val}${str.substring(i)}`;
      res.push(newStr);
    }
  });
  if (!arr.length) res.push(val);

  return res;
}

const start = Date.now();
permutation('abcdefghi');
console.log('time used: ' + (Date.now() - start) + ' ms');



/**
 * 迷宫问题-广度优先寻找最短路径
 *
 * @author lxfriday
 */

// 参数是一个二维数组的迷宫
// 使用 normal 的算法，会走上面的长路径，使用广度优先并记录前溯结点寻找最短路径
var mazeArr = [
  [2, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
];

function mazeProblem(maze) {
  var cX = 1;
  var cY = 1;
  var road = [`${cX},${cY}`];
  var his = [`${cX},${cY}`];
  var pre = {};
  var current = '';
  var next = '';

  while(his.length) {
    var top = his.pop();

    cX = +top.split(',')[0];
    cY = +top.split(',')[1];

    if (maze[cX][cY + 1] === 0 && !road.includes(`${cX},${cY + 1}`)) {
      // right
      current = `${cX},${cY}`;
      next = `${cX},${cY + 1}`;
      pre[next] = current;
      road.push(next);
      his.push(next);
    }
    if (maze[cX + 1][cY] === 0 && !road.includes(`${cX + 1},${cY}`)) {
      // down
      current = `${cX},${cY}`;
      next = `${cX + 1},${cY}`;
      pre[next] = current;
      road.push(next);
      his.push(next);
    }
    if (maze[cX][cY - 1] === 0 && !road.includes(`${cX},${cY - 1}`)) {
      // left
      current = `${cX},${cY}`;
      next = `${cX},${cY - 1}`;
      pre[next] = current;
      road.push(next);
      his.push(next);
    }
    if (maze[cX - 1][cY] === 0 && !road.includes(`${cX - 1},${cY}`)) {
      // up
      current = `${cX},${cY}`;
      next = `${cX - 1},${cY}`;
      pre[next] = current;
      road.push(next);
      his.push(next);
    }
  }

  return {
    pre,
    road,
  };
}

function minimumLength(pre, from, end) {
  var res = end;
  var target = end;
  while (pre[target]) {
    res = pre[target] + ' -> ' + res;
    target = pre[target];
  }
  return res;
}

var predecessors = mazeProblem(mazeArr).pre;

console.log(minimumLength(predecessors, '1,1', '8,10'));
// 1,1 -> 1,2 -> 1,3 -> 2,3 -> 3,3 -> 4,3 -> 5,3 -> 6,3 -> 6,4 -> 6,5 -> 6,6 -> 6,7 -> 6,8 -> 6,9 -> 7,9 -> 8,9 -> 8,10
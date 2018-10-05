/**
 * 迷宫问题-栈
 *
 * @author lxfriday
 */

// 参数是一个二维数组的迷宫
var mazeArr = [
  [2, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
];

var start = [1, 1];
var eX = 8;
var eY = 10;
var cX = 1;
var cY = 1;
var pX = 1;
var pY = 1;

function mazeProblem(maze) {
  var his = [[cX, cY]];
  maze[cX][cY] = 6;

  while(!(cX === eX && cY === eY)) {

    if (maze[cX][cY + 1] === 0) {
      // right
      cY++;
      his.push([cX, cY]);
    } else if (maze[cX + 1][cY] === 0) {
      // down
      cX++;
      his.push([cX, cY]);
    } else if (maze[cX][cY - 1] === 0) {
      // left
      cY--;
      his.push([cX, cY]);
    } else if (maze[cX - 1][cY] === 0) {
      // up
      cX--;
      his.push([cX, cY]);
    } else {
      his.pop();
      maze[cX][cY] = 2;
      var topPos = his[his.length - 1];
      cX = topPos[0];
      cY = topPos[1];
    }
    maze[cX][cY] = 6;
  }

  return his;
}

mazeProblem(mazeArr);
console.log(mazeArr);

/**
 * 图
 *
 * @author lxfriday
 */
const Dictionary = require('./Dictionary');

class Graph {
  constructor() {
    this.vertices = [];
    this.adjList = new Dictionary();
  }
  // 添加顶点
  addVertex(v) {
    this.vertices.push(v);
    this.adjList.set(v, []);
  }
  // 添加线
  addEdge(v, w) {
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
  }

  // -----------------------------------------------------------------
  // bfs 广度优先遍历
  bfs(v, cb) {
    const read = [];
    const adjList = this.adjList;
    const distances = []; // 距离
    const predecessors = []; // 前溯点
    const pending = [v || this.vertices[0]]; // 起始

    function readVertices(vertices) {
      vertices.forEach(key => {
        read.push(key);
        pending.shift();
        distances[key] = distances[key] || 0;
        predecessors[key] = predecessors[key] || null;
        adjList.get(key).forEach(v => {
          if (!pending.includes(v) && !read.includes(v)) {
            pending.push(v);
            distances[v] = distances[key] + 1;
            predecessors[v] = key;
          }
        });
        if (cb) cb(key);
        if (pending.length) readVertices(pending);
      });
    }

    readVertices(pending);
    return {
      distances,
      predecessors,
    };
  }
  // -----------------------------------------------------------------

  // 一个点到其他点的路径
  distance(fromVertex) {
    const vertices = this.vertices;
    const { distances, predecessors } = this.bfs(fromVertex);
    vertices.forEach(toVertex => {
      if (!!distances[toVertex]) {
        let preVertex = predecessors[toVertex];
        let slug = '';
        while (fromVertex !== preVertex) {
          slug = `${preVertex} - ${slug}`;
          preVertex = predecessors[preVertex];
        }
        slug = `${fromVertex} - ${slug}${toVertex}`;
        console.log(slug);
      }
    });
  }

  // depth first search
  dfs(cb) {
    const that = this;
    let readTimer = 0;
    const read = [];
    const readTimes = [];
    const finishedTimes = [];
    const predecessors = [];
    const adjList = that.adjList;
    function readVertices(vertices, predecessor) {
      vertices.forEach(key => {
        readTimer++;
        // key 的所有相连节点都遍历完了
        if (adjList.get(key).every(v => read.includes(v)) && !finishedTimes[key]) {
          finishedTimes[key] = readTimer;
        }
        if (read.includes(key)) return false;
        readTimes[key] = readTimer;
        read.push(key);
        if (cb) cb(key);
        predecessors[key] = predecessors[key] || predecessor || null;
        // 一直要遍历完才终止
        if (read.length !== that.vertices.length) {
          readVertices(adjList.get(key), key);
        }
      });
    }
    readVertices(['A']);
    // readVertices(['I']);
    // readVertices(adjList.keys);
    return {
      readTimes,
      finishedTimes,
      predecessors,
    };
  }

  toString() {
    return this.vertices.reduce((r, v, i) => {
      return this.adjList.get(v).reduce((rr, vv, ii) => {
        return rr + `${vv} `;
      }, `${r}\n${v} => `);
    }, '');
  }
}

const graph = new Graph();
['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach(c => graph.addVertex(c));
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

// console.log(graph.distance(graph.vertices[0]));
// distances: [A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2 ,I：3]
// predecessors: [A: null, B: "A", C: "A", D: "A", E: "B", F: " B", G: " C", H: "D", I: "E"]

graph.dfs(console.log); // A B E I F C D G H
console.log(graph.dfs());

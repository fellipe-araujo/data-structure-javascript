const Dictionary = require('./dictionary')
const Queue = require('./queue')

function Graph() {
  var vertices = [];
  var adjList = new Dictionary();

  // Adiciona um novo vértice
  this.addVertex = function (v) {
    vertices.push(v);
    adjList.set(v, []);
  };

  // Adiciona uma nova aresta
  this.addEdge = function (v, w) {
    adjList.get(v).push(w);
    adjList.get(w).push(v);
  };

  // Lista de Adjacências
  this.adjacencyList = function () {
    var s = '';

    for (var i = 0; i < vertices.length; i++) {
      s += vertices[i] + ' -> ';

      var neighbors = adjList.get(vertices[i]);

      for (var j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + ' ';
      }
      s += '\n';
    }
    return s;
  };

  var initializeColor = function () {
    var color = [];

    for (var i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white';
    }
    return color;
  };

  this.bfs = function (v, callback) {
    var color = initializeColor();
    var queue = new Queue();

    queue.enqueue(v);

    while (!queue.isEmpty()) {
      var u = queue.dequeue();
      var neighbors = adjList.get(u);

      color[u] = 'blue';

      for (var i = 0; i < neighbors.length; i++) {
        var w = neighbors[i];

        if (color[w] === 'white') {
          color[w] = 'blue';
          queue.enqueue(w);
        }
      }
      callback(u);
    }
  };
}

function printNode(value) {
  console.log('Visited vertex: ' + value);
}

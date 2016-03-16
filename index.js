// пример многоугольников
/*var examples = {
  first: [{
    x: 60,
    y: 60
  }, {
    x: 180,
    y: 0
  }, {
    x: 300,
    y: 60
  }, {
    x: 300,
    y: 300
  }, {
    x: 240,
    y: 180
  }, {
    x: 210,
    y: 180
  }, {
    x: 180,
    y: 240
  }, {
    x: 150,
    y: 180
  }, {
    x: 120,
    y: 180
  }, {
    x: 60,
    y: 300
  }, ],
  second: [{
    x: 30,
    y: 240
  }, {
    x: 330,
    y: 240
  }, {
    x: 330,
    y: 210
  }, {
    x: 270,
    y: 90
  }, {
    x: 210,
    y: 270
  }, {
    x: 210,
    y: 90
  }, {
    x: 180,
    y: 60
  }, {
    x: 150,
    y: 90
  }, {
    x: 150,
    y: 270
  }, {
    x: 90,
    y: 90
  }, {
    x: 30,
    y: 210
  }]

};*/

var examples = {//трикутники
  first: [{x:20,y:20},{x:20,y:90},{x:60,y:50}],
  second:[{x:100,y:20},{x:100,y:100},{x:30,y:50}]
}

/*var examples = {//чотирикутники
  first: [{x:20,y:20},{x:20,y:100},{x:70,y:70},{x:70,y:40}],
  second:[{x:100,y:20},{x:100,y:100},{x:30,y:70} ,{x:30,y:30}]
}*/

function drawPath(data, container, color) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  var str = 'M' + data[0].x + ',' + data[0].y + ' ';
  drawDots(data[0].x, data[0].y, container);
  str += data.slice(1).map(function(point) {
    drawDots(point.x, point.y, container);
    return 'L' + point.x + ',' + point.y;
  }).join(' ');
  str += 'L' + data[0].x + ',' + data[0].y + ' ';
  path.setAttribute('d', str);
  path.style.fill = color;
  container.appendChild(path);
};

function drawDots(x, y, container) {
  var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttributeNS(null, "x", x);
  text.setAttributeNS(null, "y", y);
  text.appendChild(document.createTextNode(x + ';' + y));
  container.appendChild(text);
};


drawPath(examples.first, document.querySelector('svg.base'), 'navy');
drawPath(examples.second, document.querySelector('svg.base'), 'yellow');

intersects(examples.first, examples.second);
/*intersects(examples.first, examples.second).forEach(function(p) {
  drawPath(p, document.querySelector('svg.intersections'), 'red');
})*/
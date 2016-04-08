// examples
/*var examples = {//second in oth direction
  first:  [{ x: 60, y: 60  }, { x: 180, y: 0   }, { x: 300, y: 60  }, { x: 300, y: 300 }, { x: 240, y: 180 }, { x: 210, y: 180 }, { x: 180, y: 240 }, { x: 150, y: 180 }, { x: 120, y: 180 }, { x: 60, y: 300 }, ],
  second: [{ x: 30, y: 240 }, { x: 330, y: 240 }, { x: 330, y: 210 }, { x: 270, y: 90  }, { x: 210, y: 270 }, { x: 210, y: 90 },  { x: 180, y: 60  }, { x: 150, y: 90  }, { x: 150, y: 270 }, { x: 90, y: 90  }, {x: 30, y: 210 }]

};*/


/*var examples = {//second in norm direction
  first:  [{ x: 60, y: 60  }, { x: 180, y: 0   }, { x: 300, y: 60  }, { x: 300, y: 300 }, { x: 240, y: 180 }, { x: 210, y: 180 }, { x: 180, y: 240 }, { x: 150, y: 180 }, { x: 120, y: 180 }, { x: 60, y: 300 }, ],
  second: [{x: 30, y: 210 }, { x: 90, y: 90  }, { x: 150, y: 200 }, { x: 150, y: 90  }, { x: 180, y: 60  }, { x: 210, y: 90 }, { x: 210, y: 200 }, { x: 270, y: 90  }, { x: 330, y: 210 }, { x: 330, y: 240 },{ x: 30, y: 240 } ]

};*/
var examples = {//triangles
  first: [{x:20,y:20},{x:20,y:90},{x:60,y:50}],
  second:[{x:100,y:20},{x:100,y:100},{x:30,y:50}]
}

/*var examples = {//quadrangle
  first: [{x:20,y:20},{x:20,y:100},{x:70,y:70},{x:70,y:40}],
  second:[{x:100,y:20},{x:100,y:100},{x:30,y:70} ,{x:30,y:30}]
}*/
/*var examples = {//f1 in f2
  first: [{x:10,y:50},{x:50,y:10},{x:100,y:50},{x:50,y:100}],
  second:[{x:15,y:55},{x:55,y:15},{x:80,y:40} ,{x:40,y:80}]
}*/
function drawPath(data, container, color) {

  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  var str = 'M' + data[0].x + ',' + data[0].y + ' ';
  drawDots(data[0].x, data[0].y, 0, container, color);
  str += data.slice(1).map(function(point) {
    drawDots(point.x, point.y, container, color);
    return 'L' + point.x + ',' + point.y;
  }).join(' ');
  str += 'L' + data[0].x + ',' + data[0].y + ' ';
  path.setAttribute('d', str);
  path.style.fill = color;
  container.appendChild(path);
};

function drawDots(x, y, container, color) {
  var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttributeNS(null, "x", x);
  text.setAttributeNS(null, "y", y);
  text.setAttributeNS(null, "style", 'font-size: 8px;');
  text.appendChild(document.createTextNode(x + ';' + y);
  container.appendChild(text);
};

function drawCircl(xy, container) {
  var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  c.setAttributeNS(null, "cx", xy.x);
  c.setAttributeNS(null, "cy", xy.y);
  c.setAttributeNS(null, "r", 3);
  c.style.fill = 'red';
  container.appendChild(c);
};

drawPath(examples.first, document.querySelector('svg.base'), 'navy');
drawPath(examples.second, document.querySelector('svg.base'), 'yellow');

/*intersects(examples.first, examples.second);*/
intersects(examples.first, examples.second).forEach(function(p) {
  drawPath(p, document.querySelector('svg.intersections'), 'red');
})
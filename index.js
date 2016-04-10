var examples;
document.getElementById('coord').addEventListener("click", dotsVisible);
document.getElementById('type').addEventListener("change", examplesTemplates);
examplesTemplates()

function examplesTemplates() {
    t=document.getElementById('type').value;
    examples=(t == 1) ? {first:[{x:20,y:20},{x:120,y:400},{x:300,y:155}],second:[{x:380,y:20},{x:380,y:380},{x:130,y:150}]}:
        (t == 2) ? {first:[{x:20,y:20},{x:120,y:300},{x:170,y:170},{x:200,y:140}],second:[{x:300,y:120},{x:300,y:300},{x:130,y:170},{x:70,y:100}]}:
        (t == 3) ? {first:[{x:10,y:50},{x:50,y:10},{x:100,y:50},{x:50,y:100}],second:[{x:15,y:55},{x:55,y:15},{x:80,y:40},{x:40,y:80}]}:
        (t == 4) ? {first:[{x:60,y:60},{x:180,y:0},{x:300,y:60},{x:300,y:300},{x:240,y:180},{x:210,y:180},{x:180,y:240},{x:150,y:180},{x:120,y:180},{x:60,y:300},],second:[{x:30,y:240},{x:330,y:240},{x:330,y:210},{x:270,y:90},{x:210,y:270},{x:210,y:90},{x:180,y:60},{x:150,y:90},{x:150,y:270},{x:90,y:90},{x:30,y:210}]}:
        false;
    paint();    
}

function paint() {
    clearPath();
    drawPath(examples.first, document.querySelector('svg.base'), 'navy');
    drawPath(examples.second, document.querySelector('svg.base'), 'yellow');


    intersects(examples.first, examples.second).forEach(function(p) {
        drawPath(p, document.querySelector('svg.intersections'), 'red');
    })
}

function drawPath(data, container, color) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var str = 'M' + data[0].x + ',' + data[0].y + ' ';
    drawDots(data[0].x, data[0].y, container, color);
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
    text.appendChild(document.createTextNode(r(x) + ';' + r(y)));
    container.appendChild(text);

    function r(a) {
        return a >> 0
    }
};

function drawCircl(xy, container) {
    var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttributeNS(null, "cx", xy.x);
    c.setAttributeNS(null, "cy", xy.y);
    c.setAttributeNS(null, "r", 3);
    c.style.fill = 'red';
    container.appendChild(c);
};

function dotsVisible() {
    var attr = document.getElementById('coord').checked ? '' : 'none';
    var col = document.getElementsByTagName('text');
    for (var i = col.length - 1; i >= 0; i--) {
        col[i].style.display = attr;
    };
}

function clearPath() {
    document.querySelector('svg.intersections').innerHTML = ''
    document.querySelector('svg.base').innerHTML = ''
}



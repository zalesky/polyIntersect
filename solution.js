function intersects(fig1, fig2) {
	// Замените код функции на полноценную реализацию

	function inPolygon(x, y, polygon) {
		var npol = polygon.length,
			j = npol - 1,
			c = false;
		for (i = 0; i < npol; i++) {
			if ((((polygon[i].y <= y) && (y < polygon[j].y)) || ((polygon[j].y <= y) && (y < polygon[i].y))) &&
				(x > (polygon[j].x - polygon[i].x) * (y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x)) {
				c = !c
			}
			j = i;
		}
		return c;
	}


	function changePropFigVerticesInOthFig(fig1, fig2) { //is First Fig dotes in second Fig? then change options Fig[i].inPoly false:true
		for (var i = 0; i < fig1.length; i++) {
			fig1[i].inPoly = inPolygon(fig1[i].x, fig1[i].y, fig2);
		}
	}
	changePropFigVerticesInOthFig(fig1, fig2);
	changePropFigVerticesInOthFig(fig2, fig1);


	/*	for (var i = 0; i < examples.first.length; i++) {
			examples.first[i].inPoly = notIsInPolygon(examples.first[i].x, examples.first[i].y, examples.second);
		}
		for (var i = 0; i < examples.second.length; i++) {
			examples.second[i].inPoly = notIsInPolygon(examples.second[i].x, examples.second[i].y, examples.first);
		}*/
	console.dir(examples)


	return [
		[{
			x: 60,
			y: 240
		}, {
			x: 90,
			y: 240
		}, {
			x: 120,
			y: 180
		}, {
			x: 90,
			y: 90
		}, {
			x: 60,
			y: 150
		}, ],
		[{
			x: 270,
			y: 240
		}, {
			x: 300,
			y: 240
		}, {
			x: 300,
			y: 150
		}, {
			x: 270,
			y: 90
		}, {
			x: 240,
			y: 180
		}, ],
		[{
			x: 150,
			y: 180
		}, {
			x: 180,
			y: 240
		}, {
			x: 210,
			y: 180
		}, {
			x: 210,
			y: 90
		}, {
			x: 180,
			y: 60
		}, {
			x: 150,
			y: 90
		}]
	];
}
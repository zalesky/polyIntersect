function intersects(fig1, fig2) {
    // return arr with poly's

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
    };



    function changePropFigVerticesInOthFig(fig1, fig2) { //is First Fig dotes in second Fig? then change options Fig[i].inPoly false:true
        for (var i = 0; i < fig1.length; i++) {
            fig1[i].inPoly = inPolygon(fig1[i].x, fig1[i].y, fig2);
        }
    };


    function getCoordinatesOfCrossing(a1, a2, b1, b2) {

        var denom, a, b, num1, num2, x, y;
        denom = ((b2.y - b1.y) * (a2.x - a1.x)) - ((b2.x - b1.x) * (a2.y - a1.y));
        if (denom == 0) return false;
        a = a1.y - b1.y;
        b = a1.x - b1.x;
        num1 = ((b2.x - b1.x) * a) - ((b2.y - b1.y) * b);
        num2 = ((a2.x - a1.x) * a) - ((a2.y - a1.y) * b);
        a = num1 / denom;
        b = num2 / denom;

        x = a1.x + (a * (a2.x - a1.x));
        y = a1.y + (a * (a2.y - a1.y));

        if ((a > 0 && a < 1) && (b > 0 && b < 1)) {
            return {
                x: x,
                y: y
            };
        } else {
            return false;
        }
    }
    function createArrWithCrossCoord(fig1,fig2){
        var arr=[],
            xy;
        poly1=fig1.slice();
        poly1.push(fig1[0]);
        poly2=fig2.slice();
        poly2.push(fig2[0]);

        for (var i = fig1.length - 1; i > 0; i-=1) {
            for (var j = fig2.length - 1; j > 0; j -= 1) {
                xy=getCoordinatesOfCrossing(fig1[i],fig1[i-1],fig2[j],fig2[j-1]);
                if (xy)arr.push(xy);    
            };
        };
        console.dir(arr);

    }



    changePropFigVerticesInOthFig(fig1, fig2);
    changePropFigVerticesInOthFig(fig2, fig1);
    createArrWithCrossCoord(fig1,fig2);


    /*	for (var i = 0; i < examples.first.length; i++) {
     examples.first[i].inPoly = notIsInPolygon(examples.first[i].x, examples.first[i].y, examples.second);
     }
     for (var i = 0; i < examples.second.length; i++) {
     examples.second[i].inPoly = notIsInPolygon(examples.second[i].x, examples.second[i].y, examples.first);
     }*/
    


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
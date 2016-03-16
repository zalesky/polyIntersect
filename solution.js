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

function getCoordinatesOfCrossing (a1,a2,b1,b2) { //input {x:num,y:num} {x:num,y:num}; return false if not cross else {x:num,y:num}
    var x=((a1.x*a2.y-a2.x*a1.y)*( b2.x-b1.x)-(b1.x*b2.y- b2.x*b1.y)*(a2.x-a1.x))/((a1.y-a2.y)*( b2.x-b1.x)-(b1.y-b2.y)*(a2.x-a1.x)),
        y=((b1.y-b2.y)*x-(b1.x*b2.y- b2.x*b1.y))/( b2.x-b1.x);
        return x+':'+y;


(((a1.x<=x)and(a2.x>=x)and(b1.x<=x)and(b2.x >=x))or((a1.y<=y)and(a2.y>=y)and(b1.y<=y) and(b2.y>=y))) ? true:false;//across:not across

k1=(a2.x-a1.x)/(a2.y-a1.y);
k2=(b2.x-b1.x)/(b2.y-b1.y);
k1==k2?true:false; //paralel:not paralel

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
        },],
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
        },],
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

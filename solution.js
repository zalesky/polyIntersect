function intersects(fig1, fig2) { // return arr with poly's
    'use strict'

    var poly1 = fig1.slice();
    poly1.push(poly1[0]);
    var poly2 = fig2.slice();
    poly2.push(poly2[0]);

    function isHoverHand(poly) {
        if (poly[1].x === poly[0].x) return true;
        return (poly[1].x - poly[0].x) / (poly[1].y - poly[0].y) < (poly[poly.length - 1].x - poly[poly.length - 2].x) / (poly[poly.length - 1].y - poly[poly.length - 2].y);
    };
    //normilize poly's to HoverHand direction
    if (!isHoverHand(poly1)) poly1.reverse();
    if (!isHoverHand(poly2)) poly2.reverse();




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



    function changePropFigVerticesInOthFig(poly1, poly2) { //is First Fig dotes in second Fig? then change options Fig[i].inPoly false:true
        for (var i = 0; i < poly1.length; i++) {
            poly1[i].inPoly = inPolygon(poly1[i].x, poly1[i].y, poly2);
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

        if ((a >= 0 && a < 1) && (b >= 0 && b < 1)) {
            return {
                x: x,
                y: y,
            };
        } else {
            return false;
        }
    }

    function createArrWithCrossCoord(poly1, poly2) {
        var arr = [],
            xy;
        for (var i = 0; i < poly1.length - 1; i += 1) {
            for (var j = 0; j < poly2.length - 1; j += 1) {
                xy = getCoordinatesOfCrossing(poly1[i], poly1[i + 1], poly2[j], poly2[j + 1]);
                if (xy) {
                    alert(j)
                    xy.dotPoly1 = i;
                    xy.dotPoly2 = j;
                    poly1[i].cross = [];
                    poly1[i].cross.push(xy);
                    poly2[j].cross = [];
                    poly2[j].cross.push(xy);
                    arr.push(xy);
                    /*out.innerHTML+=xy.x+':'+xy.y+';';*/
                    drawCircl(xy, document.querySelector('svg.base'))
                    console.log(xy)
                }
            };
        };
        objWithResults = {};
        objWithCrossDotsWhatWeSaw = {};

        function addFinalObj(currentDot, dotPoly1, dotPoly2) {
            if (objWithResults[dotPoly1 + 'x' + dotPoly2]) return;
            //there is no such Polynom of A^B, so add
            objWithResults[dotPoly1 + 'x' + dotPoly2] = [currentDot];
            objWithCrossDotsWhatWeSaw[dotPoly1 + 'x' + dotPoly2] = true;
            //ми на j
            var k = poly2[dotPoly2] - poly2[dotPoly2 + 1], //треба знати куди рухатись(k) і з якої точки(numOfVertex)
                numOfVertex = poly2[dotPoly2].inPoly ? dotPoly2 : dotPoly2 + 1; //num це та яка всередині
            objWithResults[dotPoly1 + 'x' + dotPoly2].push(poly2[numOfVertex]); //додали вершину

            while (poly2[numOfVertex + k].inPoly) {
                k += k;
                objWithResults[dotPoly1 + 'x' + dotPoly2].push(poly2[numOfVertex + k]);
                };
            //#todo знайти точку пересічення з fig1, мабуть починаючи з dotPoly1 і проти годинникової, щоб зійтись з точкою входу.
            // точки пересічення які є в масиві з пересіченними objWithCrossDotsWhatWeSaw виключаєм
            //може пересікатись і не лежати всередині
            //те з якого боку лежить від прямої, залежить від номерів вершини
            };
       
        return arr;
    };
    function distanceBetween2Dots(a,b){
        var dist=Math.sqrt(Math.pow((b.x-a.x),2)+Math.pow((b.y-a.y),2));
    };

    function figInOthFig(fig) {
        return fig.every(isTrue) && fig

        function isTrue(n) {
            return n.inPoly
        }
    };

    changePropFigVerticesInOthFig(poly1, poly2);
    changePropFigVerticesInOthFig(poly2, poly1);
    var dotsOfcross = createArrWithCrossCoord(poly1, poly2);
    if (dotsOfcross.length == 0) {
        return figInOthFig(poly1) || figInOthFig(poly2) || [];
    };

    function createArrWithResults() {
        var objWithResults = {},
            nameOfCross;

        function walkThroghDots() {

        }
    };



    for (var i = 0; i < dotsOfcross.length; i++) {
        nameOfCross = dotsOfcross[i].dotPoly1 + 'x' + dotsOfcross[i].dotPoly2;
        if (!objWithResults[nameOfCross]) {
            objWithResults[nameOfCross] = [];
            objWithResults[nameOfCross].push({
                x: dotsOfcross[i].x,
                y: dotsOfcross[i].y
            });

            /*if (poly2[dotsOfcross.dotPoly2].inPoly) {} else{};*/
        } else {

        };
    };


    /*console.log(dotsOfcross);*/
    return null

    var arr = [];
    for (var i = 0, j = 0; i < dotsOfcross.length; i += 1) {
        arr[j].push({
            x: dotsOfcross[i].x,
            y: dotsOfcross[i].x
        });

    };


    /*return [
        [{x: 60, y: 240}, {x: 90, y: 240}, {x: 120,  y: 180},  { x: 90,  y: 90 }, {x: 60,  y: 150 }, ],
        [{x: 270,y: 240}, {x: 300,y: 240}, {x: 300,  y: 150 }, { x: 270, y: 90 }, {x: 240, y: 180 }, ],
        [{x: 150,y: 180}, {x: 180,y: 240 },{x: 210,  y: 180 }, { x: 210, y: 90 }, {x: 180, y: 60  }, {  x: 150,  y: 90 }]
    ];*/
}
function intersects(fig1, fig2) { // return arr with poly's
    'use strict'

    var tochki = [];
    for (var x in fig1) {
        tochki.push({
            x: fig1[x].x,
            y: fig1[x].y
        })
    };
    for (var x in fig2) {
        tochki.push({
            x: fig2[x].x,
            y: fig2[x].y
        })
    };


    vidrizok = [{
        x: ,
        y:
    }, {
        x: ,
        y:
    }]

http://rain.ifmo.ru/cat/data/theory/math/triangulation-2008/article.pdf
    /*return [
        [{x: 60, y: 240}, {x: 90, y: 240}, {x: 120,  y: 180},  { x: 90,  y: 90 }, {x: 60,  y: 150 }, ],
        [{x: 270,y: 240}, {x: 300,y: 240}, {x: 300,  y: 150 }, { x: 270, y: 90 }, {x: 240, y: 180 }, ],
        [{x: 150,y: 180}, {x: 180,y: 240 },{x: 210,  y: 180 }, { x: 210, y: 90 }, {x: 180, y: 60  }, {  x: 150,  y: 90 }]
    ];*/
}

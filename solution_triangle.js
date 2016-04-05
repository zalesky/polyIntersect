function intersects_tr(fig1, fig2) { // return arr with poly's
    'use strict'

    var dots = [],
        sections = [],
        triangulation = [];
    for (var x in fig1) {
        dots.push({
            x: fig1[x].x,
            y: fig1[x].y
        })
    };
    for (var x in fig2) {
        dots.push({
            x: fig2[x].x,
            y: fig2[x].y
        })
    };
    //dotsOfCrossingF1F2

    for (var i = dots.length - 1; i >= 0; i--) {
        for (var j = dots.length - 1; j >= 0; j--) {
            if (i == j) continue;
            sections.push({
                start: {
                    x: dots[i].x,
                    y: dots[i].y
                },
                end: {
                    x: dots[j].x,
                    y: dots[j].y
                },
                length: distanceBetween2Dots(dots[i].x, dots[i].y, dots[j].x, dots[j].y)
            });
        };
    };
    sections.sort(sortByLength);
    getStructuredLines(fig1, fig2);
    //doNotCrossLines(fig1, fig2);

    function pushStructuredLines() {

    }

    function sortByLength(a, b) {
        return a.length - b.length;
    }
    //   console.dir(sections);
    /*sections = [{x: ,y:}, {x: ,y:}]*/
    function distanceBetween2Dots(aX, aY, bX, bY) {
        return Math.sqrt(Math.pow((bX - aX), 2) + Math.pow((bY - aY), 2));
    };

    function getPairOfCrossLines(line1, line2) { //line1[0]=a1, line1[1]=a2, line2[0]=b1, line2[1]=b2\\\повернемо масив з лініями такої ж структури 
        line1 = normilizeLine(line1[0], line1[1]);
        line2 = normilizeLine(line2[0], line2[1]);
        if (line1[0].x == line2[0].x && line1[0].y == line2[0].y && line1[1].x == line2[1].x && line1[1].y == line2[1].y) {
            return false; //[line1];
        } //line1==line2
         if (line1[0].x == line2[0].x && line1[0].y == line2[0].y || line1[1].x == line2[1].x && line1[1].y == line2[1].y) {
                    return false; //[line1];
                } //line1&line2 has one 
        var denom, a, b, num1, num2, x, y;
        denom = ((line2[1].y - line2[0].y) * (line1[1].x - line1[0].x)) - ((line2[1].x - line2[0].x) * (line1[1].y - line1[0].y));
        if (denom == 0) {
            if (isBoxesIntersected(line1, line2)) { //на одній прямій =>на вихід 2, 3 або 4 відрізки. 
                return getPartsOfLinesThatBoxesIntersected(line1, line2);
            }
            return [line1]; //значить паралельні
        }
        a = line1[0].y - line2[0].y;
        b = line1[0].x - line2[0].x;
        num1 = ((line2[1].x - line2[0].x) * a) - ((line2[1].y - line2[0].y) * b);
        num2 = ((line1[1].x - line1[0].x) * a) - ((line1[1].y - line1[0].y) * b);
        a = num1 / denom;
        b = num2 / denom;

        x = line1[0].x + (a * (line1[1].x - line1[0].x));
        y = line1[0].y + (a * (line1[1].y - line1[0].y));
        var xy = {
            x: x,
            y: y
        };
        //a==0 &&b==0 when some line has vertice in oth
        if (a == 0) return [line1, [line2[0], xy],
            [xy, line2[1]]
        ];
        if (b == 0) return [line2, [line1[0], xy],
            [xy, line1[1]]
        ];

        if ((a > 0 && a < 1) && (b > 0 && b < 1)) { //so there are 4 lines
            return [
                [line1[0], xy],
                [xy, line1[1]],
                [line2[0], xy],
                [xy, line2[1]]
            ]
        } else {
            return [line1]; //there are no lines that are crossing 
        };

        function normilizeLine(start, end) { //x1<x2,if x1=x2=>y1<y2
            if (start.x < end.x) return [start, end];
            if (start.x > end.x) return [end, start];
            if (start.y < end.y) return [start, end];
            return [end, start]

        };

        function isBoxesIntersected(line1, line2) {
            return !(line2[0].x >= line1[1].x || line2[1].x <= line1[0].x || line2[1].y <= line1[0].y || line2[0].y >= line1[1].y);
            //return (Math.abs(line1[0].x - line2[0].x) * 2 < (line1[1].x - line1[0].x + line2[1].x - line2[0].x)) &&
            //   (Math.abs(line1[0].y - line2[0].y) * 2 < (line1[1].y - line1[0].y + line2[1].y - line2[0].y));
        };

        function getLinesIfOneVerticleAtOtherLine(line1, line2) {
            return [line1, [line2[0], xy],
                [xy, line2[1]]
            ];
        }

        function getPartsOfLinesThatBoxesIntersected(line1, line2) { //group the dots in obj than return smaller lines that they create
            var obj = {},
                previous,
                arrWithLines = [];
            line1.concat(line2).sort(sortArr).forEach(function(xy) {
                obj[xy.x + 'x' + xy.y] = xy;
            });
            for (var dot in obj) {
                if (previous) {
                    arrWithLines.push([previous, obj[dot]]);
                }
                previous = obj[dot];
            };

            return arrWithLines;

            function sortArr(a, b) {
                return a.x - b.x
            };
        };
    };

    //smash the poly's to have not crossing lines
    function getStructuredLines(fig1, fig2) {//#todo  якийсь кривий список получається, треба вдосконалити  getPairOfCrossLines і пуш в арей 
        var arr = [];
        /*= [{
            start: fig1[0],
            end: fig1[1]
        }];*/

        fig1.push(fig1[0]);
        fig2.push(fig2[0]);
        pushFigInArrSimple(fig1);

        pushInArr(fig2);


        function pushInArr(fig) {
            var figCount = fig.length,
                arrCount,
                xy,
                indikatorThatWePushedLine;
            while (--figCount) {
                arrCount = arr.length;
                indikatorThatWePushedLine = false;
                while (arrCount--) {
                    debugger;
                    xy = getPairOfCrossLines([fig[figCount], fig[figCount - 1]], [arr[arrCount].start, arr[arrCount].end]); //return array 1-4 length or false
                    if (!xy) continue; //line1==line2;
                    if (xy.length == 1 && !indikatorThatWePushedLine) { //parralel or not crossing
                        arr.push({
                            start: fig[figCount],
                            end: fig[figCount - 1]
                        });
                        indikatorThatWePushedLine = true;
                    } else if (xy.length > 1) { //3 одна з них вже є, 2 треба додати або одну додати і дві є. або вже взяти і просто закинути замінити з поточною лінією
                        //можна взяти останню, потім length-1 i forEach
                        arr[arrCount] = {
                            start: xy[0][0],
                            end: xy[0][1]
                        };
                        for (var i = 1; i < xy.length; i++) {
                            arr.push({
                                start: xy[i][0],
                                end: xy[i][1]
                            });
                        };

                    };


                };
            };

        };
        console.log(arr);

        function pushFigInArrSimple(fig) {
            var figCount = fig.length;
            while (--figCount) {
                arr.push({
                    start: fig[figCount],
                    end: fig[figCount - 1]
                })
            };

        };
    };


};
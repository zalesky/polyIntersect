//algorithm http://davis.wpi.edu/~matt/courses/clipping/
function intersect(fig1, fig2) { // return arr with poly's
    'use strict'

    function getCoordinatesOfCrossing(a1, a2, b1, b2) { //{x:y:},{x:y:},{x:y:},{x:y:} return {x:y:}||true||false
        var denom, a, b, num1, num2, x, y;
        denom = ((b2.y - b1.y) * (a2.x - a1.x)) - ((b2.x - b1.x) * (a2.y - a1.y));
        if (denom == 0) return true;
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
    };

    function inPolygon(dot, polygon) { //return true false
        var npol = polygon.length,
            j = npol - 1,
            c = false;
        for (var i = 0; i < npol; i++) {
            if ((((polygon[i].y <= dot.y) && (dot.y < polygon[j].y)) || ((polygon[j].y <= dot.y) && (dot.y < polygon[i].y))) &&
                (dot.x > (polygon[j].x - polygon[i].x) * (dot.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x)) {
                c = !c
            }
            j = i;
        }
        return c;
    };

    function figInOthFig(fig) {
        return fig.every(isTrue) && fig

        function isTrue(n) {
            return n.inPoly
        }
    };

    function Node(vec, delta, intersection) {
        this.vec = vec;
        this.delta = delta || 0;
        this.intersect = !!intersection;
    };

    Node.prototype = {
        vec: null,
        next: null,
        next: null,
        prev: null,
        nextPoly: null,
        neighbor: null,
        intersect: null,
        entry: null,
        visited: false,
        delta: 0,
        inPoly: true,

        nextNonIntersection: function() {
            var self = this;
            while (self && self.intersect) {
                self = self.next;
            }
            return self;
        },

        last: function() {
            var self = this;
            while (self.next && self.next !== this) {
                self = self.next;
            }
            return self;
        },

        createLoop: function() {
            var last = this.last();
            last.prev.next = this;
            this.prev = last.prev;
        },

        firstNodeOfInterest: function() {
            var self = this;

            if (self) {
                do {
                    self = self.next;
                } while (self !== this && (!self.intersect || self.intersect && self.visited));
            }

            return self;
        },

        insertBetween: function(first, last) {
            var a = first;
            while (a !== last && a.delta < this.delta) {
                a = a.next;
            }

            this.next = a;
            this.prev = a.prev;
            if (this.prev) {
                this.prev.next = this;
            }

            this.next.prev = this;
        }
    };
    Node.prototype.toString = function() {
        var str = '';
        var self = this;
        while (self.next && self.next !== this) {
            str += '(x:' + self.vec.x + '; y:' + self.vec.y + ') intersect:' + self.intersect + '\n';
            self = self.next;
        }
        return str;
    };

    function createLinkedList(vecs, vecs2) {
        var l = vecs.length;
        var ret, where;
        for (var i = 0; i < l; i++) {
            var current = vecs[i];
            if (!ret) {
                where = ret = new Node(current);
                where.inPoly = ret.inPoly = inPolygon(vecs[i], vecs2);
            } else {
                where.next = new Node(current);
                where.next.prev = where;
                where = where.next;
                where.inPoly = inPolygon(vecs[i], vecs2);
            }
        }
        return ret;
    };

    function distance(a, b) {
        return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2));
    };

    function clean(arr) {
        var cur = arr.length - 1;
        while (cur--) {
            var c = arr[cur];
            var p = arr[cur + 1];
            if (c.x === p.x && c.y === p.y) {
                arr.splice(cur, 1);
            }
        }
        return arr;
    };

    function identifyIntersections(subjectList, clipList) {
        var subject, clip;
        var auxs = subjectList.last();
        auxs.next = new Node(subjectList.vec, auxs);
        auxs.next.prev = auxs;

        var auxc = clipList.last();
        auxc.next = new Node(clipList.vec, auxc);
        auxc.next.prev = auxc;

        var found = false;
        for (subject = subjectList; subject.next; subject = subject.next) {
            if (!subject.intersect) {
                for (clip = clipList; clip.next; clip = clip.next) {
                    if (!clip.intersect) {

                        var a = subject.vec,
                            b = subject.next.nextNonIntersection().vec,
                            c = clip.vec,
                            d = clip.next.nextNonIntersection().vec;

                        var i = getCoordinatesOfCrossing(a, b, c, d);

                        if (i && i !== true) {
                            found = true;
                            var iSubject = new Node(i, distance(a, i) / distance(a, b), true);
                            var iClip = new Node(i, distance(c, i) / distance(c, d), true);
                            iSubject.neighbor = iClip;
                            iClip.neighbor = iSubject;
                            iSubject.insertBetween(subject, subject.next.nextNonIntersection());
                            iClip.insertBetween(clip, clip.next.nextNonIntersection());
                        }
                    }
                }
            }
        }
        return found;
    };

    function entryNotEntry(subjectList, clipList) {
        var entry = true;
        var subject;
        for (subject = subjectList; subject.next; subject = subject.next) {
            if (subject.intersect) {
                subject.entry = subject.neighbor.entry = entry;
                entry = !entry;
            }
        }
    };

    function collectClipResults(subjectList, clipList) {
        subjectList.createLoop();
        clipList.createLoop();

        var crt, results = [],
            result;
        while ((crt = subjectList.firstNodeOfInterest()) !== subjectList) {
            result = [];
            for (; !crt.visited; crt = crt.neighbor) {

                result.push(crt.vec);
                var forward = crt.entry
                while (true) {
                    crt.visited = true;

                    /* crt = crt.next.inPoly ? crt.next :
                        crt.prev.inPoly ? crt.prev :
                        forward ? crt.next : crt.prev;*/

                    crt = forward ? crt.next : crt.prev;

                    if (crt.intersect) {
                        crt.visited = true;
                        break;
                    } else {
                        result.push(crt.vec);
                    }
                }
            }
            results.push(clean(result));
        }
        return results;
    };

    function polygonBoolean(subjectPoly, clipPoly) {

        var subjectList = createLinkedList(subjectPoly, clipPoly),
            clipList = createLinkedList(clipPoly, subjectPoly),
            response;

        // Phase one.
        var isects = identifyIntersections(subjectList, clipList);

        if (isects) {
            // Phase two.
            entryNotEntry(subjectList, clipList);

            // Phase three. collect resulting polygons
            response = collectClipResults(subjectList, clipList);
        } else {
            // No intersections
            var inner = subjectList.inPoly;
            var outer = clipList.inPoly;

            if (inner) {
                return [subjectPoly]
            } else if (outer) {
                return [clipPoly]
            }
        }
        console.log(subjectList.toString())
        return response;
    };
    return polygonBoolean(fig1, fig2)
}
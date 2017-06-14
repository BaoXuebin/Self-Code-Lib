'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Created by baoxuebin on 2017/3/31.
 */
function buildCanvas() {
    var htmlCanvas = void 0,
        $canvas = void 0;

    $('div.canvas-container').each(function () {
        $(this).append('<canvas>your browser does not support the canvas tag!</canvas>');
        htmlCanvas = $(this).children('canvas')[0];
        $canvas = $(this).children('canvas');
        htmlCanvas.width = $(this).width();
        htmlCanvas.height = $(this).height();
        $canvas.css({
            backgroundColor: 'black'
        });
    });

    return [htmlCanvas, $canvas];
}

$(function () {
    var _buildCanvas = buildCanvas(),
        _buildCanvas2 = _slicedToArray(_buildCanvas, 2),
        canvas = _buildCanvas2[0],
        $canvas = _buildCanvas2[1];

    var context = canvas.getContext('2d');
    Constants.WALL_WIDTH = canvas.width;
    Constants.WALL_HEIGHT = canvas.height;

    var polygons = [];

    for (var i = 1; i <= 100; i++) {
        polygons.push(Rectangle.random(context));
    }

    $('button').click(function () {
        var cls = $(this).attr('class');
        if (cls === 'add-rectangle') {
            for (var _i = 1; _i <= 20; _i++) {
                polygons.push(Rectangle.random(context));
            }
        }

        if (cls === 'reduce-rectangle') {
            for (var _i2 = 1; _i2 <= 20; _i2++) {
                polygons.pop();
            }
        }
    });

    // 是否四叉树优化
    var isQuadTree = false;
    // 是否显示信息
    var isShowInfo = true;

    var globalTime = new Date().getTime();
    var maxFPS = 0;
    var minFPS = 1000;
    var fpsArray = [];
    var fpsNum = 0;
    var curfps = 0;

    var points = [new Point(0, 0), new Point(Constants.WALL_WIDTH, 0), new Point(Constants.WALL_WIDTH, Constants.WALL_HEIGHT), new Point(0, Constants.WALL_HEIGHT)];

    var quadTree = new QuadTree(2, polygons, points, context);
    quadTree.buildTree();

    update(function () {
        isQuadTree = $('input.isQuadTree').is(':checked');
        isShowInfo = $('input.isShowInfo').is(':checked');

        context.clearRect(0, 0, Constants.WALL_WIDTH, Constants.WALL_HEIGHT);
        context.lineWidth = 1;

        // 启用四叉树优化
        if (isQuadTree) {
            quadTree.refresh();
        } else {
            var collidedNum = void 0;
            // 正在碰撞的多边形集合
            var collidedPolygon = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = polygons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var polygon = _step.value;

                    collidedNum = 0;
                    if (!Utils.contain(collidedPolygon, polygon)) {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = polygons[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var p = _step2.value;

                                if (polygon != p && !Utils.contain(collidedPolygon, p)) {
                                    if (polygon.isCollided(p)) {
                                        collidedNum++;
                                        Utils.addObjToArray(collidedPolygon, polygon);
                                        Utils.addObjToArray(collidedPolygon, p);
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    } else {
                        collidedNum = 1;
                    }

                    if (collidedNum) {
                        polygon.setFillColor('pink');
                    } else {
                        polygon.clearFillColor();
                    }
                    polygon.paint();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        if (isShowInfo) {
            var fps = parseInt(1000 / (new Date().getTime() - globalTime));
            if (minFPS > fps) minFPS = fps;
            if (maxFPS < fps) maxFPS = fps;

            globalTime = new Date().getTime();
            context.fillStyle = 'white';
            if (fpsArray.length < 10) {
                fpsArray.push(fps);
            } else {
                fpsNum = 0;
                fpsArray.map(function (f) {
                    fpsNum += f;
                });
                curfps = parseInt(fpsNum / fpsArray.length);
                fpsArray.splice(0, fpsArray.length);
            }

            context.fillText(curfps.toString(), 20, 20);
            context.fillText('max: ' + maxFPS, 60, 20);
            context.fillText('min: ' + minFPS, 110, 20);
            context.fillText('' + polygons.length, Constants.WALL_WIDTH - 50, 20);
        }
    });
});

function update(f) {
    // f();
    setInterval(f, 33);
}
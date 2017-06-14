'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by baoxuebin on 2017/3/31.
 */
// 点
var Point = function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: 'setX',
        value: function setX(x) {
            this.x = x;
            return this;
        }
    }, {
        key: 'setY',
        value: function setY(y) {
            this.y = y;
            return this;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return '[' + this.x + ', ' + this.y + ']';
        }
    }]);

    return Point;
}();

// 多边形


var Polygon = function () {
    // 构造方法
    function Polygon(points, context, speed, direction) {
        _classCallCheck(this, Polygon);

        if (points) {
            this.points = points;
        } else {
            this.points = [];
        }
        this.pointNum = this.points.length;
        this.context = context;
        this.speed = speed;
        this.direction = direction;
        this.deltaX = this.speed * Math.cos(this.direction);
        this.deltaY = this.speed * Math.sin(this.direction);
        this.fillColor = null;
        this.borderColor = 'pink';
        this.lineWidth = 1;
    }

    // 初始化点集合


    _createClass(Polygon, [{
        key: 'initPoints',
        value: function initPoints(points) {
            this.points = points;
            return this;
        }

        // 添加点

    }, {
        key: 'addPoint',
        value: function addPoint(p) {
            this.points.push(p);
            return this;
        }

        // 定义填充颜色

    }, {
        key: 'setFillColor',
        value: function setFillColor(fillColor) {
            this.fillColor = fillColor;
            return this;
        }

        // 清除填充颜色

    }, {
        key: 'clearFillColor',
        value: function clearFillColor() {
            this.fillColor = null;
            return this;
        }

        // 定义边框颜色

    }, {
        key: 'setBorderColor',
        value: function setBorderColor(borderColor) {
            this.borderColor = borderColor;
            return this;
        }

        // 清除边框颜色

    }, {
        key: 'clearBorderColor',
        value: function clearBorderColor() {
            this.borderColor = 'pink';
            return this;
        }

        // 绘图

    }, {
        key: 'paint',
        value: function paint() {
            if (this.pointNum < 3) return;

            this.updatePoint();

            this.context.beginPath();
            this.context.strokeStyle = this.borderColor;
            this.context.fillStyle = this.fillColor;
            this.context.lineWidth = this.lineWidth;
            for (var i = 0, l = this.pointNum; i < l; i++) {
                this.context.lineTo(this.points[i].x, this.points[i].y);
            }
            this.context.closePath();
            if (this.fillColor != null) {
                this.context.fill();
            }

            this.context.stroke();
        }

        // 更新点的坐标

    }, {
        key: 'updatePoint',
        value: function updatePoint() {
            this.isCollideWall();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var point = _step.value;

                    point.x += this.deltaX;
                    point.y += this.deltaY;
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

        // 计算坐标轴的投影

    }, {
        key: 'illuminatRange',
        value: function illuminatRange(k) {
            var min = null;
            var max = null;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.points[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var point = _step2.value;

                    var intercept = MathUtil.intercept(k, point);
                    if (min == null || intercept < min) {
                        min = intercept;
                    }
                    if (max == null || intercept > max) {
                        max = intercept;
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

            return {
                min: min,
                max: max
            };
        }

        // 是否碰撞

    }, {
        key: 'isCollided',
        value: function isCollided(polygon) {
            if (polygon == null) return false;

            for (var i = 0, l = this.points.length; i < l; i++) {
                var k = null;
                if (i === l - 1) {
                    k = MathUtil.gradient(this.points[i], this.points[0]);
                } else {
                    k = MathUtil.gradient(this.points[i], this.points[i + 1]);
                }

                var range1 = this.illuminatRange(k);
                var range2 = polygon.illuminatRange(k);

                // 如果未相交，说明未碰撞，返回 false
                if (!MathUtil.touch(range1, range2)) {
                    return false;
                }
            }

            return true;
        }

        // 是否撞墙

    }, {
        key: 'isCollideWall',
        value: function isCollideWall() {
            // 在 x 轴的投影
            var rangeX = this.illuminatRange(null);
            var rangeY = this.illuminatRange(0);
            if (rangeX.max >= Constants.WALL_WIDTH) {
                this.deltaX = Math.abs(this.deltaX) * -1;
            }

            if (rangeX.min <= 0) {
                this.deltaX = Math.abs(this.deltaX);
            }

            if (rangeY.max >= Constants.WALL_HEIGHT) {
                this.deltaY = Math.abs(this.deltaY) * -1;
            }

            if (rangeY.min <= 0) {
                this.deltaY = Math.abs(this.deltaY);
            }
        }
    }, {
        key: 'toString',
        value: function toString() {
            var logInfo = '';
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.points[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var point = _step3.value;

                    logInfo += point.toString() + ", ";
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return 'Polygon: ' + logInfo;
        }
    }]);

    return Polygon;
}();
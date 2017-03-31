'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by baoxuebin on 2017/3/31.
 */
var Test = function () {
    function Test() {
        _classCallCheck(this, Test);
    }

    _createClass(Test, [{
        key: 'test',
        value: function test() {
            console.log(1);
        }
    }]);

    return Test;
}();

var Node = function (_Rectangle) {
    _inherits(Node, _Rectangle);

    function Node(points, context, level, parentNode, totaLevel) {
        _classCallCheck(this, Node);

        var _this = _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this, context, 0, 0));

        _this.initPoints(points);
        _this.level = level;
        _this.parentNode = parentNode;
        _this.totaLevel = totaLevel;
        _this.childNodes = [];
        _this.polygons = [];
        return _this;
    }

    _createClass(Node, [{
        key: 'buildTree',
        value: function buildTree() {
            // 到达最大深度，退出
            if (this.level >= this.totaLevel) return;

            var firstPoints = [new Point(this.points[0].x, this.points[0].y), new Point(parseInt(this.points[0].x + this.getWidth() / 2), this.points[1].y), new Point(parseInt(this.points[0].x + this.getWidth() / 2), parseInt(this.points[0].y + this.getHeight() / 2)), new Point(this.points[0].x, parseInt(this.points[0].y + this.getHeight() / 2))];
            // 构建四个子节点
            var cnode = new LeafNode(firstPoints, this.context, this.level + 1, this, this.totaLevel);
            cnode.buildTree();
            Utils.addObjToArray(this.childNodes, cnode);

            cnode = new LeafNode(this.createPoints(firstPoints, parseInt(this.getWidth() / 2), 0), this.context, this.level + 1, this, this.totaLevel);
            cnode.buildTree();
            Utils.addObjToArray(this.childNodes, cnode);

            cnode = new LeafNode(this.createPoints(firstPoints, parseInt(this.getWidth() / 2), parseInt(this.getHeight() / 2)), this.context, this.level + 1, this, this.totaLevel);
            cnode.buildTree();
            Utils.addObjToArray(this.childNodes, cnode);

            cnode = new LeafNode(this.createPoints(firstPoints, 0, parseInt(this.getHeight() / 2)), this.context, this.level + 1, this, this.totaLevel);
            cnode.buildTree();
            Utils.addObjToArray(this.childNodes, cnode);
        }
    }, {
        key: 'createPoints',
        value: function createPoints(points, offsetX, offsetY) {
            var ps = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var p = _step.value;

                    ps.push(new Point(p.x + offsetX, p.y + offsetY));
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

            return ps;
        }

        // 初始化多边形

    }, {
        key: 'initPolygons',
        value: function initPolygons(polygons) {
            if (polygons && polygons.length > 0) {
                if (this.childNodes && this.childNodes.length > 0) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.childNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var cnode = _step2.value;

                            cnode.initPolygons(polygons);
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
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = polygons[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var polygon = _step3.value;

                            if (this.isCollided(polygon)) {
                                Utils.addObjToArray(this.polygons, polygon);
                            } else {
                                Utils.delObjFromArray(this.polygons, polygon);
                            }
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
                }
            }
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            if (this.borderColor) this.paint();

            if (this.childNodes && this.childNodes.length > 0) {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = this.childNodes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var cnode = _step4.value;

                        cnode.refresh();
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            } else {
                this.paintPolygon();
            }
        }
    }, {
        key: 'paintPolygon',
        value: function paintPolygon() {
            var collidedPolygon = [];
            var collidedNum = void 0;

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.polygons[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var polygon = _step5.value;

                    collidedNum = 0;
                    if (!Utils.contain(collidedPolygon, polygon)) {
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                            for (var _iterator6 = this.polygons[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                var p = _step6.value;

                                if (polygon != p && !Utils.contain(collidedPolygon, p)) {
                                    if (polygon.isCollided(p)) {
                                        collidedNum++;
                                        Utils.addObjToArray(collidedPolygon, polygon);
                                        Utils.addObjToArray(collidedPolygon, p);
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError6 = true;
                            _iteratorError6 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                    _iterator6.return();
                                }
                            } finally {
                                if (_didIteratorError6) {
                                    throw _iteratorError6;
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
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }]);

    return Node;
}(Rectangle);

var RootNode = function (_Node) {
    _inherits(RootNode, _Node);

    function RootNode(points, context, totaLevel) {
        _classCallCheck(this, RootNode);

        var _this2 = _possibleConstructorReturn(this, (RootNode.__proto__ || Object.getPrototypeOf(RootNode)).call(this, points, context, 0, null, totaLevel));

        _this2.borderColor = 'pink';
        _this2.lineWidth = 4;
        return _this2;
    }

    return RootNode;
}(Node);

var LeafNode = function (_Node2) {
    _inherits(LeafNode, _Node2);

    function LeafNode(points, context, level, parentNode, totaLevel) {
        _classCallCheck(this, LeafNode);

        var _this3 = _possibleConstructorReturn(this, (LeafNode.__proto__ || Object.getPrototypeOf(LeafNode)).call(this, points, context, level, parentNode, totaLevel));

        _this3.borderColor = null;
        _this3.lineWidth = 5 - 2 * level;
        return _this3;
    }

    return LeafNode;
}(Node);

// 四叉树


var QuadTree = function () {
    function QuadTree(totaLevel, polygons, points, context) {
        _classCallCheck(this, QuadTree);

        this.totaLevel = totaLevel; // 深度
        this.polygons = polygons; // 所有多边形的集合
        this.points = points;
        this.context = context;
        this.tree = [];
        this.root = null;
    }

    _createClass(QuadTree, [{
        key: 'setPoints',
        value: function setPoints(points) {
            if (points) {
                this.points = points;
            }
            return this;
        }
    }, {
        key: 'setTotalLevel',
        value: function setTotalLevel(level) {
            this.totaLevel = level;
            return this;
        }
    }, {
        key: 'setPolygons',
        value: function setPolygons(polygons) {
            if (polygons) {
                this.polygons = polygons;
            }
            return this;
        }

        // 构建树结构

    }, {
        key: 'buildTree',
        value: function buildTree() {
            this.root = new RootNode(this.points, this.context, this.totaLevel);
            this.root.buildTree();
        }

        // 多边形分类

    }, {
        key: 'refresh',
        value: function refresh() {
            if (this.root) {
                this.root.initPolygons(this.polygons);
                this.root.refresh();
            } else {
                console.log('QuadTree 中根节点未定义。');
            }
        }
    }]);

    return QuadTree;
}();
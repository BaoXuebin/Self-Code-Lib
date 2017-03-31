"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by baoxuebin on 2017/3/31.
 */
// 矩形
var Rectangle = function (_Polygon) {
    _inherits(Rectangle, _Polygon);

    function Rectangle(context, speed, direction) {
        _classCallCheck(this, Rectangle);

        return _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, [new Point(50, 50), new Point(90, 50), new Point(90, 90), new Point(50, 90)], context, speed, direction));
    }

    _createClass(Rectangle, [{
        key: "getWidth",
        value: function getWidth() {
            return Math.abs(this.points[1].x - this.points[0].x);
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            return Math.abs(this.points[3].y - this.points[0].y);
        }
    }], [{
        key: "random",
        value: function random(context) {
            var posX = parseInt(Math.random() * (Constants.WALL_WIDTH - 50));
            var posY = parseInt(Math.random() * (Constants.WALL_HEIGHT - 30));
            var width = 10 + parseInt(Math.random() * 10);
            var height = 10 + parseInt(Math.random() * 10);
            var speed = parseInt(Math.random() * 6) + 1;
            var direction = 2 * Math.PI * Math.random();

            return new Rectangle(context, speed, direction).initPoints([new Point(posX, posY), new Point(posX + width, posY), new Point(posX + width, posY + height), new Point(posX, posY + height)]);
        }
    }]);

    return Rectangle;
}(Polygon);

// 三角形


var Triangle = function (_Polygon2) {
    _inherits(Triangle, _Polygon2);

    function Triangle(context, speed, direction) {
        _classCallCheck(this, Triangle);

        return _possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).call(this, [new Point(40, 40), new Point(60, 80), new Point(20, 80)], context, speed, direction));
    }

    return Triangle;
}(Polygon);

// 五边形


var Pentagon = function (_Polygon3) {
    _inherits(Pentagon, _Polygon3);

    function Pentagon(context, speed, direction) {
        _classCallCheck(this, Pentagon);

        return _possibleConstructorReturn(this, (Pentagon.__proto__ || Object.getPrototypeOf(Pentagon)).call(this, [new Point(40, 40), new Point(55, 30), new Point(70, 40), new Point(63, 60), new Point(47, 60)], context, speed, direction));
    }

    return Pentagon;
}(Polygon);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by baoxuebin on 2017/3/31.
 */
// 工具类
var MathUtil = function () {
    function MathUtil() {
        _classCallCheck(this, MathUtil);
    }

    _createClass(MathUtil, null, [{
        key: 'log',
        value: function log() {
            console.log('This is a tool class!');
        }
    }, {
        key: 'gradient',
        value: function gradient(p1, p2) {
            if (p1.x === p2.x) {
                return null;
            }
            return (p2.y - p1.y) / (p2.x - p1.x);
        }
    }, {
        key: 'intercept',
        value: function intercept(k, point) {
            if (k != null) {
                return point.y - k * point.x;
            } else {
                return point.x;
            }
        }
    }, {
        key: 'touch',
        value: function touch(range1, range2) {
            return range1.min < range2.max && range1.max > range2.min;
        }
    }]);

    return MathUtil;
}();

var Constants = function Constants() {
    _classCallCheck(this, Constants);
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by baoxuebin on 2017/3/31.
 */
var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: "indexOf",
        value: function indexOf(arr, obj) {
            for (var index in arr) {
                if (obj == arr[index]) return index;
            }

            return -1;
        }
    }, {
        key: "contain",
        value: function contain(arr, obj) {
            if (this.indexOf(arr, obj) >= 0) {
                return true;
            }

            return false;
        }
    }, {
        key: "addObjToArray",
        value: function addObjToArray(arr, obj) {
            if (this.indexOf(arr, obj) >= 0) return null;

            arr.push(obj);
            return obj;
        }
    }, {
        key: "delObjFromArray",
        value: function delObjFromArray(arr, obj) {
            var index = this.indexOf(arr, obj);
            if (index >= 0) {
                arr.splice(index, index + 1);
                return obj;
            }

            return null;
        }
    }]);

    return Utils;
}();
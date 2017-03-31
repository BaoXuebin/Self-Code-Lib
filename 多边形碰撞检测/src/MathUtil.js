/**
 * Created by baoxuebin on 2017/3/31.
 */
// 工具类
class MathUtil {
    static log() {
        console.log('This is a tool class!');
    }

    static gradient(p1, p2) {
        if (p1.x === p2.x) {
            return null;
        }
        return (p2.y - p1.y)/(p2.x - p1.x);
    }

    static intercept(k, point) {
        if (k != null) {
            return point.y - k * point.x;
        } else {
            return point.x;
        }
    }

    static touch(range1, range2) {
        return range1.min < range2.max && range1.max > range2.min;
    }

}

class Constants {}
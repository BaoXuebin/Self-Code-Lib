/**
 * Created by baoxuebin on 2017/3/31.
 */
// 点
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setX(x) {
        this.x = x;
        return this;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    toString() {
        return `[${this.x}, ${this.y}]`;
    }
}

// 多边形
class Polygon {
    // 构造方法
    constructor(points, context, speed, direction) {
        if (points) {
            this.points = points;
        } else {
            this.points = [];
        }
        this.pointNum = this.points.length;
        this.context = context;
        this.speed = speed;
        this.direction = direction;
        this.deltaX = this.speed * (Math.cos(this.direction));
        this.deltaY = this.speed * (Math.sin(this.direction));
        this.fillColor = null;
        this.borderColor = 'pink';
        this.lineWidth = 1;
    }

    // 初始化点集合
    initPoints(points) {
        this.points = points;
        return this;
    }

    // 添加点
    addPoint(p) {
        this.points.push(p);
        return this;
    }

    // 定义填充颜色
    setFillColor(fillColor) {
        this.fillColor = fillColor;
        return this;
    }

    // 清除填充颜色
    clearFillColor() {
        this.fillColor = null;
        return this;
    }

    // 定义边框颜色
    setBorderColor(borderColor) {
        this.borderColor = borderColor;
        return this;
    }

    // 清除边框颜色
    clearBorderColor() {
        this.borderColor = 'pink';
        return this;
    }

    // 绘图
    paint() {
        if (this.pointNum < 3) return;

        this.updatePoint();

        this.context.beginPath();
        this.context.strokeStyle = this.borderColor;
        this.context.fillStyle = this.fillColor;
        this.context.lineWidth = this.lineWidth;
        for (let i=0, l=this.pointNum; i < l; i++) {
            this.context.lineTo(this.points[i].x, this.points[i].y);
        }
        this.context.closePath();
        if (this.fillColor != null) {
            this.context.fill();
        }

        this.context.stroke();
    }

    // 更新点的坐标
    updatePoint() {
        this.isCollideWall();

        for (let point of this.points) {
            point.x += this.deltaX;
            point.y += this.deltaY;
        }

    }

    // 计算坐标轴的投影
    illuminatRange(k) {
        let min = null;
        let max = null;

        for (let point of this.points) {
            let intercept = MathUtil.intercept(k, point);
            if (min == null || intercept < min) {
                min = intercept;
            }
            if (max == null || intercept > max) {
                max = intercept;
            }
        }

        return {
            min: min,
            max: max
        };
    }

    // 是否碰撞
    isCollided(polygon) {
        if (polygon == null)
            return false;

        for (let i = 0, l = this.points.length; i < l; i ++ ){
            let k = null;
            if (i === l - 1) {
                k = MathUtil.gradient(this.points[i], this.points[0]);
            } else {
                k = MathUtil.gradient(this.points[i], this.points[i+1]);
            }

            let range1 = this.illuminatRange(k);
            let range2 = polygon.illuminatRange(k);

            // 如果未相交，说明未碰撞，返回 false
            if (!MathUtil.touch(range1, range2)) {
                return false;
            }
        }

        return true;
    }

    // 是否撞墙
    isCollideWall() {
        // 在 x 轴的投影
        let rangeX = this.illuminatRange(null);
        let rangeY = this.illuminatRange(0);
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

    toString() {
        let logInfo = '';
        for (let point of this.points) {
            logInfo += point.toString() + ", ";
        }
        return `Polygon: ${logInfo}`;
    }
}

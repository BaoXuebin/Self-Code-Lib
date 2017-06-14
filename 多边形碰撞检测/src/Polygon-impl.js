/**
 * Created by baoxuebin on 2017/3/31.
 */
// 矩形
class Rectangle extends Polygon {
    constructor(context, speed, direction) {
        super([new Point(50,50), new Point(90,50), new Point(90,90), new Point(50,90)], context, speed, direction);
    }

    getWidth() {
        return Math.abs(this.points[1].x - this.points[0].x);
    }

    getHeight() {
        return Math.abs(this.points[3].y - this.points[0].y);
    }

    static random(context) {
        let posX = parseInt(Math.random() * (Constants.WALL_WIDTH - 50));
        let posY = parseInt(Math.random() * (Constants.WALL_HEIGHT - 30));
        let width = 10 + parseInt(Math.random() * 10);
        let height = 10 + parseInt(Math.random() * 10);
        let speed = parseInt(Math.random() * 6) + 1;
        let direction = 2 * Math.PI * Math.random();

        return new Rectangle(context, speed, direction).initPoints([
            new Point(posX, posY),
            new Point(posX + width, posY),
            new Point(posX + width, posY + height),
            new Point(posX, posY + height)
        ]);
    }
}

// 三角形
class Triangle extends Polygon {
    constructor(context, speed, direction) {
        super([new Point(40,40), new Point(60,80), new Point(20,80)] , context, speed, direction);
    }
}

// 五边形
class Pentagon extends Polygon {
    constructor(context, speed, direction) {
        super([new Point(40,40), new Point(55,30), new Point(70,40),
            new Point(63,60), new Point(47,60)] , context, speed, direction);
    }
}
/**
 * Created by baoxuebin on 2017/3/31.
 */
class Test {
    constructor() {}

    test() {
        console.log(1);
    }
}

class Node extends Rectangle {
    constructor(points, context, level, parentNode, totaLevel) {
        super(context, 0, 0);
        this.initPoints(points);
        this.level = level;
        this.parentNode = parentNode;
        this.totaLevel = totaLevel;
        this.childNodes = [];
        this.polygons = [];
    }

    buildTree() {
        // 到达最大深度，退出
        if (this.level >= this.totaLevel) return;

        let firstPoints = [
            new Point(this.points[0].x, this.points[0].y),
            new Point(parseInt(this.points[0].x + this.getWidth() / 2), this.points[1].y),
            new Point(parseInt(this.points[0].x + this.getWidth() / 2), parseInt(this.points[0].y + this.getHeight() / 2)),
            new Point(this.points[0].x, parseInt(this.points[0].y + this.getHeight() / 2))
        ];
        // 构建四个子节点
        let cnode = new LeafNode(firstPoints, this.context, this.level + 1, this, this.totaLevel);
        cnode.buildTree();
        Utils.addObjToArray(this.childNodes, cnode);

        cnode = new LeafNode(this.createPoints(firstPoints, parseInt(this.getWidth()/2), 0),
            this.context, this.level + 1, this, this.totaLevel);
        cnode.buildTree();
        Utils.addObjToArray(this.childNodes, cnode);

        cnode = new LeafNode(this.createPoints(firstPoints, parseInt(this.getWidth()/2), parseInt(this.getHeight()/2)),
            this.context, this.level + 1, this, this.totaLevel)
        cnode.buildTree();
        Utils.addObjToArray(this.childNodes, cnode);

        cnode = new LeafNode(this.createPoints(firstPoints, 0, parseInt(this.getHeight()/2)),
            this.context, this.level + 1, this, this.totaLevel);
        cnode.buildTree();
        Utils.addObjToArray(this.childNodes, cnode);
    }

    createPoints(points, offsetX, offsetY) {
        let ps = [];
        for (let p of points) {
            ps.push(new Point(p.x + offsetX, p.y + offsetY));
        }
        return ps;
    }

    // 初始化多边形
    initPolygons(polygons) {
        if (polygons && polygons.length > 0) {
            if (this.childNodes && this.childNodes.length > 0) {
                for (let cnode of this.childNodes) {
                    cnode.initPolygons(polygons);
                }
            } else {
                for (let polygon of polygons) {
                    if (this.isCollided(polygon)) {
                        Utils.addObjToArray(this.polygons, polygon);
                    } else {
                        Utils.delObjFromArray(this.polygons, polygon);
                    }
                }
            }
        }
    }

    refresh() {
        if (this.borderColor)
            this.paint();

        if (this.childNodes && this.childNodes.length > 0) {
            for (let cnode of this.childNodes) {
                cnode.refresh();
            }
        } else {
            this.paintPolygon();
        }
    }

    paintPolygon() {
        let collidedPolygon = [];
        let collidedNum;

        for (let polygon of this.polygons) {
            collidedNum = 0;
            if (!Utils.contain(collidedPolygon, polygon)) {
                for (let p of this.polygons) {
                    if (polygon != p && !Utils.contain(collidedPolygon, p)) {
                        if (polygon.isCollided(p)) {
                            collidedNum ++;
                            Utils.addObjToArray(collidedPolygon, polygon);
                            Utils.addObjToArray(collidedPolygon, p);
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
    }

}

class RootNode extends Node {
    constructor(points, context, totaLevel) {
        super(points, context, 0, null, totaLevel);
        this.borderColor = 'pink';
        this.lineWidth = 4;
    }
}

class LeafNode extends Node {
    constructor(points, context, level, parentNode, totaLevel) {
        super(points, context, level, parentNode, totaLevel);
        this.borderColor = null;
        this.lineWidth = 5 - 2 * level;
    }
}

// 四叉树
class QuadTree {
    constructor(totaLevel, polygons, points, context) {
        this.totaLevel = totaLevel; // 深度
        this.polygons = polygons; // 所有多边形的集合
        this.points = points;
        this.context = context;
        this.tree = [];
        this.root = null;
    }

    setPoints(points) {
        if (points) {
            this.points = points;
        }
        return this;
    }

    setTotalLevel(level) {
        this.totaLevel = level;
        return this;
    }

    setPolygons(polygons) {
        if (polygons) {
            this.polygons = polygons;
        }
        return this;
    }

    // 构建树结构
    buildTree() {
         this.root = new RootNode(this.points, this.context, this.totaLevel);
         this.root.buildTree();
    }

    // 多边形分类
    refresh() {
        if (this.root) {
            this.root.initPolygons(this.polygons);
            this.root.refresh();
        } else {
            console.log('QuadTree 中根节点未定义。');
        }
    }
}


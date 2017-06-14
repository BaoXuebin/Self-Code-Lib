/**
 * Created by baoxuebin on 2017/3/31.
 */
function buildCanvas() {
    let htmlCanvas, $canvas;

    $('div.canvas-container').each(function() {
        $(this).append('<canvas>your browser does not support the canvas tag!</canvas>');
        htmlCanvas = $(this).children('canvas')[0];
        $canvas = $(this).children('canvas');
        htmlCanvas.width = $(this).width();
        htmlCanvas.height = $(this).height();
        $canvas.css({
            backgroundColor: 'black'
        });
    });

    return [
        htmlCanvas,
        $canvas
    ];
}

$(function() {
    let [canvas, $canvas] = buildCanvas();
    let context = canvas.getContext('2d');
    Constants.WALL_WIDTH = canvas.width;
    Constants.WALL_HEIGHT = canvas.height;

    let polygons = [];

    for (let i = 1; i <= 100; i++ ) {
        polygons.push(Rectangle.random(context));
    }

    $('button').click(function() {
        let cls = $(this).attr('class');
        if (cls === 'add-rectangle') {
            for (let i = 1; i <= 20; i++ ) {
                polygons.push(Rectangle.random(context));
            }
        }

        if (cls === 'reduce-rectangle') {
            for (let i = 1; i <= 20; i++ ) {
                polygons.pop();
            }
        }
    });

    // 是否四叉树优化
    let isQuadTree = false;
    // 是否显示信息
    let isShowInfo = true;

    let globalTime = new Date().getTime();
    let maxFPS = 0;
    let minFPS = 1000;
    let fpsArray = [];
    let fpsNum = 0;
    let curfps = 0;

    let points = [
        new Point(0, 0),
        new Point(Constants.WALL_WIDTH, 0),
        new Point(Constants.WALL_WIDTH, Constants.WALL_HEIGHT),
        new Point(0, Constants.WALL_HEIGHT)
    ];

    let quadTree = new QuadTree(2, polygons, points, context);
    quadTree.buildTree();

    update(function() {
        isQuadTree = $('input.isQuadTree').is(':checked');
        isShowInfo = $('input.isShowInfo').is(':checked');

        context.clearRect(0, 0, Constants.WALL_WIDTH, Constants.WALL_HEIGHT);
        context.lineWidth = 1;

        // 启用四叉树优化
        if (isQuadTree) {
            quadTree.refresh();
        } else {
            let collidedNum;
            // 正在碰撞的多边形集合
            let collidedPolygon = [];

            for (let polygon of polygons) {
                collidedNum = 0;
                if (!Utils.contain(collidedPolygon, polygon)) {
                    for (let p of polygons) {
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

        if (isShowInfo) {
            let fps = parseInt(1000 / (new Date().getTime() - globalTime));
            if (minFPS > fps) minFPS = fps;
            if (maxFPS < fps) maxFPS = fps;

            globalTime = new Date().getTime();
            context.fillStyle = 'white';
            if (fpsArray.length < 10) {
                fpsArray.push(fps);
            } else {
                fpsNum = 0;
                fpsArray.map((f) => {
                    fpsNum += f;
                });
                curfps = parseInt(fpsNum/fpsArray.length);
                fpsArray.splice(0, fpsArray.length);
            }

            context.fillText(curfps.toString(), 20, 20);
            context.fillText(`max: ${maxFPS}`, 60, 20);
            context.fillText(`min: ${minFPS}`, 110, 20);
            context.fillText(`${polygons.length}`, Constants.WALL_WIDTH - 50, 20);
        }
    });

});

function update(f) {
    // f();
    setInterval(f, 33);
}


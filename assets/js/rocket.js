window.onload = function(){
var renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true, transparent: true });
document.body.appendChild(renderer.view);

function drawBody(){
    var body = new PIXI.Graphics();

    // set a fill and line style
    body.beginFill(0xFF3300);

    body.drawEllipse(0,0, 40, 100)

    body.endFill()

    return body;
}

function drawWindow(){
    var win = new PIXI.Graphics();

    // set a fill and line style
    win.beginFill(0x6699FF);

    win.drawEllipse(0,0, 15, 15)

    win.endFill()

    return win;
}

function drawPad(reverseX = false){
    var pad = new PIXI.Graphics();

    path = [
       0, 0,
       0, 50,
       30, 70,
       30, 20,
       0, 0,
    ]

    if (reverseX){
        path = path.map(function(value, index){
            if( index == 0 || (index % 2) == 0){
                return value * -1;
            }else{
                return value
            }
        })
    }

    pad.beginFill(0xFF9900);

    pad.drawPolygon(path)

    pad.endFill()

    return pad;

}

// create the root of the scene graph
var stage = new PIXI.Container();

stage.interactive = true;

var rocket = new PIXI.Container();

rightPad = drawPad();
rightPad.position.x = 18
rightPad.position.y = 40

leftPad = drawPad(true);
leftPad.position.x = -18
leftPad.position.y = 40

rocket.addChild(leftPad);
rocket.addChild(rightPad);

rocket.addChild(drawBody())
win = drawWindow();
win.position.y = -50;
rocket.addChild(win);


stage.addChild(rocket);

animate();

rocket.position.x = 400;
var base_pos = 300;

function animate(){
    renderer.render(stage)
    requestAnimationFrame (animate);

    rocket.position.y = base_pos + (20*Math.sin(Date.now() / 100));
}

}
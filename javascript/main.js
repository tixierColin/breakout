let canvas = document.getElementById("canvas"); 
let ctx = canvas.getContext("2d");
// keys input VV
let keys = [];
document.addEventListener('keydown', function(e){
    keys[e.which] = true;
});
document.addEventListener('keyup', function(e){
    keys[e.which] = false;
});
// ---
let game = new Game();
let els = []
let tileMap = new TileMap([ // map, height, width
    ["#e4030d", "#e4030d", "#e4030d", "#e4030d", "#e4030d", "#e4030d", "#e4030d"],
    ["#f67c1b", "#f67c1b", "#f67c1b", "#f67c1b", "#f67c1b", "#f67c1b", "#f67c1b"],
    ["#dbde35", "#dbde35", "#dbde35", "#dbde35", "#dbde35", "#dbde35", "#dbde35"],
    ["#0be535", "#0be535", "#0be535", "#0be535", "#0be535", "#0be535", "#0be535"]
], Math.round(canvas.width/7), Math.round(canvas.width/7));
tileMap.loadMap();
let player = new Player({x: (canvas.width / 2) - (100 / 2), y: 450}, "#8d5ff3", 100, 10); // pos, color, width, height
let ball = new Ball({x: (canvas.width / 2) - (10 / 2), y: 440}, "#fff", 10); // pos, color, height
els.push(player);

let lastTime = 0;
let deltaTime = 0;



function mainLoop(time = 0) {
    deltaTime = time - lastTime;
    lastTime = time;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!game.play || game.end) {
        if (!game.play) {
            game.renderTitleScreen();
        } else if (!game.won) {
            game.lose();
        } else {
            game.win();
        }
    } else {
        ball.update();
        player.update();
        tileMap.updateBlock();
    }
    window.requestAnimationFrame(mainLoop);
}

mainLoop();
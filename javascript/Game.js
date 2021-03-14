class Game {
    constructor() {
        this.play = false;
        this.end = false;
        this.won = false;
        this.time = 0;
    }

    renderTitleScreen() {
        ctx.font = "25px serif";
        ctx.fillStyle = "#fff";
        ctx.fillText("breakout", (canvas.width / 5), (canvas.height / 2) - 20);
        ctx.font = "15px serif";
        ctx.fillText("move the paddle width the arrow keys", (canvas.width / 5), (canvas.height / 2));
        ctx.fillText("press \"space\" to start", (canvas.width / 5), (canvas.height / 2) + 20);
        ctx.fill();
        player.draw();
        if (keys[32]) {
            game.play = true;
            this.countTime();
        }
    }
    countTime() {
        this.time = 1;
        let inter = setInterval(()=>{
            if (this.end) {
                clearInterval(inter);
            } else {
                this.time ++;
            }
        }, 1000);
    }
    lose() {
        this.end = true;
        this.won = false;
        ctx.font = "25px serif";
        ctx.fillStyle = "#fff";
        ctx.fillText("nice try :)", (canvas.width / 5), (canvas.height / 2) - 10);
        ctx.font = "15px serif";
        ctx.fillText("press \"space\" to restart", (canvas.width / 5), (canvas.height / 2) + 10);
        ctx.fill();
        player.reset({x: (canvas.width / 2) - (100 / 2), y: 450}, "#8d5ff3", 100, 10); // pos, color, width, height
        player.draw();
        if (keys[32]) {
            tileMap.loadMap();
            ball.reset({x: (canvas.width / 2) - (10 / 2), y: 440}, "#fff", 10); // pos, color, height
            this.end = false;
            game.play = true;
            this.countTime();
        }
    }
    win() {
        this.end = true;
        this.won = true;
        ctx.font = "25px serif";
        ctx.fillStyle = "#fff";
        ctx.fillText("Wow you did it in " + this.time + " seconds", (canvas.width / 5), (canvas.height / 2) - 10);
        ctx.font = "15px serif";
        ctx.fillText("press \"space\" to restart", (canvas.width / 5), (canvas.height / 2) + 10);
        ctx.fill();
        player.reset({x: (canvas.width / 2) - (100 / 2), y: 450}, "#8d5ff3", 100, 10); // pos, color, width, height
        player.draw();
        if (keys[32]) {
            tileMap.loadMap();
            ball.reset({x: (canvas.width / 2) - (10 / 2), y: 440}, "#fff", 10); // pos, color, height
            this.end = false;
            game.play = true;
            this.countTime();
        }
    }
}
class Player {
    constructor(pos, color, width, height) {
        this.pos = new Vector(pos.x, pos.y);
        this.velocity = new Vector(0, 0);
        this.color = color;
        this.width = width;
        this.height = height;
        this.friction = 0.95;
        this.live = 3;
    }
    reset(pos, color, width, height) {
        this.pos = new Vector(pos.x, pos.y);
        this.velocity = new Vector(0, 0);
        this.color = color;
        this.width = width;
        this.height = height;
        this.friction = 0.95;
        this.live = 3;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
    drawInfo() {
        ctx.font = "15px serif";
        ctx.fillStyle = "#fff";
        ctx.fillText("live: " + this.live, 10, canvas.height - 10);
        ctx.fillText("time: " + game.time, 65, canvas.height - 10);
        ctx.fill();
    }
    update() {
        this.draw();
        this.drawInfo();
        this.updatePosition();
        this.collision();
    }
    updatePosition() {
        this.velocity.x *= this.friction;
        this.pos.add(this.velocity);
        if (keys[39]) {
            this.velocity.x += 0.015 * deltaTime;
        } if (keys[37]) {
            this.velocity.x -= 0.015 * deltaTime;
        }
    }
    collision() {
        if (this.pos.x <= 0) {
            this.velocity.x = 0;
            this.pos.x = 0.1;
        } else if (this.pos.x >= canvas.width - this.width) {
            this.velocity.x = 0;
            this.pos.x = (canvas.width - this.width) - 0.1;
        }
    }
    loseLive(step) {
        this.live -= step;
        if (this.live <= 0) {
            game.lose();
        }
    }
}
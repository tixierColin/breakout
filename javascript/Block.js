class Block {
    constructor(pos, color, width, height, tilePos, hp) {
        this.tilePos = new Vector(tilePos.x, tilePos.y);
        this.pos = new Vector(pos.x, pos.y);
        this.color = color;
        this.width = width;
        this.height = height;
        this.hp = hp;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
    update() {
        this.draw();
    }
    loseHealth(step) {
        this.hp -= step;
        if (this.hp <= 0) {
            tileMap.removeBlock(this.tilePos);
        }
    }
}
class Ball {
    constructor(pos, color, height) {
        this.pos = new Vector(pos.x, pos.y);
        this.velocity = new Vector(0, 2.3);
        this.color = color;
        this.height = height;
        this.width = this.height;
    }
    reset(pos, color, height) {
        this.pos = new Vector(pos.x, pos.y);
        this.velocity = new Vector(0, 2.3);
        this.color = color;
        this.height = height;
        this.width = this.height;
    }
    secondChance() {
        this.pos.x = player.pos.x + player.width / 2;
        this.pos.y = 440;
        this.velocity.x = 0;
        this.velocity.y = -2.3;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x + this.height/2, this.pos.y + this.height/2, this.height / 2, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.draw();
        this.collision();
        this.updatePosition();
    }
    collision() {
        // --- border V
        // top
        if (this.pos.y <= 0.1) {
            this.pos.y = 0.2;
            this.velocity.invertY();
        }
        // bottom (lose)
        if (this.height + canvas.height <= this.pos.y) {
            this.secondChance();
            player.loseLive(1);
        }
        // left
        if (this.pos.x <= 0) {
            this.pos.x = 0.1;
            this.velocity.invertX();
        }
        // right
        if (this.pos.x >= canvas.width - this.width) {
            this.pos.x = (canvas.width - this.width) - 0.1;
            this.velocity.invertX();
        }
        // --- element V
        for (let i in els) {
            let el = els[i];
            let dir = this.collisionCheck(el);
            
            if (dir === "bottom") {
                this.pos.y = el.pos.y - this.height - 0.1;
                this.velocity.invertY();
            } if (dir === "top") {
                this.pos.y = el.pos.y + el.height;
                this.velocity.invertY();
            } if (dir === "left" || dir === "right") {
                if (dir === "right") {
                    this.pos.x = el.pos.x - this.width - 0.1;
                } else {
                   this.pos.x = el.pos.x + el.width + 0.1;
                }
                this.velocity.invertX();
            }
            if (dir) {
                if (el.hp != undefined) {
                    el.loseHealth(1);
                } else {
                    this.velocity.x += player.velocity.x / 35 * deltaTime;
                }
            }
        }
    }
    updatePosition() {
        if (this.velocity.x > 5 || this.velocity.x < -5) {
            this.velocity.x = 5
        }
        if (this.velocity.y > 5 || this.velocity.y < -5) {
            this.velocity.x = 5
        }        
        this.pos.add(this.velocity);
    }
    collisionCheck (el) {
        let colDir = false;
        let vX = (this.pos.x + (this.width / 2)) - (el.pos.x + (el.width / 2));
        let vY = (this.pos.y + (this.height / 2)) - (el.pos.y + (el.height / 2));
        let halfWidth = (this.width / 2) + (el.width / 2);
        let halfHeight = (this.height / 2) + (el.height / 2);
        if (Math.abs(vX) < halfWidth  + 0.1 && Math.abs(vY) < halfHeight + 0.1) {
            let oX = halfWidth - Math.abs(vX);
            let oY = halfHeight - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "top";
                } else {
                    colDir = "bottom";
                }
            } else {
                if (vX > 0) {
                    colDir = "left";
                } else {
                    colDir = "right";
                }
            }
        }
        return colDir;
    }
}
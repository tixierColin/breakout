class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
    invert() {
        this.x = -this.x;
        this.y = -this.y;
    }
    invertX() {
        this.x = -this.x;
    }
    invertY() {
        this.y = -this.y;
    }
}
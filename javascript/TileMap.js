class TileMap {
    constructor(map, height, width) {
        this.map = map;
        this.height = height;
        this.width = width;
        this.blocks = [];
    }
    
    loadMap() {
        for (let y in this.map) {
            for (let x in this.map[y]) {
                if (this.map[y][x] != 0) {
                    let block = new Block({x: x * this.height, y: y * this.width}, this.map[y][x], this.width, this.height, {x: x, y: y}, 1); //pos, color, width, height, tilePos, hp
                    els.push(block);
                    this.blocks.push(block);
                }
            }
        }
    }
    removeBlock(vector) {
        for (let i in els) {
            let el = els[i];
            let index = this.blocks.indexOf(el);
            if (index >= 0) {
                if (el.tilePos.x == vector.x && el.tilePos.y == vector.y) {
                    els.splice(i, 1);
                    this.blocks.splice(index, 1);
                    if (this.blocks.length == 0) {
                        game.win();
                    }
                }
            }
        }
    }
    updateBlock() {
        for (let i in this.blocks) {
            this.blocks[i].update();
        }
    }
}
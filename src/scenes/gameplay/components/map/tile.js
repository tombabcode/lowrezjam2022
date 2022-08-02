import Tree from './env/tree';

export default class Tile {
    constructor (scene, group, tileX, tileY) {
        this.scene = scene;
        this.object = undefined;

        this.x = tileX;
        this.y = tileY;

        if (Math.random() < 0.4) {
            this.object = new Tree(this.scene, group, this.x * window.TILE_SIZE, this.y * window.TILE_SIZE);
        }
    }
}
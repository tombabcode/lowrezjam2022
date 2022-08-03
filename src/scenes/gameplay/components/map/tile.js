import Detail from './env/detail/detail';
import Tree from './env/tree/tree';

export default class Tile {
    constructor (scene, group, tileX, tileY) {
        this.scene = scene;
        this.object = undefined;

        this.x = tileX;
        this.y = tileY;

        // Skip spawning tile objects if it's respawn (middle of the map)
        if (this.x == 0 && this.y == 0)
            return;

        // Spawn object
        const rand = Math.random();
        if (rand < 0.3) this.object = new Tree(this.scene, group, this.x * window.TILE_SIZE, this.y * window.TILE_SIZE);
        else if (rand < 0.6) this.object = new Detail(this.scene, this.x * window.TILE_SIZE, this.y * window.TILE_SIZE);
    }
}
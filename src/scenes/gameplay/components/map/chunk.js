import Tile from './tile';

export default class Chunk {
    constructor (scene, x, y) {
        this.scene = scene;
        this.tiles = [];
        this.usableObjects = [];

        this.x = x;
        this.y = y;

        // Create physics group
        this.physicsGroup = this.scene.physics.add.group({
            immovable: true
        });

        // Create tiles
        for (let iy = 0; iy < window.CHUNK_SIZE; iy++)
            for (let ix = 0; ix < window.CHUNK_SIZE; ix++) {
                const tile = new Tile(
                    this.scene,
                    this.physicsGroup,
                    this.x * window.CHUNK_SIZE + ix,
                    this.y * window.CHUNK_SIZE + iy
                );
                this.tiles.push(tile);
            }
            
        // Add collider
        this.scene.physics.add.collider(this.scene.player.sprite, this.physicsGroup);
        
        this.show();
    }

    reset () {
        if (this.usableObjects) this.usableObjects.forEach(v => v.dispose());
        this.usableObjects = [];
        if (this.tiles) this.tiles.forEach(t => t.dispose());
        this.tiles = [];
        if (this.physicsGroup) this.physicsGroup.destroy();
    }

    update (time) {
        if (this.tiles && this.physicsGroup.active)
            this.tiles.forEach(tile => tile.update(time));
    }

    show () {
        this.physicsGroup.active = true;
        this.scene.physics.world.enable(this.physicsGroup);
    }

    hide () {
        this.physicsGroup.active = false;
        this.scene.physics.world.disable(this.physicsGroup);
    }
}
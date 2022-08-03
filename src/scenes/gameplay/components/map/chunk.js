import Tile from './tile';

export default class Chunk {
    constructor (scene, x, y) {
        this.scene = scene;
        this.tiles = [];

        this.x = x;
        this.y = y;

        // Create physics group
        this.physicsGroup = this.scene.physics.add.group({
            immovable: true
        });

        // DEBUG TODO
        // this.gr = this.scene.add.graphics();
        // this.gr.setDepth(1000);
        // this.gr.lineStyle(1, 0x00ff00, .01);
        
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
                // this.gr.strokeRectShape(new Phaser.Geom.Rectangle(
                //     this.x * window.CHUNK_SIZE * window.TILE_SIZE + ix * window.TILE_SIZE,
                //     this.y * window.CHUNK_SIZE * window.TILE_SIZE + iy * window.TILE_SIZE,
                //     window.CHUNK_SIZE * window.TILE_SIZE, 
                //     window.CHUNK_SIZE * window.TILE_SIZE
                // ));
            }

        // this.gr.lineStyle(1, 0xff0000, .1);
        // this.gr.strokeRectShape(new Phaser.Geom.Rectangle(this.x * window.CHUNK_SIZE * window.TILE_SIZE, this.y * window.CHUNK_SIZE * window.TILE_SIZE, window.CHUNK_SIZE * window.TILE_SIZE, window.CHUNK_SIZE * window.TILE_SIZE));
            
        // Add collider
        this.scene.physics.add.collider(this.scene.player.sprite, this.physicsGroup);
        
        this.show();
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
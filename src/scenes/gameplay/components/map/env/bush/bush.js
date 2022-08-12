import BushData from './bush.data';

export default class Bush {
    constructor (scene, group, x, y) {
        this.scene = scene;
        this.isUsable = true;

        // Data
        const dataObj = new BushData( );
        const data = dataObj.getRandom( );
        this.dataFrameID = Math.floor(Math.random() * (data.frames.length - 1)) + 1;
        this.dataFrame = data.frames[this.dataFrameID];
        
        // Logic
        this.foodSpawnedAt = 0;
        this.foodSpawnDurationMin = 5000; // ms
        this.foodSpawnDurationMax = 10000; // ms
        this.hungerReduction = 5;
        this.healthRestore = 3.2;

        // Sprite
        this.sprite = this.scene.physics.add.sprite(0, 0, 'env:bush:' + data.name);
        this.sprite.setImmovable(true);
        this.sprite.setOrigin(0, 0);
        this.sprite.body.setSize(this.dataFrame.ow, this.dataFrame.oh);
        this.sprite.body.setOffset(this.dataFrame.ox, this.dataFrame.oy);
        this.sprite.setFrame(this.dataFrameID);

        // Offset
        let offsetX = Math.random() * (window.TILE_SIZE - this.sprite.displayWidth);
        let offsetY = 0; // Math.random() * (window.TILE_SIZE - this.sprite.body.height);
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;

        // Update position
        this.sprite.setPosition(x + offsetX, y + offsetY);

        // Update depth
        this.sprite.setDepth(this.sprite.y + this.dataFrame.oy);

        // Position
        this.calcX = this.sprite.x + this.dataFrame.ox + this.dataFrame.ow / 2;
        this.calcY = this.sprite.y + this.dataFrame.oy + this.dataFrame.oh / 2;

        // Physics group
        this.physicsGroup = group;
        this.physicsGroup.add(this.sprite);
    }

    dispose () {
        this.sprite.destroy();
    }

    update (time) {
        const player = this.scene.player;
        this.distance = Phaser.Math.Distance.Between(this.calcX, this.calcY, player.sprite.x, player.sprite.y);

        if (this.sprite.frame.name === 0 && this.foodSpawnedAt <= time)
            this.sprite.setFrame(this.dataFrameID);
    }

    use (time) {
        if (this.foodSpawnedAt <= time) {
            this.foodSpawnedAt = time + Math.floor(Math.random() * (this.foodSpawnDurationMax - this.foodSpawnDurationMin) + this.foodSpawnDurationMin);
            this.scene.player.eat(this.hungerReduction, this.healthRestore);
            this.sprite.setFrame(0);
            this.scene.scoreController.addScore(1);
        }
    }
}
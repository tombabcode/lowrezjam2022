import DetailData from './detail.data';

export default class Detail {
    constructor (scene, x, y) {
        this.scene = scene;

        // Data
        const dataObj = new DetailData( );
        const data = dataObj.getRandom( );
        const dataFrameID = Math.floor(Math.random() * data.frames);

        // Sprite
        this.sprite = this.scene.add.sprite(0, 0, 'env:detail:' + data.name);
        this.sprite.setOrigin(0, 0);
        this.sprite.setFrame(dataFrameID);

        // Offset
        let offsetX = Math.random() * (window.TILE_SIZE - this.sprite.displayWidth);
        let offsetY = 0; // Math.random() * (window.TILE_SIZE - this.sprite.body.height);
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;

        // Update position
        this.sprite.setPosition(x + offsetX, y + offsetY);

        // Update depth
        this.sprite.setDepth(this.sprite.y);
    }
}
import TreeData from './tree.data';

export default class Tree {
    constructor (scene, group, x, y) {
        this.scene = scene;

        // Data
        const dataObj = new TreeData( );
        const data = dataObj.getRandom( );
        const dataFrameID = Math.floor(Math.random() * data.frames.length);
        const dataFrame = data.frames[dataFrameID];

        // Sprite
        this.sprite = this.scene.physics.add.sprite(0, 0, 'env:tree:' + data.name);
        this.sprite.setImmovable(true);
        this.sprite.setOrigin(0, 0);
        this.sprite.body.setSize(dataFrame.ow, dataFrame.oh);
        this.sprite.body.setOffset(dataFrame.ox, dataFrame.oy);
        this.sprite.setFrame(dataFrameID);

        // Offset
        let offsetX = Math.random() * (window.TILE_SIZE - this.sprite.displayWidth);
        let offsetY = 0; // Math.random() * (window.TILE_SIZE - this.sprite.body.height);
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;

        // Update position
        this.sprite.setPosition(x + offsetX, y + offsetY);

        // Update depth
        this.sprite.setDepth(this.sprite.y + dataFrame.oy);

        // Physics group
        this.physicsGroup = group;
        this.physicsGroup.add(this.sprite);
    }
}
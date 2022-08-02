export default class Tree {
    constructor (scene, group, x, y) {
        this.scene = scene;

        // Sprite
        this.sprite = this.scene.physics.add.sprite(0, 0, 'tree');
        this.sprite.setImmovable(true);
        this.sprite.body.setSize(7, 4);
        this.sprite.body.setOffset(0, 7);

        // Offset
        let offsetX = Math.random() * (window.TILE_SIZE - this.sprite.displayWidth);
        let offsetY = Math.random() * (window.TILE_SIZE - this.sprite.body.height);
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;

        // Update position
        this.sprite.setPosition(x + offsetX, y + offsetY);

        // Update depth
        this.sprite.setDepth(this.sprite.y);

        // Physics group
        this.physicsGroup = group;
        this.physicsGroup.add(this.sprite);
    }
}
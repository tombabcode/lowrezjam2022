export default class Background {
    constructor (scene) {
        this.scene = scene;

        this.object = new Phaser.Geom.Rectangle(0, 0, 64, 64);

        this.graphics = this.scene.add.graphics({
            fillStyle: {
                color: 0xE3E3E3
            }
        });

        this.graphics.setScrollFactor(0, 0);
        this.graphics.fillRectShape(this.object);
    }
}
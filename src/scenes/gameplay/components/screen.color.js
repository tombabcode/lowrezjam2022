export default class ScreenColor {
    constructor (scene, color, alpha, index) {
        this.scene = scene;

        this.object = new Phaser.Geom.Rectangle(0, 0, 64, 64);

        this.graphics = this.scene.add.graphics({
            fillStyle: {
                color: color
            }
        });

        this.graphics.setScrollFactor(0, 0);
        this.graphics.fillRectShape(this.object);
        this.graphics.setAlpha(alpha);
        this.graphics.setDepth(index);
    }
}
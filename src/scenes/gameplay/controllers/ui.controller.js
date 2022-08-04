export default class UIController {
    constructor (scene) {
        this.scene = scene;

        this.hungerMeter = this.scene.add.sprite(1, 0, 'ui:hunger');
        this.hungerMeter.setOrigin(0, 0);
        this.hungerMeter.setFrame(1);
        this.hungerMeter.setAlpha(0);
        this.hungerMeter.setDepth(Infinity);
        this.hungerMeter.setScrollFactor(0, 0);

        this.hungerMeterAnim = undefined;
    }

    updateHunger (player) {
        if (player.hunger >= 10) {
            if (this.hungerMeterAnim === undefined)
                this.hungerMeterAnim = this.scene.tweens.add({ targets: [this.hungerMeter], alpha: 1, yoyo: true, repeat: -1, duration: 600, ease: 'Quad.easeInOut' });
        } else {
            if (this.hungerMeterAnim !== undefined) {
                this.hungerMeterAnim.remove();
                this.hungerMeterAnim = undefined;
                this.hungerMeter.setAlpha(0);
            }
        }
    }

    animateDeath () {
        this.scene.tweens.add({ targets: [this.scene.foreground], alpha: 1, duration: 1000 });
    }
}
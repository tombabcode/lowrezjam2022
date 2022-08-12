export default class UIController {
    constructor (scene) {
        this.scene = scene;

        this.hungerMeter = this.scene.add.sprite(64, 1, 'ui:hunger');
        this.hungerMeter.setOrigin(1, 0);
        this.hungerMeter.setFrame(1);
        this.hungerMeter.setAlpha(0);
        this.hungerMeter.setDepth(window.ID_UI);
        this.hungerMeter.setScrollFactor(0, 0);

        this.hpVignette = this.scene.add.sprite(32, 32, 'vfx:hp');
        this.hpVignette.setOrigin(0.5, 0.5);
        this.hpVignette.setAlpha(0);
        this.hpVignette.setDepth(window.ID_VFX_HP);
        this.hpVignette.setScrollFactor(0, 0);
        this.hpVignette.setFrame(1);

        this.hungerBar = this.scene.add.graphics({ fillStyle: { color: 0xd97405 } });
        this.hungerBar.setDepth(window.ID_UI);
        this.hungerBar.setScrollFactor(0, 0);

        this.hpBar = this.scene.add.graphics({ fillStyle: { color: 0x870303 } });
        this.hpBar.setDepth(window.ID_UI);
        this.hpBar.setScrollFactor(0, 0);

        this.hungerMeterAnim = undefined;
        this.hpVignetteAnim = this.scene.tweens.add({ targets: [this.hpVignette], scale: 1.5, yoyo: true, repeat: -1, duration: 1000, ease: 'Quad.easeInOut'});
    }

    updateHunger (player) {
        const barSize = 32 - player.hunger / 100 * 32;
        this.hungerBar.clear();
        this.hungerBar.fillRectShape(new Phaser.Geom.Rectangle(32 + (32 - barSize), 0, barSize, 1));

        if (player.hunger >= 75) {
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

    updateHealth (player) {
        const barSize = player.health / 100 * 32;
        this.hpBar.clear();
        this.hpBar.fillRectShape(new Phaser.Geom.Rectangle(0, 0, barSize, 1));

        if (player.isDead) { return; }

        if (player.health >= 75) {
            this.hpVignette.setAlpha(0);
        } else {
            this.hpVignette.setAlpha(1 - player.health / 75);
        }
    }

    animateDeath () {
        this.scene.tweens.add({ targets: [this.scene.foreground], alpha: 1, duration: 1000, delay: 2000 });
        this.hpVignetteAnim.remove();
        this.scene.tweens.add({ targets: [this.hpVignette], alpha: 0, duration: 300 });
    }

    reset () {
        this.hungerMeter.setAlpha(0);
        this.hpVignette.setAlpha(0);
        this.hungerBar.clear();
        this.hpBar.clear();
    }
}
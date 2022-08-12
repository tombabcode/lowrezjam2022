import ScreenColor from '../components/screen.color';

export default class WeatherController {
    constructor (scene) {
        this.scene = scene;

        const effectHeavy = this.scene.add.sprite(32, 32, 'vfx:snow:heavy');
        effectHeavy.setOrigin(0.5, 0.5);
        effectHeavy.setScrollFactor(0, 0);
        effectHeavy.setDepth(window.ID_VFX_SNOW);
        effectHeavy.setAlpha(0);

        const effectLight = this.scene.add.sprite(32, 32, 'vfx:snow:light');
        effectLight.setOrigin(0.5, 0.5);
        effectLight.setScrollFactor(0, 0);
        effectLight.setDepth(window.ID_VFX_SNOW);
        effectLight.setAlpha(0);

        this.effects = {
            heavy: effectHeavy,
            light: effectLight
        };

        this.overlay = new ScreenColor(this.scene, 0xE3E3E3, 0, window.ID_VFX_OVERLAY);

        this.tendency = 0;
        this.windSpeed = 0;
        this.windDirection = 0;
        this.nextChange = 2000;
    }

    update (time) {
        // Update speed
        if (this.nextChange <= time) {
            this.tendency = Math.sin((time - 10000) / 20000);
            this.windSpeed += Math.random() * (0.5 + this.tendency) - 0.25;

            // Validate
            if (this.windSpeed < -10) { this.windSpeed = -10; }
            if (this.windSpeed > 10) { this.windSpeed = 10; }

            // Update sprites
            if (this.windSpeed <= 0) {
                this.effects.heavy.setAlpha(0);
                this.effects.light.setAlpha(0);
                this.effects.heavy.stop();
                this.effects.light.stop();
                this.overlay.graphics.setAlpha(0);
            } else {
                this.effects.light.setAlpha(1);
                this.effects.light.playAfterRepeat({ key: 'vfx:snow:light', frameRate: Math.max(Math.floor(this.windSpeed / 10 * 32), 8) });

                if (this.windSpeed <= 7) {
                    this.effects.heavy.setAlpha(0);
                    this.effects.heavy.stop();
                } else if (this.windSpeed <= 10) {
                    this.effects.heavy.setAlpha(1);
                    this.effects.heavy.playAfterRepeat({ key: 'vfx:snow:heavy', frameRate: Math.max(Math.floor(this.windSpeed / 10 * 24), 8) });
                }

                this.overlay.graphics.setAlpha(this.windSpeed / 10 * 0.8);
            }

            // Update next change time
            this.nextChange = time + 200;
        }
    }
}
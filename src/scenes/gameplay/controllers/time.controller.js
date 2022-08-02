export default class TimeController {
    constructor (scene) {
        this.scene = scene;

        this.totalCycleTime = 1 * 60 * 1000; // ms
        this.worldTime = this.totalCycleTime * 0.75;
    }

    update (dTime) {
        this.worldTime = (this.worldTime + dTime) % this.totalCycleTime;

        const value = (Math.sin(this.worldTime / this.totalCycleTime * Math.PI * 2) + 1) / 2;

        // TODO - It's sine now, maybe something more cool
        if (this.scene.foreground) {
            this.scene.foreground.graphics.setAlpha(value);
        }
    }
}
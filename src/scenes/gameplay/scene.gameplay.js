import ScreenColor from './components/screen.color';
import Player from './components/player';
import TimeController from './controllers/time.controller';
import MapController from './controllers/map.controller';

export default class SceneGameplay extends Phaser.Scene {
    constructor () {
        super('gameplay');
    }

    create () {
        this.background = new ScreenColor(this, 0xE3E3E3, 1.0, -Infinity);
        this.foreground = new ScreenColor(this, 0x000000, 0.0, Infinity);

        this.timeController = new TimeController(this);
        this.mapController = new MapController(this);

        this.player = new Player(this);
        this.player.initializeMovement();

        // Camera follow player
        this.cameras.main.startFollow(this.player.sprite, false, 0.08, 0.08);
    }

    update (time) {
        this.previousTime = this.currentTime || time || 0;
        this.currentTime = time || 0;
        const diff = this.currentTime - this.previousTime;
        const delta = diff / 1000;

        this.timeController.update(diff);
        this.player.updateMovement(delta);

        this.mapController.updateChunks(this.player);
    }
}
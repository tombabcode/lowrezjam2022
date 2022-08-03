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

        // Animations (Player)
        this.anims.create({ key: 'player:walk', frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2] }), frameRate: 16, repeat: -1 });

        this.player = new Player(this);
        this.player.initializeMovement();

        // Camera follow player
        this.cameras.main.startFollow(this.player.sprite, false, 0.08, 0.08);

        // DEBUG TODO
        this.input.keyboard.on('keydown-ONE', _ => { console.info('test1'); this.cameras.main.startFollow(this.player.sprite, true, 1, 1); });
        this.input.keyboard.on('keydown-TWO', _ => { console.info('test2'); this.cameras.main.startFollow(this.player.sprite, false, 1, 1); });
        this.input.keyboard.on('keydown-THREE', _ => { console.info('test3'); this.cameras.main.startFollow(this.player.sprite, true, 0.08, 0.08); });
        this.input.keyboard.on('keydown-FOUR', _ => { console.info('test3'); this.cameras.main.startFollow(this.player.sprite, false, 0.08, 0.08); });
    }

    update (time) {
        this.previousTime = this.currentTime || time || 0;
        this.currentTime = time || 0;
        const diff = this.currentTime - this.previousTime;
        const delta = diff / 1000;

        // this.timeController.update(diff);
        this.player.updateMovement(delta);

        this.mapController.updateChunks(this.player);
    }
}
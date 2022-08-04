import ScreenColor from './components/screen.color';
import Player from './components/player';
import TimeController from './controllers/time.controller';
import MapController from './controllers/map.controller';
import UIController from './controllers/ui.controller';

export default class SceneGameplay extends Phaser.Scene {
    constructor () {
        super('gameplay');
    }

    create () {
        this.background = new ScreenColor(this, 0xE3E3E3, 1.0, -Infinity);
        this.foreground = new ScreenColor(this, 0x000000, 0.0, Infinity);

        this.timeController = new TimeController(this);
        this.mapController = new MapController(this);
        this.uiController = new UIController(this);

        // Animations (Player)
        this.anims.create({ key: 'player:walk', frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2] }), frameRate: 16, repeat: -1 });
        this.anims.create({ key: 'player:death', frames: this.anims.generateFrameNumbers('player', { frames: [14, 15, 16, 17] }), frameRate: 16 });

        this.player = new Player(this);
        this.player.initializeMovement();

        // Camera follow player
        this.cameras.main.startFollow(this.player.sprite, false, 0.9, 0.9, 0, 5);

        // Use key
        this.input.keyboard.on('keydown-E', _ => {
            const usage = [];
            this.mapController.visibleChunks.forEach(chunk => chunk.tiles.forEach(tile => {
                if (tile.object && tile.object.isUsable && tile.object.distance <= 10)
                    usage.push(tile.object);
            }));

            if (usage.length === 0) return;
            if (usage.length === 1) { usage[0].use(this.currentTime); return; }

            usage.sort((a, b) => a.distance - b.distance);
            usage[0].use(this.currentTime);
        });
    }

    update (time) {
        this.previousTime = this.currentTime || time || 0;
        this.currentTime = time || 0;
        const diff = this.currentTime - this.previousTime;
        const delta = diff / 1000;

        // Update player
        // this.timeController.update(diff);
        this.player.updateMovement(delta);
        this.player.updateHunger(delta);

        // Update UI
        this.uiController.updateHunger(this.player);

        // Update map
        this.mapController.updateChunks(this.player, time);
    }
}
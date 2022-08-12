import ScreenColor from './components/screen.color';
import Player from './components/player';
import TimeController from './controllers/time.controller';
import MapController from './controllers/map.controller';
import UIController from './controllers/ui.controller';
import WeatherController from './controllers/weather.controller';
import EntityController from './controllers/entity.controller';
import ScoreController from './controllers/score.controller';

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
        this.weatherController = new WeatherController(this);
        this.entityController = new EntityController(this);
        this.scoreController = new ScoreController();

        // Animations (Player)
        this.anims.create({ key: 'player:idle', frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4, 5] }), frameRate: 12 });
        this.anims.create({ key: 'player:walk', frames: this.anims.generateFrameNumbers('player', { frames: [7, 8, 9] }), frameRate: 16 });
        this.anims.create({ key: 'player:damage', frames: this.anims.generateFrameNumbers('player', { frames: [35, 36, 37, 38] }), frameRate: 12 });
        this.anims.create({ key: 'player:attack', frames: this.anims.generateFrameNumbers('player', { frames: [30, 31, 32, 33] }), frameRate: 16 });
        this.anims.create({ key: 'player:death', frames: this.anims.generateFrameNumbers('player', { frames: [42, 43, 44, 45, 46, 47, 48] }), frameRate: 4 });
        this.anims.create({ key: 'wolf:idle', frames: this.anims.generateFrameNumbers('wolf', { frames: [0, 1, 2, 3, 4, 5] }), frameRate: 12 });
        this.anims.create({ key: 'wolf:walk', frames: this.anims.generateFrameNumbers('wolf', { frames: [7, 8, 9] }), frameRate: 16, repeat: -1 });
        this.anims.create({ key: 'wolf:attack', frames: this.anims.generateFrameNumbers('wolf', { frames: [14, 15, 16, 17, 18, 19, 20] }), frameRate: 16 });
        this.anims.create({ key: 'vfx:snow:heavy', frames: this.anims.generateFrameNumbers('vfx:snow:heavy'), frameRate: 16, repeat: -1 });
        this.anims.create({ key: 'vfx:snow:light', frames: this.anims.generateFrameNumbers('vfx:snow:light'), frameRate: 16, repeat: -1 });

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

        this.time.delayedCall(2000, _ => {
            this.entityController.spawnWolf(this.player);
            this.increaseSpeed();
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
        this.player.updateHealth();
        this.player.updateAttack();

        // Update entities
        this.entityController.update(this.player);

        // Update UI
        this.uiController.updateHunger(this.player);
        this.uiController.updateHealth(this.player);

        // Update map
        this.mapController.updateChunks(this.player, time);

        // Update weather
        this.weatherController.update(time);

        // Animations
        this.player.updateAnimation();
        this.entityController.updateAnimations();

        // Score
        this.scoreController.update(diff);
    }

    replay () {
        this.timeController.reset();
        this.mapController.reset();
        this.uiController.reset();
        this.player.reset();
        this.foreground.graphics.setAlpha(0);
    }
    
    increaseSpeed () {
        this.time.delayedCall(10000, _ => {
            if (this.entityController.wolves.length > 0) {
                this.entityController.wolves[0].speed += 0.2;
            }
            this.increaseSpeed();
        })
    }
}
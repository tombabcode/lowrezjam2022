import Background from './components/background';
import Player from './components/player';

export default class SceneGameplay extends Phaser.Scene {
    constructor () {
        super('gameplay');
    }

    create () {
        this.background = new Background(this);
        this.player = new Player(this);
        this.player.initializeMovement();

        this.tempTree = this.add.sprite(0, 0, 'tree');

        // Camera follow player
        this.cameras.main.startFollow(this.player.sprite, false, 0.08, 0.08);
    }

    update (time) {
        this.player.updateMovement(time);
    }
}
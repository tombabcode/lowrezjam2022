export default class SceneLoading extends Phaser.Scene {
    constructor () {
        super('loading');
    }

    preload () {
        this.load.image('test', require('../../../assets/env/unknown.png'));
        this.load.image('gameplay-player', require('../../../assets/env/player.png'));
        this.load.image('tree', require('../../../assets/env/tree.png'));

        this.load.on('complete', _ => {
            this.scene.switch('gameplay');
        });
    }
}
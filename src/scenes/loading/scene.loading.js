export default class SceneLoading extends Phaser.Scene {
    constructor () {
        super('loading');
    }

    preload () {
        this.load.spritesheet('player', require('../../../assets/entities/player/player.png'), { frameWidth: 24 }, { frameHeight: 24 });

        // Environment (Trees)
        this.load.spritesheet('env:tree:single', require('../../../assets/env/obstacles/trees/trees.png'), { frameWidth: 40 / 5, frameHeight: 16 });
        this.load.spritesheet('env:tree:dead', require('../../../assets/env/obstacles/trees/dead_trees.png'), { frameWidth: 32 / 4, frameHeight: 16 });
        this.load.image('env:tree:cluster-m', require('../../../assets/env/obstacles/trees/tree_cluster_medium.png'));
        this.load.image('env:tree:cluster-l', require('../../../assets/env/obstacles/trees/tree_cluster_large.png'));
        this.load.image('env:tree:multi-y', require('../../../assets/env/obstacles/trees/tree_y-tiles.png'));

        // Environment (Bushes)
        this.load.spritesheet('env:bush:single', require('../../../assets/env/food/bush_1.png'), { frameWidth: 8, frameHeight: 8 });
        this.load.spritesheet('env:bush:double', require('../../../assets/env/food/bush_2.png'), { frameWidth: 16, frameHeight: 8 });
        
        // Environment (Details)
        this.load.spritesheet('env:detail:grass', require('../../../assets/env/details/grass.png'), { frameWidth: 8, frameHeight: 8 });
        this.load.spritesheet('env:detail:ground', require('../../../assets/env/details/ground.png'), { frameWidth: 8, frameHeight: 8 });
        this.load.spritesheet('env:detail:stones', require('../../../assets/env/details/stones.png'), { frameWidth: 8, frameHeight: 8 });

        // Entity shadow
        this.load.image('ent:shadow', require('../../../assets/entities/shadow.png'));

        // UI
        this.load.spritesheet('ui:hunger', require('../../../assets/ui/meat_hunger_meter.png'), { frameWidth: 8, frameHeight: 8 });

        this.load.on('complete', _ => {
            this.scene.switch('gameplay');
        });
    }
}
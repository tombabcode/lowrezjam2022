import Phaser from 'phaser';
import SceneGameplay from './scenes/gameplay/scene.gameplay';
import SceneLoading from './scenes/loading/scene.loading';

new Phaser.Game({
    type: Phaser.AUTO,
    width: 64,
    height: 64,
    scene: [SceneLoading, SceneGameplay],
    render: {
        antialias: false,
        antialiasGL: false,
        pixelArt: true
    },
    physics: {
        default: 'arcade'
    }
});
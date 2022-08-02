import Phaser from 'phaser';
import SceneGameplay from './scenes/gameplay/scene.gameplay';
import SceneLoading from './scenes/loading/scene.loading';

window.TILE_SIZE = 16;
window.CHUNK_SIZE = 64 / window.TILE_SIZE;

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
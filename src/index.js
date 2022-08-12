import Phaser from 'phaser';
import SceneEnd from './scenes/gameplay/scene.lost';
import SceneGameplay from './scenes/gameplay/scene.gameplay';
import SceneIntro from './scenes/gameplay/scene.intro';
import SceneMenu from './scenes/gameplay/scene.menu';
import SceneLoading from './scenes/loading/scene.loading';

window.TILE_SIZE = 16;
window.CHUNK_SIZE = 64 / window.TILE_SIZE;

window.ID_UI = Number.MAX_SAFE_INTEGER;
window.ID_VFX_HP = Number.MAX_SAFE_INTEGER - 1;
window.ID_VFX_OVERLAY = Number.MAX_SAFE_INTEGER - 2;
window.ID_VFX_SNOW = Number.MAX_SAFE_INTEGER - 3;

window.GAME_SCORE = 0;

new Phaser.Game({
    type: Phaser.AUTO,
    width: 64,
    height: 64,
    scene: [SceneLoading, SceneGameplay, SceneIntro, SceneEnd, SceneMenu],
    render: {
        antialias: false,
        antialiasGL: false,
        pixelArt: true
    },
    physics: {
        default: 'arcade'
    }
});
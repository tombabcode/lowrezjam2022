import Wolf from '../components/wolf';

export default class EntityController {
    constructor (scene) {
        this.scene = scene;

        this.wolves = [];
    }

    spawnWolf (player) {
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const spawnX = 120 * Math.cos(angle) + player.sprite.x;
        const spawnY = 120 * Math.cos(angle) + player.sprite.y;
        const wolf = new Wolf(this.scene, spawnX, spawnY);
        this.wolves.push(wolf);
    }

    update (player) {
        this.wolves.forEach(wolf => wolf.updateMovement(player));
    }

    updateAnimations () {
        this.wolves.forEach(wolf => wolf.updateAnimation());
    }
}
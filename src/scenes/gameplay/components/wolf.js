export default class Wolf {
    constructor (scene, x, y) {
        this.scene = scene;

        this.data = {
            offset: {
                x: 9,
                y: 22,
                w: 6,
                h: 3
            }
        };

        // Sprite
        this.sprite = this.scene.physics.add.sprite(x, y, 'wolf');
        this.sprite.body.setSize(this.data.offset.w, this.data.offset.h);
        this.sprite.body.setOffset(this.data.offset.x, this.data.offset.y);
        this.sprite.setOrigin(0.4, 1.0);
        this.sprite.setBounce(0);
        this.sprite.setFrame(0);
        this.sprite.setImmovable(true);

        // Shadow
        this.shadow = this.scene.add.sprite(0, 0, 'ent:shadow');
        this.shadow.setOrigin(0.5, 0);

        // Movement
        this.speed = 32;

        // Damage
        this.hitDamage = 5;

        // Health
        this.health = 5;

        // Flags
        this.isChasingPlayer = true;
        this.canAttack = true;
        this.currentAnimation = 'idle';

        // Play default animation
        this.sprite.play({ key: 'wolf:idle' });
    }

    updateAnimation () {
        const anim = this.sprite.anims.getName();
        const isPlaying = this.sprite.anims.isPlaying;

        if (anim == 'wolf:death') { return; }
        if (isPlaying && 'wolf:' + this.currentAnimation == anim) { return; }
        if (isPlaying && anim == 'wolf:attack') { return; }

        this.sprite.play({ key: 'wolf:' + this.currentAnimation, repeat: -1 });
    }

    updateMovement (player) {
        this.movingStatusPre = this.movingStatus;
        this.currentAnimation = 'idle';

        // Update movement
        if (this.isChasingPlayer) {
            this.scene.physics.moveToObject(this.sprite, player.sprite, this.speed);
            this.currentAnimation = 'walk';

            if (player.isDead) {
                this.sprite.body.velocity.x *= -1;
                this.sprite.body.velocity.y *= -1;
            }
        }

        // Attack
        if (this.scene.physics.overlap(this.sprite, player.sprite) && this.canAttack && !player.isDead) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.isChasingPlayer = false;
            this.canAttack = false;
            player.doDamage(this.hitDamage);
            this.sprite.play({ key: 'wolf:attack' });
            this.scene.time.delayedCall(650, _ => {
                this.canAttack = true;
                this.isChasingPlayer = true;
                this.movingStatus = undefined;
            });
        }

        // Update flip
        if (this.isChasingPlayer) {
            if (this.sprite.body.velocity.x >= 0) { this.sprite.setFlipX(false); }
            else { this.sprite.setFlipX(true); }
        }

        // Get bounds
        const bounds = this.sprite.getBounds();

        // Update depth
        const depth = bounds.y + this.data.offset.y;
        this.sprite.setDepth(depth);
        this.shadow.setDepth(depth - 1);

        // Update shadow's position
        this.shadow.setPosition(this.sprite.x + 1, this.sprite.y - 9);
    }
}
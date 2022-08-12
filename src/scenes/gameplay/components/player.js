export default class Player {
    constructor (scene) {
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
        this.sprite = this.scene.physics.add.sprite(window.TILE_SIZE / 2, window.TILE_SIZE / 2, 'player');
        this.sprite.body.setSize(this.data.offset.w, this.data.offset.h);
        this.sprite.body.setOffset(this.data.offset.x, this.data.offset.y);
        this.sprite.setOrigin(0.5, 1.0);
        this.sprite.setBounce(0);
        this.sprite.setFrame(0);

        this.reset();
    }

    moveLeft (dTime) {
        this.sprite.setFlipX(true);
        if (!this.canAccelerate) return;
        this.movementDirX = -1;
        this.sprite.body.velocity.x += -this.speed * dTime * this.factorAccelerate;
        if (this.sprite.body.velocity.x < -this.maxSpeed)
            this.sprite.body.velocity.x = -this.maxSpeed;
    }

    moveRight (dTime) {
        this.sprite.setFlipX(false);
        if (!this.canAccelerate) return;
        this.movementDirX = 1;
        this.sprite.body.velocity.x += this.speed * dTime * this.factorAccelerate;
        if (this.sprite.body.velocity.x > this.maxSpeed)
            this.sprite.body.velocity.x = this.maxSpeed;
    }

    moveTop (dTime) {
        if (!this.canAccelerate) return;
        this.movementDirY = -1;
        this.sprite.body.velocity.y += -this.speed * dTime * this.factorAccelerate;
        if (this.sprite.body.velocity.y < -this.maxSpeed)
            this.sprite.body.velocity.y = -this.maxSpeed;
    }

    moveBottom (dTime) {
        if (!this.canAccelerate) return;
        this.movementDirY = 1;
        this.sprite.body.velocity.y += this.speed * dTime * this.factorAccelerate;
        if (this.sprite.body.velocity.y > this.maxSpeed)
            this.sprite.body.velocity.y = this.maxSpeed;
    }

    slowDownHorizontally (dTime) {
        this.sprite.body.velocity.x *= this.factorSlowDown;
        if (Math.abs(this.sprite.body.velocity.x) < 1)
            this.sprite.body.velocity.x = 0;
    }

    slowDownVertically (dTime) {
        this.sprite.body.velocity.y *= this.factorSlowDown;
        if (Math.abs(this.sprite.body.velocity.y) < 1)
            this.sprite.body.velocity.y = 0;
    }

    initializeMovement () {
        this.keysMoveLeft = [
            this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        ];
        this.keysMoveRight = [
            this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        ];
        this.keysMoveTop = [
            this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        ];
        this.keysMoveBottom = [
            this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        ];
        this.keysAttack = [
            this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        ];
    }

    updateAnimation () {
        const anim = this.sprite.anims.getName();
        const isPlaying = this.sprite.anims.isPlaying;

        if (anim == 'player:death') { return; }
        if (isPlaying && 'player:' + this.currentAnimation == anim) { return; }
        if (isPlaying && anim == 'player:damage') { return; }
        if (isPlaying && anim == 'player:attack') { return; }

        this.sprite.play({ key: 'player:' + this.currentAnimation, repeat: -1 });
    }

    updateMovement (delta) {
        if (this.isDead) { return; }

        this.movementDirX = 0;
        this.movementDirY = 0;

        // Input
        if (this.keysMoveLeft.some(key => key.isDown)) this.moveLeft(delta);
        if (this.keysMoveRight.some(key => key.isDown)) this.moveRight(delta);
        if (this.keysMoveTop.some(key => key.isDown)) this.moveTop(delta);
        if (this.keysMoveBottom.some(key => key.isDown)) this.moveBottom(delta);

        // Movement
        if (this.movementDirX != 0 || this.movementDirY != 0) {
            let angle = 0;
            if (this.movementDirX == 1 && this.movementDirY == 0) { angle = 0; }
            else if (this.movementDirX == 1 && this.movementDirY == 1) { angle = 45; }
            else if (this.movementDirX == 0 && this.movementDirY == 1) { angle = 90; }
            else if (this.movementDirX == -1 && this.movementDirY == 1) { angle = 135; }
            else if (this.movementDirX == -1 && this.movementDirY == 0) { angle = 180; }
            else if (this.movementDirX == -1 && this.movementDirY == -1) { angle = 225; }
            else if (this.movementDirX == 0 && this.movementDirY == -1) { angle = 270; }
            else angle = 315;

            const x = 1 * Math.cos(angle * (Math.PI / 180));
            const y = 1 * Math.sin(angle * (Math.PI / 180));

            this.sprite.body.velocity.x = x * this.speed;
            this.sprite.body.velocity.y = y * this.speed;
            this.currentAnimation = 'walk';
        } else {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.currentAnimation = 'idle';
        }

        // Get bounds
        const bounds = this.sprite.getBounds();

        // Update depth
        const depth = bounds.y + this.data.offset.y;
        this.sprite.setDepth(depth);
    }

    updateHunger (delta) {
        if (this.isDead) { return; }

        this.hunger += this.hungerFactor * delta;
        if (this.hunger >= 100) {
            this.die();
        }
    }

    updateHealth () {
        if (this.health <= 0 && !this.isDead) {
            this.die();
        }
    }

    updateAttack () {
        if (this.keysAttack.some(key => key.isDown))
            this.attack();
    }

    doDamage (value) {
        this.health -= value;
        this.sprite.play({ key: 'player:damage' });
    }

    die () {
        console.info('Player dead');
        this.isDead = true;
        this.sprite.play({ key: 'player:death' });
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.scene.cameras.main.zoomTo(3, 2000);
        this.scene.tweens.add({ targets: [this.scene.foreground.graphics], alpha: 1, duration: 1000, delay: 2000 });
        this.scene.time.delayedCall(3000, _ => this.scene.scene.switch('end'));
    }

    eat (hungerReduction, healthRestore) {
        this.hunger -= hungerReduction;
        this.health += healthRestore;
        if (this.hunger < 0) { this.hunger = 0; }
        if (this.health > 100) { this.health = 100; }
    }

    attack () {
        if (this.sprite.anims.getName() == 'player:attack') { return; }
        this.sprite.play({ key: 'player:attack' });
    }

    reset () {
        // Movement
        this.speed = 32;
        this.factorAccelerate = 3.0;
        this.factorSlowDown = 0.8;

        // Attack
        this.damage = 1;

        // Hunger
        this.hunger = 0;
        this.hungerFactor = 1;

        // Health
        this.health = 100;

        // Flags
        this.isDead = false;
        this.canAccelerate = true;
        this.currentAnimation = 'idle';

        this.movementDirX = 0;
        this.movementDirY = 0;

        // Play default animation
        this.sprite.play({ key: 'player:idle' });
    }
    
}
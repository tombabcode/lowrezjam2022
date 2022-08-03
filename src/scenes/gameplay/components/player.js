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

        // Shadow
        this.shadow = this.scene.add.sprite(0, 0, 'ent:shadow');
        this.shadow.setOrigin(0.5, 0);

        // Values
        this.speed = 200;
        this.maxSpeed = 35;
        this.factorAccelerate = 3.0;
        this.factorSlowDown = 0.8;

        // Flags
        this.canAccelerate = true;
        this.movingStatus = undefined;
        this.movingStatusPre = undefined;
    }

    moveLeft (dTime) {
        this.movingStatus = 'walk';
        this.sprite.setFlipX(true);
        if (!this.canAccelerate) return;
        this.sprite.body.velocity.x += -this.speed * dTime * this.factorAccelerate;
        if (this.sprite.body.velocity.x < -this.maxSpeed)
            this.sprite.body.velocity.x = -this.maxSpeed;
    }

    moveRight (dTime) {
        this.movingStatus = 'walk';
        this.sprite.setFlipX(false);
        if (!this.canAccelerate) return;
        this.sprite.body.velocity.x += this.speed * dTime * this.factorAccelerate;
        if (this.sprite.body.velocity.x > this.maxSpeed)
            this.sprite.body.velocity.x = this.maxSpeed;
    }

    moveTop (dTime) {
        this.movingStatus = 'walk';
        if (!this.canAccelerate) return;
        this.sprite.body.velocity.y += -this.speed * dTime * this.factorAccelerate;
        if (this.sprite.body.velocity.y < -this.maxSpeed)
            this.sprite.body.velocity.y = -this.maxSpeed;
    }

    moveBottom (dTime) {
        this.movingStatus = 'walk';
        if (!this.canAccelerate) return;
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
    }

    updateMovement (delta) {
        this.movingStatusPre = this.movingStatus;
        this.movingStatus = undefined;

        // Horizontal movement
        if (this.keysMoveLeft.some(key => key.isDown)) this.moveLeft(delta);
        else if (this.keysMoveRight.some(key => key.isDown)) this.moveRight(delta);
        else this.slowDownHorizontally(delta);

        // Vertical movement
        if (this.keysMoveTop.some(key => key.isDown)) this.moveTop(delta);
        else if (this.keysMoveBottom.some(key => key.isDown)) this.moveBottom(delta);
        else this.slowDownVertically(delta);

        // Update animation
        if (this.movingStatus !== this.movingStatusPre) {
            if (this.movingStatus !== undefined)
                this.sprite.play({ key: 'player:' + this.movingStatus });
            else {
                this.sprite.stop();
                this.sprite.setFrame(0);
            }
        }

        const bounds = this.sprite.getBounds();

        // Update depth
        const depth = bounds.y + this.data.offset.y;
        this.sprite.setDepth(depth);
        this.shadow.setDepth(depth - 1);

        // Update shadow's position
        this.shadow.setPosition(this.sprite.x, this.sprite.y - 7);
    }
    
}
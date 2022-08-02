export default class Player {
    constructor (scene) {
        this.scene = scene;

        // Sprite
        this.sprite = this.scene.physics.add.sprite(0, 0, 'gameplay-player');
        this.sprite.body.setSize(5, 2);
        this.sprite.body.setOffset(2, 9);
        this.sprite.setBounce(0);

        // Values
        this.speed = 200;
        this.maxSpeed = 35;
        this.factorAccelerate = 3.0;
        this.factorSlowDown = 0.8;

        // Flags
        this.canAccelerate = true;
    }

    moveLeft (dTime) {
        if (!this.canAccelerate) return;
        this.sprite.body.velocity.x += -this.speed * dTime * this.factorAccelerate;
        if (this.sprite.body.velocity.x < -this.maxSpeed)
            this.sprite.body.velocity.x = -this.maxSpeed;
    }

    moveRight (dTime) {
        if (!this.canAccelerate) return;
        this.sprite.body.velocity.x += this.speed * dTime * this.factorAccelerate;
        if (this.sprite.body.velocity.x > this.maxSpeed)
            this.sprite.body.velocity.x = this.maxSpeed;
    }

    moveTop (dTime) {
        if (!this.canAccelerate) return;
        this.sprite.body.velocity.y += -this.speed * dTime * this.factorAccelerate;
        if (this.sprite.body.velocity.y < -this.maxSpeed)
            this.sprite.body.velocity.y = -this.maxSpeed;
    }

    moveBottom (dTime) {
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
        // Horizontal movement
        if (this.keysMoveLeft.some(key => key.isDown)) this.moveLeft(delta);
        else if (this.keysMoveRight.some(key => key.isDown)) this.moveRight(delta);
        else this.slowDownHorizontally(delta);

        // Vertical movement
        if (this.keysMoveTop.some(key => key.isDown)) this.moveTop(delta);
        else if (this.keysMoveBottom.some(key => key.isDown)) this.moveBottom(delta);
        else this.slowDownVertically(delta);

        // Update depth
        this.sprite.setDepth(this.sprite.y);
    }
    
}
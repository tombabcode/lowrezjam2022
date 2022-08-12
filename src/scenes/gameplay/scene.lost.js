export default class SceneEnd extends Phaser.Scene {
    constructor () {
        super('end');
    }

    create () {
        this.isAnimating = true;
        this.texts = [];
        
        // YOU DIED text
        ['YOU', 'DIED'].forEach((word, lineID) => {
            const letters = word.split('');
            letters.forEach((letter, letterID) => {
                const text = this.add.text(32 - word.length * 8 / 2 + letterID * 8, 0, letter, {
                    fontSize: '14px',
                    color: '#fdaeae'
                });
                text.targetY = 18 + lineID * 14;
                text.setY(text.targetY - 6);
                text.setAlpha(0);
                this.texts.push(text);
            });
        });

        // SCORE text
        this.scoreText = this.add.text(32, 48, '000000', {
            fontSize: '14px',
            color: '#FFF'
        });
        this.scoreText.setOrigin(0.5, 0.5);
        this.scoreText.setAlpha(0);

        // SCORE effect
        this.scoreEffect = this.add.text(32, 48, String(window.GAME_SCORE).padStart(6, '0'), {
            fontSize: '14px',
            color: '#FFF'
        });
        this.scoreEffect.setOrigin(0.5, 0.5);
        this.scoreEffect.setAlpha(0);

        // Text animation
        this.texts.forEach((letter, i) => this.tweens.add({ targets: [letter], y: letter.targetY, alpha: 1, duration: 600, delay: i * 100, ease: 'Quad.easeOut' }));
        this.time.delayedCall(1500, _ => this.texts.forEach(letter => this.tweens.add({ targets: [letter], y: letter.targetY - 8, duration: 600, ease: 'Quad.easeOut' })));

        // Score animation
        this.time.delayedCall(1800, _ => {
            this.tweens.add({ targets: [this.scoreText], alpha: 1, duration: 300, ease: 'Quad.easeOut' });
            let score = { value: 0 }
            this.tweens.add({ targets: [score], value: window.GAME_SCORE, duration: 1000, ease: 'Quad.easeOut', onUpdate: _ => this.scoreText.setText(String(Math.floor(score.value)).padStart(6, '0')) });
        });
        this.time.delayedCall(2800, _ => {
            this.isAnimating = false;
            this.scoreEffect.setAlpha(1);
            this.tweens.add({ targets: [this.scoreEffect], alpha: 0, scale: 1.5, duration: 600, ease: 'Quad.easeOut' });
        });
    }
}
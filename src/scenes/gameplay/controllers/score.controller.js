export default class ScoreController {
    constructor () {
        this.scoreInterval = 25 * 1000; // 25s
        this.intervalTime = 0;

        window.GAME_SCORE = 0;
    }

    update (delta) {
        this.intervalTime += delta;
        if (this.intervalTime >= this.scoreInterval) {
            this.addScore(1);
            this.intervalTime -= this.scoreInterval;
        }
    }

    addScore (score) {
        window.GAME_SCORE += score;
    }
}
export default class Timer {
    constructor(game, time) {
        this.game = game;
        this.time = time;
        this.id = null;
    }

    get seconds() {
        return Math.round(this.time / 60);
    }

    set seconds(sec) {
        console.log(sec)
        this.time += sec;
    }

    update() {
        if(!this.game.isPaused)
            this.time--;
    }
}
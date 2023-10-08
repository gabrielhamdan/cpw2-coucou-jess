import Util from "./Util.js";

const FPM = 3600;

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
        const t = Util.clamp(this.time + sec, 0, FPM);
        this.time = t;
    }

    update() {
        if(!this.game.isPaused)
            this.time--;
    }
}
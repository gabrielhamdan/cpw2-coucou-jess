export default class Timer {
    constructor(game, time) {
        this.game = game;
        this.time = time;
        this.id = null;
    }

    start() {
        this.id = setInterval(()=> {
            if(this.game.isPaused) {
                clearInterval(this.id);
                return;
            }

            console.log(this.time--);
        }, 1000);
    }
}
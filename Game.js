import InputHandler from "./InputHandler.js";
import Player from "./Player.js";

export default class Game {
    constructor(width, height, context) {
        this.width = width;
        this.height = height;
        this.context = context;
        this.player = new Player(this);
    }

    render() {
        this.player.draw();
        this.player.update();
    }

    update() {
        this.render();
    }
}
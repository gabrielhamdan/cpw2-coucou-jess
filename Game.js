import LetterCube from "./LetterCube.js";
import Player from "./Player.js";
import Vector2 from "./Vector2.js";

export default class Game {
    constructor(width, height, context) {
        this.width = width;
        this.height = height;
        this.context = context;
        this.player = new Player(this);
        this.cube1 = new LetterCube("A", this.context, new Vector2(200, 270));
        this.cube2 = new LetterCube("B", this.context, new Vector2(300, 270));
    }

    render() {
        this.player.draw();
        this.player.update();
        this.cube1.draw();
        this.cube2.draw();
    }

    update() {
        this.render();
    }
}
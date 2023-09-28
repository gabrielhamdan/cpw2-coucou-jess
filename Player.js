import InputHandler from "./InputHandler.js";
import Vector2 from "./Vector2.js";
import Util from "./Util.js";

const LEFT = "ArrowLeft";
const RIGHT = "ArrowRight";
const JUMP = " ";

export default class Player {
    constructor(game) {
        this.game = game;
        this.inputHandler = new InputHandler([LEFT, RIGHT, JUMP]);
        this.width = 30;
        this.height = 41;
        this.position = new Vector2(200, 200);

        this.sprite = new Image(this.width, this.height);
        this.sprite.src = "./assets/player_sprite.png";

        this.speed = 8;
        this.acceleration = 0.2
        this.friction = 0.15
        this.velocity = Vector2.ZERO;
    }

    draw() {
        this.game.context.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.game.context.drawImage(this.sprite, this.position.x, this.position.y)
    }

    update() {
        this.#move();
    }

    #move() {
        const dir = this.inputHandler.get_axis(LEFT, RIGHT);

        if(dir != 0)
            this.velocity.x = Util.lerp(this.velocity.x, dir * this.speed, this.acceleration);
        else 
            this.velocity.x = Util.lerp(this.velocity.x, 0, this.friction);

        this.position.x += this.velocity.x;
    }
}
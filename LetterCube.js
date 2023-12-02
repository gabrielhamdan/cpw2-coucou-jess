import Collider from "./Collider.js";
import Sprite from "./Sprite.js";

export default class LetterCube {
    constructor(letter, ctx, position) {
        this.ctx = ctx;
        this.letter = letter;
        this.width = 48;
        this.height = 48;
        this.position = position;
        this.sprite = new Sprite(80, 80, "./assets/cube.png");
        this.collider = new Collider(this, this.width, this.height, this.position);
    }

    draw() {
        const gui = document.getElementsByClassName("gui")[0];
        const font = window.getComputedStyle(gui).font;

        this.sprite.render(this.position.x, this.position.y, this.ctx);
        this.ctx.font = font;
        this.ctx.fillStyle = "#FFE4F5";
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"
        this.ctx.fillText(this.letter, this.position.x + this.width / 2, this.position.y + this.height / 2);
        this.collider.draw(this.position.x, this.position.y, this.ctx);
    }
}
import InputHandler from "./InputHandler.js";
import Vector2 from "./Vector2.js";
import Util from "./Util.js";
import Sprite from "./Sprite.js";
import Collider from "./Collider.js";
import LetterCube from "./LetterCube.js";

const LEFT = "ArrowLeft";
const RIGHT = "ArrowRight";
const JUMP = " ";
const TOGGLE_DEBUG = undefined;

const FLOOR_HEIGHT = 500;

const BORDER_L = 0;
const BORDER_R = 1180;

export default class Player {
    constructor(game) {
        this.game = game;
        this.inputHandler = new InputHandler([LEFT, RIGHT, JUMP, TOGGLE_DEBUG]);
        this.width = 90;
        this.height = 123;
        this.position = new Vector2(600, 500);
        this.sprite = new Sprite(this.width, this.height, "./assets/player_sprite_scaledup.png");
        this.collider = new Collider(this, this.width, this.height);
        this.isColliding = false;
        this.speed = 10;
        this.acceleration = 0.2;
        this.friction = 0.15;
        this.velocity = Vector2.ZERO;
        this.gravity = 3;
        this.jump_speed = -320;

        this.collidingBody = null;
    }

    draw() {
        this.sprite.render(this.position.x, this.position.y, this.game.context);
        this.collider.draw(this.position.x, this.position.y, this.game.context);
    }
    
    update() {
        this.#move();

        if(this.inputHandler.isActionPressed(TOGGLE_DEBUG)) {
            Collider.toggleDebugMode();
        }

        if(this.collidingBody instanceof LetterCube)
           this.game.checkLetter(this.collidingBody);
    }

    #move() {
        if(this.game.isPaused)
            return;

        if(!this.#isOnFloor()) {
            this.velocity.y += this.gravity;
            this.speed = 20;
        } else {
            this.position.y = FLOOR_HEIGHT;
            this.velocity.y = 0;
            this.speed = 10;
        }

        const dir = this.inputHandler.get_axis(LEFT, RIGHT);

        if(dir != 0) {
            this.sprite.setSpriteDirection = dir;
            this.velocity.x = Util.lerp(this.velocity.x, dir * this.speed, this.acceleration);
        } else 
            this.velocity.x = Util.lerp(this.velocity.x, 0.0, this.friction);
        
        if(this.#isOnFloor() && this.inputHandler.isActionPressed(JUMP))
            this.velocity.y = Util.lerp(this.velocity.y, this.jump_speed, 0.1);
    
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.collidingBody = this.collider.isColliding(this, this.position.x, this.position.y);

        if(this.position.x <= BORDER_L)
            this.position.x = BORDER_L;
        else if(this.position.x >= BORDER_R)
            this.position.x = BORDER_R;
    }

    #isOnFloor() {
        return this.position.y >= FLOOR_HEIGHT;
    }
}
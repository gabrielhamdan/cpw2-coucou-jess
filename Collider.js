import Vector2 from "./Vector2.js";

const GREEN = "#42a83250";
const RED = "#f5574250";

export default class Collider {
    static instances = [];

    constructor(body, width, height, position) {
        this.body = body;
        this.width = width;
        this.height = height;
        this.position = position;
        this.isDebugMode = false;
        this.color = GREEN;
        Collider.instances.push(this);
    }

    static toggleDebugMode() {
        Collider.instances.forEach(instance => {
            instance.isDebugMode = !instance.isDebugMode;
        })
    }

    draw(x, y, ctx) {
        if(this.isDebugMode) {
            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, this.width, this.height);
            ctx.fillStyle = "black";
        }
    }

    isColliding(body, x, y) {
        let collidingBody = null;

        Collider.instances.forEach(instance => {
            if(instance != body.collider)
                if(
                    x < instance.position.x + instance.width &&
                    x + body.collider.width > instance.position.x &&
                    y < instance.position.y + instance.height &&
                    y + body.collider.height > instance.position.y
                ) {
                    body.position.x -= body.velocity.x;
                    body.position.y -= body.velocity.y;
                    body.velocity.x = 0;
                    body.velocity.y = 0;
                    body.collider.color = RED;
                    instance.color = RED;
                    collidingBody = instance.body;
                    return;
                } else {
                    body.collider.color = GREEN;
                    instance.color = GREEN;
                }
        });

        return collidingBody;
    }
}
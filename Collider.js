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
        this.color = GREEN;
        Collider.instances.push(this);
    }

    draw(x, y, ctx, isDebugMode) {
        if(isDebugMode) {
            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, this.width, this.height);
            ctx.fillStyle = "black";
        }
    }

    isColliding(collider, x, y) {
        let collidingBody = null;
        Collider.instances.forEach(instance => {
            if(instance != collider)
                if(
                    x > instance.position.x + instance.width ||
                    x + collider.width < instance.position.x ||
                    y > instance.position.y + instance.height ||
                    y + collider.height < instance.position.y
                ) {
                    this.color = GREEN;
                    instance.color = GREEN;
                } else {
                    this.color = RED;
                    instance.color = RED;
                    collidingBody = instance.body;
                }
        });

        return collidingBody;
    }
}
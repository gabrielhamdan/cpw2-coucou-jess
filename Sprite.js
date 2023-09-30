export default class Sprite {
    constructor(width, height, spriteSrc) {
        this.width = width;
        this.height = height;
        this.spriteImage = new Image(this.width, this.height);
        this.spriteImage.src = spriteSrc;
        this.spriteDirection = 1;
    }

    set setSpriteDirection(spriteDirection) {
        this.spriteDirection = spriteDirection;
    }

    render(x, y, ctx) {
        ctx.save();
        this.flipH(x, y, ctx);
        ctx.drawImage(this.spriteImage, -this.width / 2, -this.height / 2);
        ctx.restore();
    }

    flipH(x, y, ctx) {
        const centerX = x + this.width / 2;
        const centerY = y + this.height / 2;
        ctx.translate(centerX, centerY);
        ctx.scale(this.spriteDirection, 1);
    }
}
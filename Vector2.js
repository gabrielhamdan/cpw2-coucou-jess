export default class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static get ZERO() {
        return new Vector2(0, 0);
    }
}
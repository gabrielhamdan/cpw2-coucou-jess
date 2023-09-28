export default class Util {
    static lerp(a, b, alpha) {
        return a + alpha * (b - a);
    }
}
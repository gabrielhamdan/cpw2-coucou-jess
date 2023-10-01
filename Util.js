export default class Util {
    static lerp(a, b, alpha) {
        return a + alpha * (b - a);
    }

    static clamp(n, min, max) {
        return Math.min(Math.max(n, min), max);
    }

    static replaceAt(index, replacement, str) {
        return str.substring(0, index) + replacement + str.substring(index + replacement.length);
    }
}
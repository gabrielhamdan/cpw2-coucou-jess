export default class AudioManager {
    static play(audioPath) {
        const audio = new Audio(audioPath);
        audio.play();
    }
}
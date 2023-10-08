import CubeSpawn from "./CubeSpawn.js";
import Player from "./Player.js";
import Timer from "./Timer.js";
import Util from "./Util.js";

const FPM = 3600;
const FIVE_SEC = 300;
const TEN_SEC = 600;

export default class Game {
    constructor(width, height, context, timerElement) {
        this.width = width;
        this.height = height;
        this.context = context;
        this.player = new Player(this);
        this.cubeSpawn = new CubeSpawn(this.context);
        this.words = ["coucou", "jess"];
        this.secretWord = undefined;
        this.guess = "";
        this.timer = new Timer(this, FPM);
        this.isPaused = false;
        this.timerElement = timerElement;
        this.isGameOver = false;
    }

    #refreshGuess() {
        this.guess = "";
        for(let i = 0; i < this.secretWord.length; i++)
            this.guess += "_";
    }

    #printSecretWord(letter) {
        for(let i = 0; i < this.secretWord.length; i++)
            if(this.secretWord[i] === letter.toLowerCase())
                this.guess = Util.replaceAt(i, letter.toLowerCase(), this.guess);

        const secretWordPanel = document.getElementById("guess");
        secretWordPanel.innerHTML = this.guess.toUpperCase();

        this.#checkWord();
    }

    #checkWord() {
        if(this.guess.toLowerCase() == this.secretWord.toLowerCase()) {
            this.timer.seconds = TEN_SEC;
            if(this.words.length > 0)
                this.startGame();
            else this.isGameOver = true;
        }
    }

    #getRandomWord() {
        this.words = Util.shuffleArray(this.words);
        return this.words.pop();
    }

    #printTime() {
        this.timerElement.innerHTML = this.timer.seconds;
    }

    startGame() {
        this.secretWord = this.#getRandomWord();
        this.#refreshGuess();
        this.#printSecretWord("");
        this.cubeSpawn.spawnCubes(this.secretWord);
        
    }

    checkLetter(letterCube) {
        if(this.secretWord.indexOf(letterCube.letter.toLowerCase()) >= 0 && this.guess.indexOf(letterCube.letter.toLowerCase()) < 0)
            this.#printSecretWord(letterCube.letter)
        else if(this.secretWord.indexOf(letterCube.letter.toLowerCase()) < 0)
            this.timer.seconds = -FIVE_SEC;
    }
    
    render() {
        this.player.draw();
        this.cubeSpawn.render();
        this.#printTime();
    }

    update() {
        this.isGameOver = this.timer.seconds <= 0;
        this.timer.update();
        this.player.update();
    }
}
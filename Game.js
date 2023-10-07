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

    startGame() {
        this.secretWord = this.#getRandomWord();
        this.#refreshGuess();
        this.#printSecretWord("");
        this.cubeSpawn.spawnCubes(this.secretWord);
        
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

        // checkWord();
    }

    #getRandomWord() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }

    render() {
        this.player.draw();
        this.cubeSpawn.render();
        this.printTime();
    }

    printTime() {
        this.timerElement.innerHTML = this.timer.seconds;
    }
    
    update() {
        this.timer.update();
        this.player.update();
        this.isGameOver = this.timer.seconds <= 0;
    }

    checkLetter(letterCube) {
        if(this.secretWord.indexOf(letterCube.letter.toLowerCase()) >= 0 && this.guess.indexOf(letterCube.letter.toLowerCase()) < 0)
            this.#printSecretWord(letterCube.letter)
        else if(this.secretWord.indexOf(letterCube.letter.toLowerCase()) < 0)
            this.timer.seconds = -FIVE_SEC;
    }
}
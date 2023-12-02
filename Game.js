import AudioManager from "./AudioManager.js";
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
        this.words = [];
        this.guessedWords = [];
        this.secretWord = undefined;
        this.guess = "";
        this.timer = new Timer(this, FPM);
        this.isPaused = false;
        this.timerElement = timerElement;
        this.isGameOver = false;
        this.music = new Audio("./assets/audio/8BitDNALoop.wav");
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
            this.guessedWords.push(this.secretWord);

            if(this.words.length > 0) {
                this.startGame();
                AudioManager.play("./assets/audio/power_up.wav");
            }
            else this.#callGameOver(true, true);
        }
    }

    #getRandomWord() {
        this.words = Util.shuffleArray(this.words);
        return this.words.pop();
    }

    #printTime() {
        this.timerElement.innerHTML = this.timer.seconds;
    }

    #callGameOver(isGameOver, hasAllWords) {
        this.isGameOver = isGameOver;

        if(hasAllWords) {
            const gameOverTitle = document.getElementById("gameOverTitle");
            gameOverTitle.textContent = "VICTOIRE !"
        }

        if(this.isGameOver) {
            const gameOverScreen = document.getElementById("gameOverScreen");
            gameOverScreen.style.visibility = "visible";
            this.music.pause()

            if(hasAllWords)
                AudioManager.play("./assets/audio/RetroSuccessMelody04-electricpiano2.wav");
            else AudioManager.play("./assets/audio/RetroDescendingShort20.wav");
        }
    }

    async #loadWords() {
        const response = await fetch("./words.json");
        const data = await response.json();
        let words = []

        for(let key in data) {
            words.push(key);
        }

        this.words = words;
        this.#startNewRound();
    }

    startGame() {
        if(this.words.length == 0)
            this.words = this.#loadWords();
        else this.#startNewRound();
    }

    #startNewRound() {
        this.secretWord = this.#getRandomWord();
        this.#refreshGuess();
        this.#printSecretWord("");
        this.cubeSpawn.spawnCubes(this.secretWord);
    }

    checkLetter(letterCube) {
        if(this.secretWord.indexOf(letterCube.letter.toLowerCase()) >= 0 && this.guess.indexOf(letterCube.letter.toLowerCase()) < 0) {
            this.#printSecretWord(letterCube.letter);
            AudioManager.play("./assets/audio/block_hit.ogg");
        }
        else if(this.secretWord.indexOf(letterCube.letter.toLowerCase()) < 0) {
            this.timer.seconds = -FIVE_SEC;
            AudioManager.play("./assets/audio/denied.wav");
        }
    }
    
    render() {
        this.player.draw();
        this.cubeSpawn.render();
        this.#printTime();
    }

    update() {
        this.#callGameOver(this.timer.seconds <= 0, false);
        this.timer.update();
        this.player.update();
    }
}
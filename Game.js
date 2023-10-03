import CubeSpawn from "./CubeSpawn.js";
import LetterCube from "./LetterCube.js";
import Player from "./Player.js";
import Util from "./Util.js";
import Vector2 from "./Vector2.js";

export default class Game {
    constructor(width, height, context) {
        this.width = width;
        this.height = height;
        this.context = context;
        this.player = new Player(this);
        this.cube1 = new LetterCube("C", this.context, new Vector2(100, 300));
        this.cube2 = new LetterCube("E", this.context, new Vector2(400, 300));
        this.cube3 = new LetterCube("S", this.context, new Vector2(600, 300));
        this.cubeSpawn = new CubeSpawn(this.context);
        this.words = ["coucou", "jess"];
        this.secretWord = undefined;
        this.guess = "";
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
    }

    #getRandomWord() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }

    render() {
        this.player.draw();
        this.player.update();
        this.cubeSpawn.render();
        // this.cube1.draw();
        // this.cube2.draw();
        // this.cube3.draw();
    }

    update() {
        this.render();
    }

    checkLetter(letterCube) {
        if(this.secretWord.indexOf(letterCube.letter.toLowerCase()) >= 0 && this.guess.indexOf(letterCube.letter.toLowerCase()) < 0)
            this.#printSecretWord(letterCube.letter)
    }
}
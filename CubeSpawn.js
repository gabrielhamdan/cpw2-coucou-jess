import LetterCube from "./LetterCube.js";
import Util from "./Util.js";
import Vector2 from "./Vector2.js";

const MAX_CUBES = 9;
const FIRST_X_POS = 60;
const GAP_BETWEEN_CUBES = 140;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVXYWZ"

export default class CubeSpawn {
    constructor(ctx) {
        this.ctx = ctx;
        this.cubes = [];
        this.lettersInWord = [];
        this.lettersToSpawn = [];
    }

    #getLettersInWord(secretWord) {
        for(let i = 0; i < secretWord.length; i++)
            if(!this.lettersInWord.includes(secretWord[i]))
                this.lettersInWord.push(secretWord[i]);        
    }

    spawnCubes(secretWord) {
        this.#getLettersInWord(secretWord);

        for(let i = 0; i < MAX_CUBES; i++) {
            let randIndex;
            let letter;

            if(this.lettersInWord.length > 0) {
                randIndex = Math.floor(Math.random() * this.lettersInWord.length);
                letter = this.lettersInWord[randIndex];
                this.lettersInWord.splice(randIndex, 1);
            } else {
                randIndex = Math.floor(Math.random() * ALPHABET.length);
                letter = ALPHABET[randIndex];
            }

            this.lettersToSpawn.push(letter);
        }

        this.lettersToSpawn = Util.shuffleArray(this.lettersToSpawn);

        let xPos = FIRST_X_POS;
        this.lettersToSpawn.forEach((letter, i) => {
            this.cubes.push(new LetterCube(letter.toUpperCase(), this.ctx, new Vector2(xPos, i % 2 == 0 ? 350 : 300)));
            xPos += GAP_BETWEEN_CUBES;
        });
        
        this.lettersToSpawn = [];
    }

    render() {
        this.cubes.forEach(cube => {
            cube.draw();
        });
    }
}
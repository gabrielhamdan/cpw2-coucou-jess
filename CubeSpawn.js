import LetterCube from "./LetterCube.js";
import Vector2 from "./Vector2.js";

const MAX_CUBES = 6;
const FIRST_X_POS = 100;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVXYWZ"

export default class CubeSpawn {
    constructor(ctx) {
        this.ctx = ctx;
        this.cubes = [];
        this.lettersInWord = [];
    }

    #getLettersInWord(secretWord) {
        for(let i = 0; i < secretWord.length; i++)
            if(!this.lettersInWord.includes(secretWord[i]))
                this.lettersInWord.push(secretWord[i]);
        
        console.log(this.lettersInWord)
    }

    spawnCubes(secretWord) {
        this.#getLettersInWord(secretWord);

        let xPos = FIRST_X_POS;
        for(let i = 0; i < MAX_CUBES; i++) {
            const randIndex = Math.floor(Math.random() * this.lettersInWord.length);
            const letter = this.lettersInWord[randIndex];
            this.lettersInWord = this.lettersInWord.splice(randIndex, 1);
            console.log(this.lettersInWord)

            this.cubes.push(new LetterCube(letter.toUpperCase(), this.ctx, new Vector2(xPos, 300)));
            xPos += 200;
        }
    }

    render() {
        this.cubes.forEach(cube => {
            cube.draw();
        });
    }
}
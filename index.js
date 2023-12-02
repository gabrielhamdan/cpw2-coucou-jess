import AudioManager from "./AudioManager.js";
import Game from "./Game.js";

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    canvas.width = 1280;
    canvas.height = 720;

    const context = canvas.getContext("2d");

    const timerElement = document.getElementById("timer");

    const game = new Game(canvas.width, canvas.height, context, timerElement);
    game.startGame();
    game.music.loop = true;
    game.music.volume = 0.5;
    game.music.play();

    const menu = document.getElementById("menu");

    const menuBtn = document.getElementById("menuBtn");
    menuBtn.addEventListener("click", () => {
        toggleMenu();
    });

    const replayBtn = document.getElementById("replayBtn");
    replayBtn.addEventListener("click", () => {
        restartGame();
    });

    function loop() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.render();
        game.update();

        if(!game.isGameOver)
            requestAnimationFrame(loop);
    }

    function toggleMenu() {
        const menuVisibility = menu.style.visibility == "visible" ? "hidden" : "visible";
        
        game.isPaused = !game.isPaused;
        menu.style.visibility = menuVisibility;
        
        const guessedWordsDiv = document.getElementById("guessedWordsDiv");
        guessedWordsDiv.innerHTML = "";
        if(game.guessedWords.length > 0) {

            game.guessedWords.forEach(word => {
                const p = document.createElement("p");
                p.textContent = word;
                p.classList.add("menu-word");
                p.addEventListener("click", () => {
                    displayEntry(p.textContent);
                });

                guessedWordsDiv.appendChild(p);
            })
        } else {
            const p = document.createElement("p");
            p.textContent = "Vous n'avez découvert aucun mot.";
            guessedWordsDiv.appendChild(p);
        }

        if(menu.style.visibility == "visible")
            menu.style.zIndex = 999;
        else menu.style.zIndex = -1;

        AudioManager.play("./assets/audio/Tome1.wav");
    }

    async function displayEntry(word) {
        const entriesDiv = document.getElementById("entriesDiv");
        entriesDiv.innerHTML = "";

        const p = document.createElement("p");
        
        const response = await fetch("./words.json");
        const data = await response.json();

        const entry = data[word];

        p.textContent = entry;

        entriesDiv.appendChild(p);

        AudioManager.play("./assets/audio/page-turn.ogg")
    }

    function restartGame() {
        location.reload();
    }

    loop();
});
import Game from "./Game.js";

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    canvas.width = 1280;
    canvas.height = 720;

    const context = canvas.getContext("2d");

    const timerElement = document.getElementById("timer");

    const game = new Game(canvas.width, canvas.height, context, timerElement);
    game.startGame();

    function loop() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.render();
        game.update();

        if(!game.isGameOver)
            requestAnimationFrame(loop);
    }

    loop();
});
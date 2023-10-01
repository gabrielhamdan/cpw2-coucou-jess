import Game from "./Game.js";

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    canvas.width = 1280;
    canvas.height = 720;

    const context = canvas.getContext("2d");

    const game = new Game(canvas.width, canvas.height, context);
    game.startGame();

    function loop() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.render();
        requestAnimationFrame(loop);
    }

    loop();

});
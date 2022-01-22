"use strict"

let turn = 1;

const board = (() => {
    let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let main = document.querySelector("main")
    let gameArea = document.createElement("div");
    gameArea.classList.add("gameArea");
    main.appendChild(gameArea);
    let startGame = (turn) => {
        let renewSquareStatus = (turn) => {
            console.log(turn);
            gameArea.replaceChildren("");
            gameBoard.forEach((e, index) => {
                let square = document.createElement("div");
                square.classList.add("square");
                gameArea.appendChild(square);
                    if (gameBoard[index] === 0) {
                        square.addEventListener("click", () => {
                            if (turn === 1) {
                                gameBoard[index] = "x";
                                renewSquareStatus(2);
                            } else if (turn === 2) {
                                gameBoard[index] = "o";
                                renewSquareStatus(1);
                            };
                        });
                    } else if (gameBoard[index] === "x") {
                        let tic = document.createElement("p");
                        tic.classList.add("tic");
                        tic.textContent = "×";
                        square.appendChild(tic);
                    } else if (gameBoard[index] === "o") {
                        let tic = document.createElement("p");
                        tic.classList.add("tic");
                        tic.textContent = "○";
                        square.appendChild(tic);
                    };
            });
        };
        renewSquareStatus(turn);
    };
    return {gameBoard, startGame, turn};
})();

board.startGame(turn);


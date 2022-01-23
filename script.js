"use strict"



const board = (() => {
    let main = document.querySelector("main")
    let _addTic = function(sign, square) {
        let tic = document.createElement("p");
        tic.classList.add("tic");
        tic.textContent = sign;
        square.appendChild(tic)
    };
    let startPvpGame = () => {
        let gameStatus = "active"
        main.replaceChildren("");
        let gameArea = document.createElement("div");
        gameArea.classList.add("gameArea");
        main.appendChild(gameArea);
        let log = document.createElement("p")
        log.classList.add("log");
        main.appendChild(log);
        let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let renewSquareStatus = (turn) => {
                console.log(turn);
                if (turn === "end") {
                    scoreMethods.updateScore();
                    setTimeout(function() {board.startPvpGame()}, 5000)};
                if (turn !== "end") {log.textContent = `It is ${players[turn].playerName}'s turn.`};
                gameArea.replaceChildren("");
                gameBoard.forEach((e, index) => {
                    let square = document.createElement("div");
                    square.classList.add("square");
                    gameArea.appendChild(square);
                        if (turn === "end") {
                            if (gameBoard[index] === "x") {
                                _addTic("×", square);
                            } else if (gameBoard[index] === ("o")) {
                                _addTic("○", square);
                            } else {return};
                        } else if (gameBoard[index] === 0) {
                            square.addEventListener("click", () => {
                                if (turn === 0) {
                                    gameBoard[index] = "x";
                                    if (gameLogic.evaluateResult(gameBoard) == "over") {
                                        _addTic("×", square);
                                        return renewSquareStatus("end");
                                    } else {
                                    renewSquareStatus(1);
                                    };
                                } else if (turn === 1) {
                                    gameBoard[index] = ("o");
                                    if (gameLogic.evaluateResult(gameBoard) == "over") {
                                        _addTic("○", square);
                                        return renewSquareStatus("end");
                                    } else {
                                    renewSquareStatus(0);
                                    };
                                };
                            });
                        } else if (gameBoard[index] === "x") {
                            _addTic("×", square);
                        } else if (gameBoard[index] === ("o")) {
                            _addTic("○", square);
                        };
                });   
        };
        if (Math.random() >= (1/2)) {var turn = 1} else {var turn = 0};
        renewSquareStatus(turn);
    };
    return {startPvpGame, main};
})();


const playerFactory = (name) => {
    let score = 0
    const playerName = name;
    return {score, playerName}
};

let players = [];

const mainMenu = () => {
    let gameSelect = document.createElement("div")
    gameSelect.classList.add("gameSelect");
    board.main.appendChild(gameSelect);
    let prompt = document.createElement("p")
    prompt.classList.add("prompt");
    prompt.textContent = "Select the type of game."
    gameSelect.appendChild(prompt);
    for (let i = 0; i <= 1; i++) {
        let typeChoice = document.createElement("button");
        typeChoice.classList.add("choice");
        if (i === 0) {typeChoice.textContent = "Player vs Player (you and your friend)"}
        else if (i === 1) {typeChoice.textContent = "Player vs Computer (unavailable)"};
        gameSelect.appendChild(typeChoice);
        typeChoice.addEventListener("click", () => {
            if (i === 0) {
                let gameType = "pvp"
                let player1 = playerNaming("yourself", gameType);
            } else if (i === 1) {
                let gameType = "pve"
                let player1 = playerNaming("yourself", gameType);
                /*start a player vs computer game}*/
            }
        });
    };
}

const playerNaming = (player, gameType) => {
    let namePrompt = document.createElement("p")
    namePrompt.classList.add("prompt");
    namePrompt.textContent = `Please type a name for ${player}.`
    let inputField = document.createElement("input");
    inputField.classList.add("input");
    inputField.setAttribute("maxlength", "25");
    board.main.replaceChildren("");
    let nameSelect = document.createElement("div")
    nameSelect.classList.add("nameSelect");
    board.main.appendChild(nameSelect);
    nameSelect.appendChild(namePrompt);
    nameSelect.appendChild(inputField);
    inputField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            let name = inputField.value;
            if (name === "") {name = "the nameless king"};
            const player = Object.create(playerFactory(name));
            players.push(player);
            console.log(player.playerName);
            console.log(players);
            if (gameType === "ready") {
                board.startPvpGame();
                scoreMethods.initiateScore();
            };
            if (gameType === "pvp") {
                let player2 = playerNaming("your friend", "ready")
            } else if (gameType === "pve") {
                const computer = Object.create(playerFactory("Computer"));
                players.push(computer);
                startPveGame


            }
            
        };
    });
};

const gameLogic = (() => {
    const evaluateResult = (g) => {
        console.log(g);

        if ((("x" === g[0]) && ("x" === g[1]) && ("x" === g[2])) || (("x" === g[3]) && ("x" === g[4]) && ("x" === g[5])) || (("x" === g[6]) && ("x" === g[7]) && ("x" === g[8])) || (("x" === g[0]) && ("x" === g[3]) && ("x" === g[6])) || (("x" === g[1]) && ("x" === g[4]) && ("x" === g[7])) || (("x" === g[2]) && ("x" === g[5]) && ("x" === g[8])) || (("x" === g[0]) && ("x" === g[4]) && ("x" === g[8])) || (("x" === g[2]) && ("x" === g[4]) && ("x" === g[6]))) {
            let log = document.querySelector(".log");
            log.textContent = `The game is over. ${players[0].playerName} wins! Next game starts in 5 seconds`
            players[0].score += 1;
            return "over"
            
            //player 1 wins
        } else if ((("o" === g[0]) && ("o" === g[1]) && ("o" === g[2])) || (("o" === g[3]) && ("o" === g[4]) && ("o" === g[5])) || (("o" === g[6]) && ("o" === g[7]) && ("o" === g[8])) || (("o" === g[0]) && ("o" === g[3]) && ("o" === g[6])) || (("o" === g[1]) && ("o" === g[4]) && ("o" === g[7])) || (("o" === g[2]) && ("o" === g[5]) && ("o" === g[8])) || (("o" === g[0]) && ("o" === g[4]) && ("o" === g[8])) || (("o" === g[2]) && ("o" === g[4]) && ("o" === g[6]))) {
            let log = document.querySelector(".log");
            log.textContent = `The game is over. ${players[1].playerName} wins! Next game starts in 5 seconds`
            players[1].score += 1;
            return "over"
            //player 2 wins
        } else if ((g[0] && g[1] && g[2] && g[3] && g[4] && g[5] && g[6] && g[7] && g[8]) !== 0) {
            console.log("the game is a draw");
            let log = document.querySelector(".log");
            log.textContent = `The game is over. It's a draw! Next game starts in 5 seconds.`
            return "over"
            //declare draw
        } else {return};
    };
    return{evaluateResult}
})();

const scoreMethods = (() => {
    let initiateScore = () => {
        for (let i = 0; i < 2; i++) {
            let scoreboard = document.createElement("div");
            scoreboard.classList.add("scoreboard");
            let nameTag = document.createElement("p");
            nameTag.classList.add("nameTag")
            nameTag.textContent = players[i].playerName;
            let scoreValue = document.createElement("p");
            scoreValue.classList.add("scoreValue", `player${i}`);
            scoreValue.textContent = 0;
            scoreboard.append(nameTag, scoreValue);
            let body = document.querySelector("body");
            if (i === 0) {  body.prepend(scoreboard)} else if (i === 1) {body.append(scoreboard)};
        }};
    let updateScore = () => {
        for (let i = 0; i < 2; i++) {
            let scoreValue = document.querySelector(`.player${i}`);
            scoreValue.textContent = players[i].score;
        }};
    return {initiateScore, updateScore}
})();

mainMenu();
  


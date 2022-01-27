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
    let startPveGame = () => { //game against computer, must add a turn based system
            let gameStatus = "pve";
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
                        if (gameStatus !== "pve") {setTimeout(function() {board.startPvpGame()}, 5000);
                        } else {setTimeout(function() {board.startPveGame()}, 5000);
                        };
                    };
                    if (turn !== "end") {log.textContent = `It is ${players[turn].playerName}'s turn.`};
                    gameArea.replaceChildren("");
                    gameBoard.forEach((e, index) => {
                        let square = document.createElement("div");
                        square.classList.add("square");
                        gameArea.appendChild(square);
                            if (turn === "end") { //draws the final board when the game is over
                                if (gameBoard[index] === "x") {
                                    _addTic("×", square);
                                } else if (gameBoard[index] === ("o")) {
                                    _addTic("○", square);
                                } else {return};
                            } else if ((gameBoard[index] === 0) && (isPlayerTurn === true)){ //lets the player pick a square on his turn
                                square.addEventListener("click", () => {
                                    if (turn === 0) {
                                        gameBoard[index] = "x";
                                        if (gameLogic.evaluateResult(gameBoard) == "over") {
                                            _addTic("×", square);
                                            return renewSquareStatus("end");
                                        } else {
                                        isPlayerTurn = false;
                                        renewSquareStatus(1);
                                        };
                                    } else if (turn === 1) {
                                        gameBoard[index] = ("o");
                                        if (gameLogic.evaluateResult(gameBoard) == "over") {
                                            _addTic("○", square);
                                            return renewSquareStatus("end");
                                        } else {
                                        isPlayerTurn = false;
                                        renewSquareStatus(0);
                                        };
                                    };
                                });
                            } else if (gameBoard[index] === "x") { //these just draw the already picked squares during the game
                                _addTic("×", square);
                            } else if (gameBoard[index] === ("o")) {
                                _addTic("○", square);
                            };
                    });
                    /* inserting the check for the computer's play here*/
                    if ((isPlayerTurn === false) && (turn !== "end")) {
                        console.log("Ok, first this one:" + gameBoard);
                        let newBoard = computerThinking.computePlay(gameBoard, turn);
                        console.log("Then this one: " + newBoard)
                        gameBoard = newBoard;
                        setTimeout(() => {    
                            if (gameLogic.evaluateResult(gameBoard) == "over") {
                                renewSquareStatus("end");
                            } else {
                                isPlayerTurn = true;
                                if (turn === 0) {renewSquareStatus(1);
                                } else if (turn === 1) {
                                renewSquareStatus(0);
                                }
                            }
                        }, 2000);
                        
                    }   
            };
        if (Math.random() >= (1/2)) {var turn = 1; var isPlayerTurn = false} else {var turn = 0; var isPlayerTurn = true}
        renewSquareStatus(turn);

    }
    return {startPvpGame, startPveGame, main};
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
        else if (i === 1) {typeChoice.textContent = "Player vs Computer"};
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
                board.startPveGame();
                scoreMethods.initiateScore();


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
    const evaluateFuture = (g) => {
        if ((("x" === g[0]) && ("x" === g[1]) && ("x" === g[2])) || (("x" === g[3]) && ("x" === g[4]) && ("x" === g[5])) || (("x" === g[6]) && ("x" === g[7]) && ("x" === g[8])) || (("x" === g[0]) && ("x" === g[3]) && ("x" === g[6])) || (("x" === g[1]) && ("x" === g[4]) && ("x" === g[7])) || (("x" === g[2]) && ("x" === g[5]) && ("x" === g[8])) || (("x" === g[0]) && ("x" === g[4]) && ("x" === g[8])) || (("x" === g[2]) && ("x" === g[4]) && ("x" === g[6]))) {
            return "over"
            //player 1 wins
        } else if ((("o" === g[0]) && ("o" === g[1]) && ("o" === g[2])) || (("o" === g[3]) && ("o" === g[4]) && ("o" === g[5])) || (("o" === g[6]) && ("o" === g[7]) && ("o" === g[8])) || (("o" === g[0]) && ("o" === g[3]) && ("o" === g[6])) || (("o" === g[1]) && ("o" === g[4]) && ("o" === g[7])) || (("o" === g[2]) && ("o" === g[5]) && ("o" === g[8])) || (("o" === g[0]) && ("o" === g[4]) && ("o" === g[8])) || (("o" === g[2]) && ("o" === g[4]) && ("o" === g[6]))) {
            return "over"
            //player 2 wins
        } else if ((g[0] && g[1] && g[2] && g[3] && g[4] && g[5] && g[6] && g[7] && g[8]) !== 0) {
            return "over"
            //declare draw
        } else {return};
    };
    return{evaluateResult, evaluateFuture}
})();

const computerThinking = (() => {
    let computePlay =(gameBoard, turn) => {
        let correctTic;
        let playerTic;
        let foundAnswer = false
        let evaluationBoard = gameBoard
        if (turn === 0) {
            correctTic = "x"; 
            playerTic = "o";
            var specificCase = [0, 0, 0, 0, "o", 0, 0, 0, 0];
        } else if (turn === 1) {
            correctTic = "o"; 
            playerTic = "x";
            var specificCase = [0, 0, 0, 0, "x", 0, 0, 0, 0];
        };
        if (gameBoard.toString() === [0,0,0,0,0,0,0,0,0].toString()) {gameBoard[4] = correctTic; foundAnswer = true;};
        if (foundAnswer === true) {return gameBoard} else if (specificCase.toString() === gameBoard.toString()) {
            gameBoard[2] = correctTic;
            foundAnswer = true;
        };
        if (foundAnswer === true) {return gameBoard} else {    
            evaluationBoard.forEach((value, index) => {
                if (value === 0) {
                    evaluationBoard[index] = correctTic
                    if ((gameLogic.evaluateFuture(evaluationBoard) === "over") && (foundAnswer === false)) {
                        gameBoard[index] = correctTic;
                        foundAnswer = true;
                    } else {evaluationBoard[index] = 0};
                };
        })};
        if (foundAnswer === true) {return gameBoard} else {
            evaluationBoard.forEach((value, index) => {
            if (value === 0) {
                evaluationBoard[index] = playerTic
                if ((gameLogic.evaluateFuture(evaluationBoard) === "over") && (foundAnswer === false)) {
                    gameBoard[index] = correctTic;
                    foundAnswer = true;
                } else {evaluationBoard[index] = 0};
            };
            })};
        if (foundAnswer === true) {return gameBoard} else {
            let pick;
            let finalElement;
            if (turn === 0) {correctTic = "x"} else if (turn === 1) {correctTic = "o"};
                let freeSquares = gameBoard.filter((value) => {return value === 0}).length;
                let randomNum = Math.random();
                for (let i = 1; i <= freeSquares; i++) {
                    if (randomNum < (i / freeSquares)) {pick = i; break}
                };
            let count = 0
            console.log("are we still cool here?");
            let elementCount = 0
            gameBoard.forEach((value) => {
                elementCount += 1
                if (value === 0) {
                    count += 1;
                    if (count === pick) {return finalElement = (elementCount - 1);} else {return count};
                };
            });
            gameBoard[finalElement] = correctTic;
            return gameBoard;
        };

        
    };
    return {computePlay};
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
  


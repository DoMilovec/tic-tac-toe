const container = document.querySelector('.container');
const result = document.querySelector('.result');
const restartBtn = document.querySelector('#restartBtn');
const statusBar = document.querySelector('.statusBar');
const newRoundBtn = document.querySelector('#newRound');
const resetScore = document.querySelector('#resetScore');
const scoreForX = document.querySelector('.scoreForX');
const scoreForO = document.querySelector('.scoreForO');
const homeScreen = document.querySelector('.homeScreen');
const gameScreen = document.querySelector('.gameScreen');
const chooseGame = document.querySelector('.chooseGame');
const playPlayer = document.querySelector('#playPlayer');
const playComputer = document.querySelector('#playComputer');
let computerGame = false;
chooseGame.style.display = 'none';
gameScreen.style.display = 'none';

let gameOver = false;
let scoreX = 0;
let scoreO = 0;

homeScreen.addEventListener('click', () => {
    homeScreen.style.display = 'none';
    chooseGame.style.display = 'flex';
})

playPlayer.addEventListener('click', () => {
    setTimeout(() => {
        chooseGame.style.display = 'none';
        gameScreen.style.display = 'flex';
        game.startGame();
    }, 1000);
})

playComputer.addEventListener('click', () => {
    setTimeout(() => {
        chooseGame.style.display = 'none';
        gameScreen.style.display = 'flex';
        game.startGameComputer();
        computerGame = true;
    }, 1000);
})

const Gameboard = function () {
    let board = [];
    const cell = '';
    

    // draws empty board
    const drawBoard = function () {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push(cell);
            }
        }
    }

    // for console testing:
    // looks for coordinates of value 'n' and saves to array emptyCells
    const playX = function() {
        let emptyCells = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    emptyCells.push([i, j]);
                }
            }
        }
        // if emptyCells isnt 0 (if there are 'n' values), select random index in it
        // and save x and y coordinates with const [x, y] by randomizing emptyCells index
        // then update board with X on those x and y coordinates
        if (emptyCells.length > 0) {
            const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[x][y] = 'X';
        }
    }
    const playO = function() {
        let emptyCells = [];
        for (let i = 0 ; i < 3 ; i++){
            for (let j = 0 ; j < 3 ; j++) {
                if (board[i][j] === '') {
                    emptyCells.push([i, j]);
                }
            }
        }
        if (emptyCells.length > 0){
            const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            
            setTimeout(() => {
                board[x][y] = 'O';
                drawUi();
                const newMarkField = document.querySelector(`[data-row="${x}"][data-col="${y}"]`);
                if (newMarkField) {
                    newMarkField.classList.add('new-mark');
                }
                checkWin('O');
                checkWin('X');
                checkTie();
                scoreForX.textContent = `${player1.name}:` + ' ' + scoreX;
                scoreForO.textContent = `${player2.name}:` + ' ' + scoreO;
                statusBar.textContent = `${player1.name}'s turn (X)`;
            }, 1000); // delay for UI update to make sure it gets the new class
        }
    }

    // Win check function
    const checkWin = function(mark) {
        const winnerName = mark === 'X' ? player1.name : player2.name; // Identify the winner by mark

        const highlightCells = (cells) => { // add highlight for winning tiles, mark on each checkwin = true
            cells.forEach(([row, col]) => {
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                if (cell) {
                    cell.classList.add('highlight');
                }
            });
        };
        let winningCells = [];

        for (let i = 0; i < 3; i++) { // Check rows
            if (board[i].every(cell => cell === mark)) {

                winningCells = [[i, 0], [i, 1], [i, 2]];
                if (winningCells.length) {
                    highlightCells(winningCells);
                }

                console.log(`GAME OVER, ${winnerName} WINS IN A ROW !!!`);
                result.textContent = `${winnerName} wins the round!`;
                gameOver = true;
                statusBar.textContent = '';
                if(mark === 'X'){
                    scoreX++;
                } else if (mark === 'O'){
                    scoreO++;
                }
            }
        }
    
        for (let j = 0; j < 3; j++) { // Check columns
            if (board.every(row => row[j] === mark)) {

                winningCells = [[0, j], [1, j], [2, j]];
                if (winningCells.length) {
                    highlightCells(winningCells);
                }

                console.log(`GAME OVER, ${winnerName} WINS IN A COLUMN !!!`);
                result.textContent = `${winnerName} wins the round!`;
                gameOver = true;
                statusBar.textContent = '';
                if(mark === 'X'){
                    scoreX++;
                } else if (mark === 'O'){
                    scoreO++;
                }
            }
        }
    
        let mainDiagonalWin = true; // Check main diagonal
        for (let i = 0; i < 3; i++) {
            if (board[i][i] !== mark) {
                mainDiagonalWin = false;
                break;
            }
        }
        if (mainDiagonalWin) {

            winningCells = [[0, 0], [1, 1], [2, 2]];
            if (winningCells.length) {
                highlightCells(winningCells);
            }

            console.log(`GAME OVER, ${winnerName} WINS IN A MAIN DIAGONAL !!!`);
            result.textContent = `${winnerName} wins the round!`;
            gameOver = true;
            statusBar.textContent = '';
            if(mark === 'X'){
                scoreX++;
            } else if (mark === 'O'){
                scoreO++;
            }
        }
    
        let antiDiagonalWin = true; // Check anti diagonal
        for (let i = 0; i < 3; i++) {
            if (board[i][2 - i] !== mark) {
                antiDiagonalWin = false;
                break;
            }
        }
        if (antiDiagonalWin) {

            winningCells = [[2, 0], [1, 1], [0, 2]];
            if (winningCells.length) {
                highlightCells(winningCells);
            }

            console.log(`${winnerName} WINS IN AN ANTI DIAGONAL !!!`);
            result.textContent = `${winnerName} wins the round!`;
            gameOver = true;
            statusBar.textContent = '';
            if(mark === 'X'){
                scoreX++;
            } else if (mark === 'O'){
                scoreO++;
            }
        }
    }

    // Console.log when there is no empty spot left
    const checkTie = function() {
        if((board.every(cell => cell.every(index => index !== ''))) && (!gameOver)) {
            console.log('IT`S A TIE !!!');
            result.textContent = "It's a tie!"
            gameOver = true;
            statusBar.textContent = '';
        }
    }

    const getBoard = () => board;

    const drawUi = function() {
        container.innerHTML = '';
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
            const field = document.createElement('div');
            field.classList.add('field');
            field.dataset.row = rowIndex;
            field.dataset.col = colIndex;

            if (cell === 'X') {
                field.classList.add('x-mark'); // New class for X

            } else if (cell === 'O') {
                field.classList.add('o-mark'); // New class for O
 
            }
            
            container.appendChild(field);
            });
        });
    };
    
    let turnX = true;
    let moves = 0;
    container.addEventListener('click', (e) => {
        if(!gameOver){
            if (e.target.classList.contains('field')) {
                const row = e.target.dataset.row;
                const col = e.target.dataset.col;
                
                if (board[row][col] === '') {
                    const currentPlayer = turnX ? 'X' : 'O';
                    board[row][col] = currentPlayer; // puts mark at the spot
                    moves++;
                    turnX = !turnX;
                    drawUi();

                    // Add the 'new-mark' class to the newly placed mark
                    const newMarkField = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                    if (newMarkField) {
                            newMarkField.classList.add('new-mark');
                    }

                    if (moves === 1) {
                        newRoundBtn.style.visibility = 'visible';
                        resetScore.style.visibility = 'visible';
                    }
                    if(turnX){
                        statusBar.textContent = `${player1.name}'s turn (X)`;
                     } else if(!turnX){
                        statusBar.textContent = `${player2.name}'s turn (O)`;
                     }

                    if (!computerGame){
                        checkWin('O');
                        checkWin('X');
                        checkTie();
                        scoreForX.textContent = `${player1.name}:` + ' ' + scoreX;
                        scoreForO.textContent = `${player2.name}:` + ' ' + scoreO;
                    } else if (computerGame) {

                        if (!turnX) {
                            drawUi();
                            checkWin('O');
                            checkWin('X');
                            checkTie();
                            scoreForX.textContent = `${player1.name}:` + ' ' + scoreX;
                            scoreForO.textContent = `${player2.name}:` + ' ' + scoreO;
                                if(!gameOver){

                                playO();
                                drawUi();
                                const compNewMark = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                                if (compNewMark) {
                                        compNewMark.classList.add('new-mark');
                                }
                                checkWin('O');
                                checkWin('X');
                                checkTie();
                                turnX = true;
                                scoreForX.textContent = `${player1.name}:` + ' ' + scoreX;
                                scoreForO.textContent = `${player2.name}:` + ' ' + scoreO;
                                }
                        }
                    }
                }
            }} else {}
    });

    const resetGame = function () {
        drawBoard();
        drawUi();
        gameOver = false;
        // turnX = true;
        result.textContent = 'Game result : ';
        
        moves = 0;
    }

    const startGame = function() {
        container.textContent = '';
        newRoundBtn.style.visibility = 'hidden';
        resetScore.style.visibility = 'hidden';
        scoreForX.textContent = 'X starts first';
        scoreForO.textContent = '';
        result.textContent = '\xa0';
        statusBar.textContent = '';
        const player1NameInput = document.createElement('input');
        player1NameInput.setAttribute('maxlength', '6');
        player1NameInput.placeholder = 'P1 name';
        const confirmPlayer1NameBtn = document.createElement('button');
        confirmPlayer1NameBtn.classList.add('playerSelectButton');
        confirmPlayer1NameBtn.textContent = 'Confirm Player 1 Name (X)';
        container.appendChild(player1NameInput);
        container.appendChild(confirmPlayer1NameBtn);
        turnX = true;

        confirmPlayer1NameBtn.addEventListener('click', () => {
            const player1Name = player1NameInput.value;
            if (player1Name) {
                player1 = { name: player1Name, mark: 'X' }; // Default mark 'X' for Player 1
                player1NameInput.disabled = true;
                confirmPlayer1NameBtn.disabled = true;
                player1NameInput.style.display = 'none';
                confirmPlayer1NameBtn.style.display = 'none';
                // Now, prompt for Player 2's name
                const player2NameInput = document.createElement('input');
                player2NameInput.setAttribute('maxlength', '6');
                player2NameInput.placeholder = 'P2 name';
                const confirmPlayer2NameBtn = document.createElement('button');
                confirmPlayer2NameBtn.classList.add('playerSelectButtonTwo');
                confirmPlayer2NameBtn.textContent = 'Confirm Player 2 Name (O)';
                container.appendChild(player2NameInput);
                container.appendChild(confirmPlayer2NameBtn);

                confirmPlayer2NameBtn.addEventListener('click', () => {
                    const player2Name = player2NameInput.value;
                    if (player2Name) {
                        player2 = { name: player2Name, mark: 'O' }; // Default mark 'O' for Player 2
                        player2NameInput.disabled = true;
                        confirmPlayer2NameBtn.disabled = true;
                        player2NameInput.style.display = 'none';
                        confirmPlayer2NameBtn.style.display = 'none';
                        statusBar.textContent = `${player1.name} (X) vs. ${player2.name} (O)`;
                        scoreForX.textContent = '\xa0';
                        scoreForO.textContent = '';
                        setTimeout(() => {
                            resetGame();
                            statusBar.textContent = `${player1.name}'s turn (X)`;
                            result.textContent = '';
                            scoreForX.textContent = `${player1.name}:` + ' ' + scoreX;
                            scoreForO.textContent = `${player2.name}:` + ' ' + scoreO;
                            scoreX = 0;
                            scoreO = 0;
                          }, 2500);
                    }
                });
            }
        });
    }

    const startGameComputer = function() {
        container.textContent = '';
        newRoundBtn.style.visibility = 'hidden';
        resetScore.style.visibility = 'hidden';
        scoreForX.textContent = 'X starts first';
        scoreForO.textContent = '';
        result.textContent = '\xa0';
        statusBar.textContent = '';
        const player1NameInput = document.createElement('input');
        player1NameInput.setAttribute('maxlength', '6');
        player1NameInput.placeholder = 'P1 name';
        const confirmPlayer1NameBtn = document.createElement('button');
        confirmPlayer1NameBtn.classList.add('playerSelectButton');
        confirmPlayer1NameBtn.textContent = 'Confirm Your Name (X)';
        container.appendChild(player1NameInput);
        container.appendChild(confirmPlayer1NameBtn);
        turnX = true;

        confirmPlayer1NameBtn.addEventListener('click', () => {
            const player1Name = player1NameInput.value;
            if (player1Name) {
                player1 = { name: player1Name, mark: 'X' }; // Default mark 'X' for Player 1
                player1NameInput.disabled = true;
                confirmPlayer1NameBtn.disabled = true;
                player1NameInput.style.display = 'none';
                confirmPlayer1NameBtn.style.display = 'none';

                // Now, the computer's part
                    const player2Name = 'AI';
                    if (player2Name) {
                        player2 = { name: player2Name, mark: 'O' }; // Default mark 'O' for Computer
                        statusBar.textContent = `${player1.name} (X) vs. ${player2.name} (O)`;
                        scoreForX.textContent = '\xa0';
                        scoreForO.textContent = '';
                        setTimeout(() => {
                            resetGame();
                            statusBar.textContent = `${player1.name}'s turn (X)`;
                            result.textContent = '';
                            scoreForX.textContent = `${player1.name}:` + ' ' + scoreX;
                            scoreForO.textContent = `${player2.name}:` + ' ' + scoreO;
                            scoreX = 0;
                            scoreO = 0;
                          }, 2500);
                    }
            }
        });
    }

    const newRound = function() {
        resetGame();
    
        statusBar.textContent = turnX
            ? `${player1.name}'s turn (X)`
            : `${player2.name}'s turn (O)`;
    
        // Computer logic
        if (computerGame && !turnX) {
            setTimeout(() => {
                if (!gameOver) {
                    playO();
                    drawUi();
                    checkWin('O');
                    checkWin('X');
                    checkTie();
    
                    if (!gameOver) {
                        turnX = true; 
                        statusBar.textContent = `${player1.name}'s turn (X)`;
                    }
                }
            }, 1000);
        }
    }

    return { board, getBoard, playX, playO, checkWin, checkTie, drawUi, drawBoard, resetGame, startGame, newRound, startGameComputer }
}

// CONTROLLER
const gameController = function() {
    const board = Gameboard();
    const startGame = board.startGame;
    const startGameComputer = board.startGameComputer;
    const newRound = board.newRound;
    return { board, startGame, newRound, startGameComputer }
}
const game = gameController();

restartBtn.addEventListener('click', () => {
    homeScreen.style.display = 'flex';
    gameScreen.style.display = 'none';
    chooseGame.style.display = 'none';
    scoreX = 0;
    scoreO = 0;
    computerGame = false;
})

newRoundBtn.addEventListener('click', () => {
    game.newRound();
    result.textContent = '';
})

resetScore.addEventListener('click', () => {
    scoreX = 0;
    scoreO = 0;
    scoreForX.textContent = `${player1.name}:` + ' ' + scoreX;
    scoreForO.textContent = `${player2.name}:` + ' ' + scoreO;
})

console.log(game.board);
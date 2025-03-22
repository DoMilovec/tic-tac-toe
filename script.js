const container = document.querySelector('.container');
const result = document.querySelector('.result');
const startBtn = document.querySelector('#startBtn');
const statusBar = document.querySelector('.statusBar');
let gameOver = false;

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
            board[x][y] = 'O';
        }
    }

    // Win check function
    const checkWin = function(mark) {
        for (let i = 0 ; i < 3 ; i++){ // checks rows
                if (board[i].every(cell => cell === mark)) {
                   console.log(`GAME OVER, ${mark} WINS, ROW !!!`);
                   result.textContent = `Game result: ${mark} WINS IN A ROW !!!`
                   gameOver = true;
                }
        }
        for (let j = 0 ; j < 3 ; j++){ // checks collumns
            if (board.every(row => row[j] === mark)) {
               console.log(`GAME OVER, ${mark} WINS, COLUMN !!!`);
               result.textContent = `Game result: ${mark} WINS IN A COLUMN !!!`
               gameOver = true;
            }
        }
        let mainDiagonalWin = true; // checks main diagonal
        for (let i = 0 ; i < 3 ; i++) {
            if(board[i][i] !== mark) {
                mainDiagonalWin = false;
                break;
            }
        }
        if (mainDiagonalWin) {
            console.log(`GAME OVER, ${mark} WINS, MAIN DIAGONAL !!!`);
            result.textContent = `Game result: ${mark} WINS IN A MAIN DIAGONAL !!!`
            gameOver = true;
        }
        let antiDiagonalWin = true; // checks anti diagonal
        for (let i = 0 ; i < 3 ; i++) {
            if(board[i][2 - i] !== mark) {
                antiDiagonalWin = false;
                break;
            }
        }
        if (antiDiagonalWin) {
            console.log(`GAME OVER, ${mark} WINS, ANTI DIAGONAL !!!`);
            result.textContent = `Game result: ${mark} WINS IN AN ANTI DIAGONAL !!!`
            gameOver = true;
        }
    }

    // Console.log when there is no empty spot left
    const checkTie = function() {
        if(board.every(cell => cell.every(index => index !== ''))) {
            console.log('IT`S A TIE !!!');
            result.textContent = "Game result: It's a TIE !!!"
            gameOver = true;
        }
    }

    const getBoard = () => board;

    const drawUi = function() {
        container.innerHTML = '';
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const field = document.createElement('div');
                field.classList.add('field');
                field.textContent = cell; // Display content from this exact array index
                field.dataset.row = rowIndex; // Assign data attributes 
                field.dataset.col = colIndex; // to track the exact position
                container.appendChild(field);
            });
        });
    };
    
    let turnX = true;
    container.addEventListener('click', (e) => {
        if(!gameOver){
            if (e.target.classList.contains('field')) {
                const row = e.target.dataset.row;
                const col = e.target.dataset.col;
                
                if (board[row][col] === '') {
                    const currentPlayer = turnX ? 'X' : 'O';
                    board[row][col] = currentPlayer;
                    turnX = !turnX;
                    drawUi();
                    checkWin('O');
                    checkWin('X');
                    checkTie();
                }
            }} else {}
    });

    const resetGame = function () {
        drawBoard();
        drawUi();
        gameOver = false;
        turnX = true;
        result.textContent = 'Game result : ';
    }

    const startGame = function() {
        container.textContent = '';
        const player1NameInput = document.createElement('input');
        const confirmPlayer1NameBtn = document.createElement('button');
        confirmPlayer1NameBtn.textContent = 'Enter Player 1 Name';
        container.appendChild(player1NameInput);
        container.appendChild(confirmPlayer1NameBtn);

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
                const confirmPlayer2NameBtn = document.createElement('button');
                confirmPlayer2NameBtn.textContent = 'Enter Player 2 Name';
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
                        container.textContent = `Game starting! ${player1.name} (X) vs. ${player2.name} (O)`;
                        setTimeout(() => {
                            resetGame();
                          }, 3000);
                        
                    }
                });
            }
        });
    }

    return { board, getBoard, playX, playO, checkWin, checkTie, drawUi, drawBoard, resetGame, startGame}
}

// CONTROLLER
const gameController = function() {
    const board = Gameboard();
    const startGame = board.startGame;
    return { board, startGame }
}
const game = gameController();

startBtn.addEventListener('click', () => {
    game.startGame();
})

console.log(game.board);
const testConsole = function(){
    game.playX();
    game.playO();
    console.log(game.board);
    game.checkWin('O');
    game.checkWin('X');
    game.checkTie();
}
const container = document.querySelector('.container');

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
                }
        }
        for (let j = 0 ; j < 3 ; j++){ // checks collumns
            if (board.every(row => row[j] === mark)) {
               console.log(`GAME OVER, ${mark} WINS, COLUMN !!!`);
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
        }
    }

    // Console.log when there is no empty spot left
    const checkTie = function() {
        if(board.every(cell => cell.every(index => index !== 'n'))) {
            console.log('IT`S A TIE !!!');
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
    
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('field')) {
            const row = e.target.dataset.row;
            const col = e.target.dataset.col;
    
            if (board[row][col] === '') {
                board[row][col] = 'X';
                drawUi(); 
            } else {
                console.log(`Cell at [${row}, ${col}] is already occupied.`); //DEL LATER
            }
        }
    });

    drawBoard();
    return { board, getBoard, playX, playO, checkWin, checkTie, drawUi}
}

const gameController = function() {
    const board = Gameboard();
    const start = board.drawUi();

    return { board }
}

const game = Gameboard();
const controller = gameController();
console.log(game.board);
const testConsole = function(){
    game.playX();
    game.playO();
    console.log(game.board);
    game.checkWin('O');
    game.checkWin('X');
    game.checkTie();
}
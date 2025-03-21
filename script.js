const Gameboard = function () {
    let board = [];
    const cell = 'n';

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
                if (board[i][j] === 'n') {
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
                if (board[i][j] === 'n') {
                    emptyCells.push([i, j]);
                }
            }
        }
        if (emptyCells.length > 0){
            const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[x][y] = 'O';
        }
    }

    const checkWin = function() {
        for (let i = 0 ; i < 3 ; i++){
                if ((board[i][0] === 'X' && board[i][1] === 'X' && board[i][2]) === 'X') {
                   console.log('GAME OVER, X WINS, ROW !!!');
                }
        }
        for (let j = 0 ; j < 3 ; j++){
            if ((board[0][j] === 'X' && board[1][j] === 'X' && board[2][j]) === 'X') {
               console.log('GAME OVER, X WINS, COLUMN!!!');
            }
    }
    }

    drawBoard();
    return { board, playX, playO, checkWin }
}

const game = Gameboard();
console.log(game.board);
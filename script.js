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

    drawBoard();
    return { board, playX, playO, checkWin, checkTie}
}

const game = Gameboard();
console.log(game.board);
const testConsole = function(){
    game.playX();
    game.playO();
    console.log(game.board);
    game.checkWin('O');
    game.checkWin('X');
    game.checkTie();
}
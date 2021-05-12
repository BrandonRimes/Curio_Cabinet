let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
// board space replaced with current player's token
function CellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
// alternate between players
function ChangePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}
// winning shapes on board
const winCons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// check board for win or draw
function ResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCon = winCons[i];
        let a = gameState[winCon[0]];
        let b = gameState[winCon[1]];
        let c = gameState[winCon[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        gameActive = false;
        RestartGame();
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        gameActive = false;
        RestartGame();
        return;
    }
    ChangePlayer();
}
// check if clicked space is a valid move
function CellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    CellPlayed(clickedCell, clickedCellIndex);
    ResultValidation();
}
// restart game automatically
function RestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', CellClick));
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [6,3,0],
    [7,4,1],
    [8,5,2],
    [0,4,8],
    [6,4,2],
];
let options = ["","","","","","","","",""];
let game = false;
let currentPlayer = "X";

startGame();

function startGame() {
    game = true;
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame)
    statusText.textContent = `${currentPlayer}'s turn`;
}
function cellClicked() {
    const idx = this.getAttribute("cellIndex");
    
    if(options[idx]!="" || !game) {
        return;
    }
    
    updateCell(this,idx);
    checkWinner();
}
function updateCell(cell, idx) {
    options[idx] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer() {
    currentPlayer = (currentPlayer == "X")? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
    let won = false;
    for(let i=0; i<winConditions.length; i++) {
        const condition = winConditions[i];
        const cell0 = options[condition[0]];
        const cell1 = options[condition[1]];
        const cell2 = options[condition[2]];
        
        if(cell0=="" || cell1=="" || cell2=="") {
            continue;
        }

        if(cell0==cell1 && cell2==cell1) {
            won = true;
            break;
        }
    }
    if(won) {
        statusText.textContent = `${currentPlayer} wins!`;
        game = false;
    }
    else if(!options.includes("")) {
        statusText.textContent = `Draw!`;
        game = false;
    }
    else {
        changePlayer();
    }
}
function restartGame() {
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    game = true;
}
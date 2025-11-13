
    const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let xTurn = true;

function startGame() {
  xTurn = true;
  statusDisplay.textContent = "Vez do Jogador X";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  cell.textContent = xTurn ? 'X' : 'O';
  if (checkWin(xTurn ? 'X' : 'O')) {
    statusDisplay.textContent = `Jogador ${xTurn ? 'X' : 'O'} venceu!`;
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
    return;
  }
  if ([...cells].every(cell => cell.textContent)) {
    statusDisplay.textContent = "Empate!";
    return;
  }
  xTurn = !xTurn;
  statusDisplay.textContent = `Vez do Jogador ${xTurn ? 'X' : 'O'}`;
}

function checkWin(currentPlayer) {
  const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  return winPatterns.some(pattern => 
    pattern.every(idx => cells[idx].textContent === currentPlayer)
  );
}

restartButton.addEventListener('click', startGame);

startGame();
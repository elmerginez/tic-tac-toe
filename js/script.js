// Elementos del DOM
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-btn');
const boardElement = document.getElementById('game-board');
const resultModal = document.getElementById('result-modal');
const modalMessage = document.getElementById('modal-message');
const modalButtons = document.querySelectorAll('.modal-button');
const scoresElements = document.querySelectorAll('.score');
const turnDisplay = document.getElementById('turn');

// Variables de estado del juego
let currentPlayer = 'X';
let board = Array(9).fill('');
let gameInProgress = true;
let scores = { X: 0, ties: 0, O: 0 };

// Inicializa el juego y listeners
function init() {
    updateScores();
    cells.forEach((cell, index) => {
        cell.dataset.index = index;
        cell.addEventListener('click', handleClick);
    });
    resetButton.addEventListener('click', () => showModal('Se borrarán los puntajes!', true));
    modalButtons[1].addEventListener('click', hideModal);
}

// Actualiza las puntuaciones en el DOM
function updateScores() {
    const { X, ties, O } = scores;
    [X, ties, O].forEach((score, index) => {
        scoresElements[index].textContent = score;
    });
}

// Obtiene las coordenadas del centro de un elemento
function getCenterCoordinates(element) {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
    };
}

// Dibuja la línea ganadora
function drawWinningLine([start, , end]) {
    const startCell = getCenterCoordinates(cells[start]);
    const endCell = getCenterCoordinates(cells[end]);
    const boardRect = boardElement.getBoundingClientRect();

    const x1 = startCell.x - boardRect.left;
    const y1 = startCell.y - boardRect.top;
    const x2 = endCell.x - boardRect.left;
    const y2 = endCell.y - boardRect.top;

    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

    const winningLine = document.createElement('div');
    Object.assign(winningLine.style, {
        position: 'absolute',
        backgroundColor: 'red',
        zIndex: '1',
        left: `${Math.min(x1, x2)}px`,
        top: `${Math.min(y1, y2)}px`,
        width: `${length}px`,
        height: '5px',
        transformOrigin: '0 0',
        transform: `rotate(${angle}deg)`,
        borderRadius: '2px',
    });

    winningLine.classList.add('winning-line');
    boardElement.appendChild(winningLine);
}

/// Resalta los cuadros del ganador aplicando una clase CSS
function resaltWinner(pattern) {
    pattern.forEach(index => {
        cells[index].classList.add('highlight-winner');
    });
}

// Remueve el resalte de los cuadros ganadores
function removeResaltWinner() {
    cells.forEach(cell => {
        cell.classList.remove('highlight-winner');
    });
}


// Muestra el modal con mensaje
function showModal(message, resetAll = false) {
    modalMessage.textContent = message;
    resultModal.style.display = 'block';

    resetAll ? modalButtons[1].style.display = 'inline-block' : modalButtons[1].style.display = 'none'

    modalButtons[0].onclick = () => {
        hideModal();
        resetAll ? resetAllGame() : resetGame();
    };
}

// Oculta el modal
function hideModal() {
    resultModal.style.display = 'none';
}

// Verifica si hay un ganador o empate
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            resaltWinner(pattern)
            drawWinningLine(pattern);
            scores[currentPlayer]++;
            updateScores();
            showModal(`¡Ganador: ${currentPlayer}!`);
            gameInProgress = false;
            return;
        }
    }

    if (!board.includes('')) {
        scores.ties++;
        updateScores();
        showModal('¡Empate!');
        gameInProgress = false;
    }
}

// Maneja el clic en una celda
function handleClick(event) {
    if (!gameInProgress) return;

    const index = event.target.dataset.index;
    if (board[index]) return;

    board[index] = currentPlayer;
    event.target.innerHTML = `<img src="assets/icon/${currentPlayer.toLowerCase()}-icon.svg" alt="${currentPlayer}">`;

    checkWinner();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.textContent = `TURNO DE ${currentPlayer}`;
}

// Resetea el juego sin modificar el puntaje
function resetGame() {
    board.fill('');
    cells.forEach(cell => (cell.innerHTML = ''));
    currentPlayer = 'X';
    gameInProgress = true;
    removeWinningLine();
    removeResaltWinner()
}

// Resetea todo el juego incluyendo el puntaje
function resetAllGame() {
    resetGame();
    scores = { X: 0, ties: 0, O: 0 };
    updateScores();
}

// Remueve la línea ganadora del tablero
function removeWinningLine() {
    document.querySelectorAll('.winning-line').forEach(line => line.remove());
}

// Inicializa el juego
init();

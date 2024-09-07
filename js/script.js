class TicTacToe {
    constructor() {
        this.cells = document.querySelectorAll('.cell');
        this.resetButton = document.getElementById('reset-btn');
        this.boardElement = document.getElementById('game-board');
        this.resultModal = document.getElementById('result-modal');
        this.modalMessage = document.getElementById('modal-message');
        this.modalButtons = document.querySelectorAll('.modal-button');
        this.scoresElements = document.querySelectorAll('.score');
        this.turnDisplay = document.getElementById('turn');

        this.currentPlayer = 'X';
        this.board = Array(9).fill('');
        this.gameInProgress = true;
        this.scores = { X: 0, ties: 0, O: 0 };

        this.init();
    }

    init() {
        this.updateScores();
        this.cells.forEach((cell, index) => {
            cell.dataset.index = index;
            cell.addEventListener('click', (event) => this.handleClick(event));
        });
        this.resetButton.addEventListener('click', () => {
            this.showModal('Se borrarán los puntajes!', true);
        });
        this.modalButtons[1].addEventListener('click', () => this.hideModal());
    }

    updateScores() {
        this.scoresElements.forEach((element, index) => {
            element.textContent = Object.values(this.scores)[index];
        });
    }

    getCenterCoordinates(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };
    }

    drawWinningLine(winningPattern) {
        const [start, , end] = winningPattern;
        const startCell = this.getCenterCoordinates(this.cells[start]);
        const endCell = this.getCenterCoordinates(this.cells[end]);
        const boardRect = this.boardElement.getBoundingClientRect();

        const x1 = startCell.x - boardRect.left;
        const y1 = startCell.y - boardRect.top;
        const x2 = endCell.x - boardRect.left;
        const y2 = endCell.y - boardRect.top;

        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

        const winningLine = document.createElement('div');
        winningLine.classList.add('winning-line');
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
        });

        this.boardElement.appendChild(winningLine);
    }

    showModal(message, isReset = false) {
        this.modalMessage.textContent = message;
        this.resultModal.style.display = 'block';

        this.modalButtons[0].addEventListener('click', () => {
            this.hideModal();
            isReset ? this.resetAllGame() : this.resetGame();
        });
    }

    hideModal() {
        this.resultModal.style.display = 'none';
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.drawWinningLine(pattern);
                this.scores[this.board[a]]++;
                this.updateScores();
                this.showModal(`¡Ganador: ${this.board[a]}!`);
                this.gameInProgress = false;
                return;
            }
        }

        if (!this.board.includes('')) {
            this.scores.ties++;
            this.updateScores();
            this.showModal('¡Empate!');
            this.gameInProgress = false;
        }
    }

    handleClick(event) {
        if (!this.gameInProgress) return;

        const index = event.target.dataset.index;

        if (this.board[index] || !index) return;

        this.board[index] = this.currentPlayer;
        event.target.innerHTML = `<img src="assets/icon/${this.currentPlayer.toLowerCase}-icon.svg" alt="${this.currentPlayer}">`;

        this.checkWinner();
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.turnDisplay.textContent = `TURNO DE ${this.currentPlayer}`;
    }

    resetGame() {
        this.board.fill('');
        this.cells.forEach(cell => cell.innerHTML = '');
        this.currentPlayer = 'X';
        this.gameInProgress = true;
        this.removeWinningLine();
    }

    resetAllGame() {
        this.resetGame();
        this.scores = { X: 0, ties: 0, O: 0 };
        this.updateScores();
    }

    removeWinningLine() {
        document.querySelectorAll('.winning-line').forEach(line => line.remove());
    }
}

// Inicializar el juego
new TicTacToe();

document.addEventListener('DOMContentLoaded', () => {
    const gameGrid = document.getElementById('game-grid');
    const movesDisplay = document.getElementById('moves');
    const timerDisplay = document.getElementById('timer');
    const newGameBtn = document.getElementById('new-game');
    const congratsModal = document.querySelector('.congrats-modal');
    const finalMoves = document.getElementById('final-moves');
    const finalTime = document.getElementById('final-time');
    const playAgainBtn = document.getElementById('play-again');

    let cards = [];
    let flippedCards = [];
    let moves = 0;
    let timer = 0;
    let timerInterval;
    const cardValues = ['🎨', '🎮', '🎲', '🎸', '🎭', '🎪', '🎯', '🎱'];

    function initializeGame() {
        // Create pairs of cards
        const gameCards = [...cardValues, ...cardValues];
        // Shuffle cards
        gameCards.sort(() => Math.random() - 0.5);
        // Create card elements
        gameGrid.innerHTML = '';
        gameCards.forEach(value => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">${value}</div>
                    <div class="card-back">?</div>
                </div>
            `;
            card.addEventListener('click', () => flipCard(card, value));
            gameGrid.appendChild(card);
        });
    }

    function flipCard(card, value) {
        if (card.classList.contains('flipped') || flippedCards.length === 2) return;
        
        card.classList.add('flipped');
        flippedCards.push({ card, value });
        
        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            
            if (flippedCards[0].value === flippedCards[1].value) {
                flippedCards = [];
                checkWin();
            } else {
                setTimeout(() => {
                    flippedCards.forEach(({ card }) => card.classList.remove('flipped'));
                    flippedCards = [];
                }, 1000);
            }
        }
    }

    function checkWin() {
        const allCards = document.querySelectorAll('.card');
        const allFlipped = [...allCards].every(card => card.classList.contains('flipped'));
        if (allFlipped) {
            clearInterval(timerInterval);
            finalMoves.textContent = moves;
            finalTime.textContent = timer;
            congratsModal.classList.remove('hidden');
        }
    }

    function startTimer() {
        clearInterval(timerInterval);
        timer = 0;
        timerDisplay.textContent = timer;
        timerInterval = setInterval(() => {
            timer++;
            timerDisplay.textContent = timer;
        }, 1000);
    }

    function resetGame() {
        flippedCards = [];
        moves = 0;
        movesDisplay.textContent = moves;
        clearInterval(timerInterval);
        startTimer();
        initializeGame();
        congratsModal.classList.add('hidden');
    }

    newGameBtn.addEventListener('click', resetGame);
    playAgainBtn.addEventListener('click', resetGame);

    // Start initial game
    startTimer();
    initializeGame();
});
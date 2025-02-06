// Color palette (predefined set of colors)
const COLORS = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD",
    "#D4A5A5", "#9B59B6", "#3498DB", "#E74C3C", "#2ECC71",
    "#F1C40F", "#1ABC9C", "#D35400", "#C0392B", "#8E44AD",
    "#2980B9", "#27AE60", "#F39C12"
];

// Game state
let score = 0;
let correctColor = "";
let colorOptions = [];

// DOM elements
const scoreElement = document.getElementById('score');
const colorBox = document.getElementById('colorBox');
const gameStatus = document.getElementById('gameStatus');
const colorGrid = document.getElementById('colorGrid');
const newGameButton = document.getElementById('newGameButton');

// Generates a random color from the palette
function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Generate random colors for options, including the correct one
function generateColorOptions(correct) {
    const options = [correct];
    while (options.length < 6) {
        const newColor = getRandomColor();
        if (!options.includes(newColor)) {
            options.push(newColor);
        }
    }
    return shuffleArray(options);
}

// Handle color option click
function handleColorClick(clickedColor) {
    if (clickedColor === correctColor) {
        score++;
        scoreElement.textContent = score;
        gameStatus.textContent = "Correct! Well done! 🎉";
        gameStatus.className = "game-status correct";
        setTimeout(startNewGame, 1500);
    } else {
        gameStatus.textContent = "Wrong! Try again! 🤔";
        gameStatus.className = "game-status wrong";
    }
}

// Create color options buttons
function createColorButtons() {
    colorGrid.innerHTML = '';
    colorOptions.forEach(color => {
        const button = document.createElement('button');
        button.className = 'color-option';
        button.style.backgroundColor = color;
        button.onclick = () => handleColorClick(color);
        colorGrid.appendChild(button);
    });
}

// Start a new game
function startNewGame() {
    correctColor = getRandomColor();
    colorOptions = generateColorOptions(correctColor);
    colorBox.style.backgroundColor = correctColor;
    gameStatus.textContent = "";
    gameStatus.className = "game-status";
    createColorButtons();
}

// Reset game
function resetGame() {
    score = 0;
    scoreElement.textContent = score;
    startNewGame();
}

// Event listeners
newGameButton.addEventListener('click', resetGame);

// Initialize game
startNewGame();

//End of script.js
// All the possible winning states
const winningCombinations =
[
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
];

// Whether or not the current game is over
let gameOver = false;

// The state of each square on the board
// X = Player, O = Computer
let boardStates =
[
    '', '', '', // Row 1
    '', '', '', // Row 2
    '', '', '', // Row 3
];

let scorePlayer1 = 0;
let scoreTie = 0;
let scorePlayer2 = 0;

// Track who's turn it is (true = Player 1, false = Player 2)
let turn = true;

function onSquareClick(e)
{
    // If the game is over, reset the game
    if(gameOver)
    {
        resetGame();
        return;
    }

    // Fetch square element from event
    const squareElement = e.target;
    // Fetch index of square
    const index = parseInt(squareElement.dataset.index);

    // Return if clicked square is already occupied
    if(boardStates[index] !== '') return;

    if(turn)
    {
        // Update boardStates
        boardStates[index] = 'X';
        // Create cross element and append it to the square element
        updateSquare(squareElement, "cross");
    }
    else
    {
        // Update boardStates
        boardStates[index] = 'O';
        // Create cross element and append it to the square element
        updateSquare(squareElement, "naught");
    }

    // Change who's turn it is
    turn = !turn;
    updatePlayerTurnUI();

    validateBoard();
}

// Update a square with a cross or a naught (type)
function updateSquare(squareElement, type)
{
    const el = document.createElement("div");
    el.classList.add(type);
    squareElement.append(el);
}

// Highlight the Player text to let the player's know who's turn it is
function updatePlayerTurnUI()
{
    if(turn)
    {
        document.getElementById("scorePlayer2").parentElement.classList.remove("active");
        document.getElementById("scorePlayer1").parentElement.classList.add("active");
    }
    else
    {
        document.getElementById("scorePlayer1").parentElement.classList.remove("active");
        document.getElementById("scorePlayer2").parentElement.classList.add("active");
    }
}

// Check for a winner or a tie
function validateBoard()
{
    // Loop through all the winning states
    for(let i = 0; i < winningCombinations.length; i++)
    {
        const winningCombination = winningCombinations[i];

        // Fetch the 3 indices of the squares matching the winning combination
        const a = boardStates[winningCombination[0]];
        const b = boardStates[winningCombination[1]];
        const c = boardStates[winningCombination[2]];

        // Check if any of the winning squares haven't been selected - if so, continue the loop
        if(a === '' || b === '' || c === '') continue;

        // Check if the winning combo is a match
        if(a == b && b == c)
        {
            // If so, end the game
            gameOver = true;

            // If the winner is X (Player 1), show the game over screen in Player 1's favour
            if(a === 'X')
            {
                scorePlayer1++;
                showGameOverUI("PLAYER 1 WON");
            }
            // If the winner is O (Player 2), show the game over screen in Player 2's favour
            else
            {
                scorePlayer2++;
                showGameOverUI("PLAYER 2 WON");
            }

            // Break the loop as the game has been decided
            break;
        }
    }

    // Check if the board has any available squares
    if(!gameOver && !boardStates.includes(""))
    {
        // If not, it's a tie. Show the game over screen accordingly
        scoreTie++;
        showGameOverUI("IT'S A TIE");
    }

    // Update the score UI
    updateScoreUI();
}

// Update each of the score elements to display the current score for each player and ties
function updateScoreUI()
{
    document.getElementById("scorePlayer1").textContent = scorePlayer1;
    document.getElementById("scoreTie").textContent = scoreTie;
    document.getElementById("scorePlayer2").textContent = scorePlayer2;
}

// Unhide the game over element
function showGameOverUI(text)
{
    const gameOverElement = document.getElementById("gameOver");
    gameOverElement.textContent = text;
    gameOverElement.classList.remove("hidden"); 
}

// Reset the game
function resetGame()
{
    gameOver = false;

    // Reset the board state to the default
    boardStates = 
    [
        '', '', '', // Row 1
        '', '', '', // Row 2
        '', '', '', // Row 3
    ];

    // Remove each X and O child element from the board squares
    document.querySelectorAll(".square").forEach(removeChildren);

    // Hide the game over element
    document.getElementById("gameOver").classList.add("hidden");
}

// Add click event listener to each square element and pass event to onSquareClick function
document.querySelectorAll(".square").forEach(el => el.addEventListener("click", onSquareClick));

// Add click event listener to the gameOver element and reset the game on click
document.getElementById("gameOver").addEventListener("click", resetGame);
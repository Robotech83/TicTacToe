document.addEventListener("DOMContentLoaded", () => {
    // Select all the cell elements, the status display, and the reset button
    const cells = document.querySelectorAll(".cell");
    const statusDisplay = document.querySelector("#status");
    const resetButton = document.querySelector("#reset");
  
    // Initialize the current player as "X", an empty game state, and the game activity flag
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let isGameActive = true;
  
    // Define the winning conditions for the game
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
  
    // Helper function to update the status display message
    const updateStatusDisplay = message => statusDisplay.textContent = message;
  
    // Handle cell click events
    const handleCellClick = event => {
      const clickedCell = event.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));
  
      // If the cell is already filled or the game is inactive, do nothing
      if (gameState[clickedCellIndex] !== "" || !isGameActive) return;
  
      // Update the game state and cell content
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
  
      // Check if the current player has won or if the game is a draw
      if (checkWin()) {
        updateStatusDisplay(`Player ${currentPlayer} has won!`);
        isGameActive = false;
      } else if (!gameState.includes("")) {
        updateStatusDisplay("Game ended in a draw!");
        isGameActive = false;
      } else {
        // Switch to the next player and update the status display
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatusDisplay(`It's ${currentPlayer}'s turn`);
      }
    };
  
    // Check if there's a winning condition met
    const checkWin = () => {
      return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
      });
    };
  
    // Handle the game reset
    const handleRestartGame = () => {
      isGameActive = true;
      currentPlayer = "X";
      gameState.fill("");
      cells.forEach(cell => cell.textContent = "");
      updateStatusDisplay(`It's ${currentPlayer}'s turn`);
    };
  
    // Add event listeners to each cell and the reset button
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", handleRestartGame);
  
    // Initial status display update
    updateStatusDisplay(`It's ${currentPlayer}'s turn`);
  });
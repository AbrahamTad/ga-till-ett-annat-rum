function checkWinCondition() {
  const hasAll = REQUIRED_ITEMS.every((id) => gameState.inventory.includes(id));

  if (hasAll) {
    showEnding();
  }
}

// ======================
// initGame()
// ======================

function initGame() {
  // koppla knappar
  document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("intro").style.display = "none";
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Starta om spelet?")) {
      resetGame();
    }
  });

 

  // försök ladda sparat spel
  loadGame();

  // rendera första (eller laddade) rummet
  renderRoom();
}

// ======================
// Starta spelet
// ======================

document.addEventListener("DOMContentLoaded", initGame);

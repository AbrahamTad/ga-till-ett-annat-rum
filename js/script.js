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

  document.getElementById("save-btn").addEventListener("click", () => {
    saveGame();
    alert("Spelet har sparats.");
  });

  document.getElementById("load-btn").addEventListener("click", () => {
    loadGame();
    renderRoom();
    alert("Sparat spel har laddats (om det fanns).");
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Starta om spelet?")) {
      resetGame();
    }
  });

  const bg = document.getElementById("bg-music");
  bg.volume = 0.4;
  bg.play().catch(() => {});

  // försök ladda sparat spel
  loadGame();

  // rendera första (eller laddade) rummet
  renderRoom();
}

// ======================
// Starta spelet
// ======================

document.addEventListener("DOMContentLoaded", initGame);

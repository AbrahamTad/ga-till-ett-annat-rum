function checkWinCondition() {
  const hasAll = REQUIRED_ITEMS.every((id) => gameState.inventory.includes(id));
  if (hasAll) {
    showEnding();
  }
}

function initGame() {
  // 1️⃣ Create the intro + ending HTML dynamically
  if (window.createIntroAndEndingScreens) {
    createIntroAndEndingScreens();
  }

  // 2️⃣ Load saved game BEFORE showing anything
  loadGame();

  const introEl = document.getElementById("intro");
  const gameEl = document.getElementById("game");
  const endingEl = document.getElementById("ending");
  const startBtn = document.getElementById("start-btn");
  const playAgainBtn = document.getElementById("play-again-btn");
  const resetBtn = document.getElementById("reset-btn");

  // 3️⃣ Show intro first
  introEl.style.display = "flex";
  gameEl.style.display = "none";

  // 4️⃣ Start the game WITHOUT clearing save
  startBtn.addEventListener("click", () => {
    introEl.style.display = "none";
    gameEl.style.display = "block";
    renderRoom(); // Show saved items + saved room
  });

  // 5️⃣ Player won → "Spela igen" ONLY hides the winning screen!
  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", () => {
      endingEl.style.display = "none";
      gameEl.style.display = "block";

      // Very important: we DO NOT reset save
      renderRoom();
    });
  }

  // 6️⃣ Only "Nytt spel" clears the save file
  resetBtn.addEventListener("click", () => {
    if (confirm("Starta om spelet?")) {
      resetGame();
      renderRoom();
    }
  });

  // 7️⃣ Render saved state immediately
  renderRoom();
}

document.addEventListener("DOMContentLoaded", initGame);

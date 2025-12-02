/**
 * Nyckel i localStorage där spelet sparas.
 * @type {string}
 */
const SAVE_KEY = "roomGameWithImages_v1";

/**
 * Föremål som krävs för att vinna spelet.
 * @type {string[]}
 */
const REQUIRED_ITEMS = ["nyckel", "mynt", "fackla"];

/**
 * Startläge för spelet.
 */
const initialGameState = {
  currentRoomId: "hall",
  inventory: [], // lagrar item-id:n, t.ex. ["nyckel", "mynt"]
};

/**
 * Globalt spel-state.
 */
let gameState = { ...initialGameState };

/**
 * Kollar om spelaren har alla REQUIRED_ITEMS och visar slutskärmen i så fall.
 * @returns {void}
 */
function checkWinCondition() {
  const hasAll = REQUIRED_ITEMS.every((id) => gameState.inventory.includes(id));

  if (hasAll) {
    showEnding();
  }
}

/**
 * Sparar spelet till localStorage.
 * @returns {void}
 */
function saveGame() {
  try {
    const data = JSON.stringify(gameState);
    localStorage.setItem(SAVE_KEY, data);
    console.log("Spel sparat.");
  } catch (e) {
    console.error("Kunde inte spara spelet:", e);
  }
}

/**
 * Laddar spelet från localStorage om det finns.
 * @returns {void}
 */
function loadGame() {
  try {
    const data = localStorage.getItem(SAVE_KEY);
    if (!data) return; // inget sparat spel

    const parsed = JSON.parse(data);
    const rooms = window.rooms || {};

    // room
    if (parsed.currentRoomId && rooms[parsed.currentRoomId]) {
      gameState.currentRoomId = parsed.currentRoomId;
    } else {
      gameState.currentRoomId = initialGameState.currentRoomId;
    }

    // inventory
    if (Array.isArray(parsed.inventory)) {
      gameState.inventory = parsed.inventory;
    } else {
      gameState.inventory = [];
    }

    console.log("Spel laddat.");
  } catch (e) {
    console.error("Kunde inte ladda spelet:", e);
  }
}

/**
 * Återställer spelet till start-läget (hall + tom inventory).
 * OBS: vi ändrar samma objekt, vi skapar inte ett nytt.
 * @returns {void}
 */
function resetGame() {
  gameState.currentRoomId = initialGameState.currentRoomId;
  gameState.inventory = [];

  saveGame(); // sparar tomt läge
  renderRoom(); // ritar om rummet + uppdaterar inventory-UI
}

// Gör state/funktioner tillgängliga globalt
window.gameState = gameState;
window.SAVE_KEY = SAVE_KEY;
window.REQUIRED_ITEMS = REQUIRED_ITEMS;
window.checkWinCondition = checkWinCondition;
window.saveGame = saveGame;
window.loadGame = loadGame;
window.resetGame = resetGame;

/**
 * Nyckel i localStorage där spelet sparas.
 * @type {string}
 */
const SAVE_KEY = "roomGameWithImages_v1";

/**
 * Föremål som krävs för att vinna spelet.
 * (Extra föremål kan finnas, men dessa tre krävs.)
 * @type {string[]}
 */
const REQUIRED_ITEMS = ["nyckel", "mynt", "fackla"];

/**
 * Startläge för spelet.
 * @type {{ currentRoomId: string, inventory: string[] }}
 */
const initialGameState = {
  currentRoomId: "hall",
  inventory: [],
};

/**
 * Globalt spel-state (muteras, men ersätts aldrig).
 * @type {{ currentRoomId: string, inventory: string[] }}
 */
let gameState = { ...initialGameState };

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
    const roomsMap = rooms || {};

    if (parsed.currentRoomId && roomsMap[parsed.currentRoomId]) {
      gameState.currentRoomId = parsed.currentRoomId;
    } else {
      gameState.currentRoomId = initialGameState.currentRoomId;
    }

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
 * @returns {void}
 */
function resetGame() {
  gameState.currentRoomId = initialGameState.currentRoomId;
  gameState.inventory = [];
  saveGame();
}

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

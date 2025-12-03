/**
 * Visar ett toast-meddelande längst ner på skärmen.
 */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/**
 * Skapar intro- och vinnar-skärmarna dynamiskt.
 */
function createIntroAndEndingScreens() {
  // INTRO
  if (!document.getElementById("intro")) {
    const intro = document.createElement("div");
    intro.id = "intro";
    intro.className = "intro-screen";
    intro.innerHTML = `
      <div class="intro-box">
        <h2>Välkommen till Äventyrsrummet</h2>
        <p>
          Utforska rummen, samla föremål och ta dig vidare genom att göra val.
          Vissa dörrar är låsta, vissa föremål gömda… Lycka till!
        </p>
        <button id="start-btn">Börja spelet</button>
      </div>
    `;
    document.body.appendChild(intro);
  }

  // ENDING
  if (!document.getElementById("ending")) {
    const ending = document.createElement("div");
    ending.id = "ending";
    ending.className = "intro-screen";
    ending.style.display = "none";
    ending.innerHTML = `
      <div class="intro-box">
        <h2>🎉 Du vann spelet!</h2>
        <p>Grattis! Du har samlat alla föremål och klarat äventyret.</p>
        <button id="play-again-btn">Spela igen</button>
      </div>
    `;
    document.body.appendChild(ending);
  }
}

/**
 * Uppdaterar bakgrundsbild baserat på rum.
 */
function updateRoomBackground(roomId) {
  const inventory = window.gameState.inventory;

  if (roomId === "kitchen") {
    document.body.dataset.room = inventory.includes("nyckel")
      ? "kitchen_no_key"
      : "kitchen";
    return;
  }

  document.body.dataset.room = roomId;
}

/**
 * Ritar om inventory-UI.
 */
function updateInventoryUI() {
  const listEl = document.getElementById("inventory-list");
  const inventory = window.gameState.inventory;
  const items = window.items;

  listEl.innerHTML = "";

  if (inventory.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Ingenting ännu.";
    listEl.appendChild(li);
    return;
  }

  inventory.forEach((itemId) => {
    const itemInfo = items[itemId];
    if (!itemInfo) return;

    const li = document.createElement("li");
    li.classList.add("inventory-item");
    li.title = itemInfo.description;

    li.innerHTML = `
      <img src="${itemInfo.icon}" alt="${itemInfo.name}">
      <p>${itemInfo.name}</p>
    `;

    listEl.appendChild(li);
  });
}

/**
 * Visar vinnar-skärmen – gör INGA ändringar i state!
 */
function showEnding() {
  const endingEl = document.getElementById("ending");
  const introEl = document.getElementById("intro");
  const gameEl = document.getElementById("game");

  endingEl.style.display = "flex";
  introEl.style.display = "none";
  gameEl.style.display = "none";

 
}

// Export globally
window.createIntroAndEndingScreens = createIntroAndEndingScreens;
window.showEnding = showEnding;

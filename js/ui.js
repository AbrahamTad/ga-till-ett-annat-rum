/**
 * Visar ett toast-meddelande längst ner på skärmen.
 * @param {string} message
 * @returns {void}
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
 * Skapar intro- och vinnar-skärmarna dynamiskt om de inte redan finns.
 * @returns {void}
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
 * Sätter bakgrund baserat på rum + om nyckeln redan plockats.och basement-brigher room,after picking up torch.
 * @param {string} roomId
 * @returns {void}
 */
function updateRoomBackground(roomId) {
  const inventory = gameState.inventory;

  // Basement special case — brighter room after picking up torch
  if (roomId === "basement") {
    if (inventory.includes("fackla")) {
      document.body.dataset.room = "basement_lit";
    } else {
      document.body.dataset.room = "basement";
    }
    return;
  }

  // Kök – byt mellan kitchen och kitchen_no_key
  if (roomId === "kitchen") {
    document.body.dataset.room = inventory.includes("nyckel")
      ? "kitchen_no_key"
      : "kitchen";
    return;
  }

  // Standard case
  document.body.dataset.room = roomId;
}

/**
 * Ritar om inventory-listan i UI baserat på gameState.inventory.
 * @returns {void}
 */
function updateInventoryUI() {
  const listEl = document.getElementById("inventory-list");
  const inv = gameState.inventory;

  listEl.innerHTML = "";

  if (inv.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Ingenting ännu.";
    listEl.appendChild(li);
    return;
  }

  inv.forEach((itemId) => {
    const itemInfo = items[itemId];
    if (!itemInfo) return;

    const li = document.createElement("li");
    li.classList.add("inventory-item");
    li.title = itemInfo.description || itemInfo.name;

    const img = document.createElement("img");
    img.src = itemInfo.icon;
    img.alt = itemInfo.name;

    const label = document.createElement("p");
    label.textContent = itemInfo.name;

    li.appendChild(img);
    li.appendChild(label);
    listEl.appendChild(li);
  });
}

/**
 * Visar vinnar-skärmen och gömmer själva spelet.
 * @returns {void}
 */
function showEnding() {
  const endingEl = document.getElementById("ending");
  const gameEl = document.getElementById("game");
  const introEl = document.getElementById("intro");

  if (endingEl) endingEl.style.display = "flex";
  if (gameEl) gameEl.style.display = "none";
  if (introEl) introEl.style.display = "none";
}

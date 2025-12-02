/**
 * Visar ett toast-meddelande längst ner på skärmen.
 * @param {string} message - Texten att visa.
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
 * Sätter bakgrund baserat på rum + om nyckeln redan plockats.
 * @param {string} roomId - Id:t för rummet (t.ex. "hall", "kitchen").
 * @returns {void}
 */
function updateRoomBackground(roomId) {
  const inventory = window.gameState.inventory;

  // Kök – byt mellan kitchen och kitchen_no_key
  if (roomId === "kitchen") {
    if (inventory.includes("nyckel")) {
      document.body.dataset.room = "kitchen_no_key";
    } else {
      document.body.dataset.room = "kitchen";
    }
    return;
  }

  // Alla andra rum = standard
  document.body.dataset.room = roomId;
}

/**
 * Ritar om inventory-listan i UI baserat på gameState.inventory.
 * @returns {void}
 */
function updateInventoryUI() {
  const listEl = document.getElementById("inventory-list");
  const inventory = window.gameState.inventory;
  const items = window.items;

  listEl.innerHTML = "";

  // Tom inventory
  if (inventory.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Ingenting ännu.";
    listEl.appendChild(li);
    return;
  }

  // Visa varje item som ikon + namn
  inventory.forEach((itemId) => {
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
 * Visar vinnar-skärmen och gömmer spel & intro.
 * Pausar också bakgrundsmusiken.
 * @returns {void}
 */
function showEnding() {
  document.getElementById("ending").style.display = "flex";
  document.getElementById("intro").style.display = "none";
  document.getElementById("game").style.display = "none";
}

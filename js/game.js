/**
 * Renderar nuvarande rum (namn, beskrivning, knappar, inventory).
 * @returns {void}
 */
function renderRoom() {
  const room = rooms[gameState.currentRoomId];

  if (!room) {
    console.error("Okänt rum:", gameState.currentRoomId);
    return;
  }

  // Uppdatera bakgrund (använder inventory för nyckel/kök)
  updateRoomBackground(room.id);

  const roomNameEl = document.getElementById("room-name");
  const roomDescEl = document.getElementById("room-description");

  roomNameEl.textContent = room.name;
  roomDescEl.textContent = room.description;

  updateChoices(room);
  window.updateInventoryUI();
}

/**
 * Skapar knappar för alla val i ett rum.
 * @param {Object} room - Rummet som spelaren befinner sig i.
 * @returns {void}
 */
function updateChoices(room) {
  const choicesContainer = document.getElementById("choices");
  const inventory = window.gameState.inventory;

  choicesContainer.innerHTML = ""; // rensa gamla knappar

  room.choices.forEach((choice) => {
    // Göm val om spelaren redan har ett visst item
    if (choice.hideIfHasItem && inventory.includes(choice.hideIfHasItem)) {
      return;
    }

    const btn = document.createElement("button");
    btn.textContent = choice.text;

    btn.addEventListener("click", () => {
      window.playSound("click");
      handleChoice(choice);
    });

    choicesContainer.appendChild(btn);
  });
}

/**
 * Hanterar ett val (choice) när spelaren klickar på en knapp.
 * @param {Object} choice
 * @returns {void}
 */
function handleChoice(choice) {
  // Kolla om valet kräver ett föremål
  const gameState = window.gameState;
  if (
    choice.requiredItem &&
    !gameState.inventory.includes(choice.requiredItem)
  ) {
    showToast(choice.failureMessage || "Du saknar något för att göra detta.");
    return;
  }

  // Om valet ger ett föremål
  if (choice.addItem) {
    addToInventory(choice.addItem);
  }

  // Byt rum om vi inte ska stanna kvar
  if (!choice.stayInRoom && choice.targetRoom) {
    changeRoom(choice.targetRoom);
  } else {
    renderRoom();
  }
}

/**
 * Byter rum med fade-animation och sparar spelet.
 * @param {string} targetRoomId - Id:t för rummet att gå till.
 * @returns {void}
 */
function changeRoom(targetRoomId) {
  const rooms = window.rooms;
  const gameState = window.gameState;

  if (!rooms[targetRoomId]) {
    console.error("Okänt rum:", targetRoomId);
    return;
  }

  const gameEl = document.getElementById("game");

  // Starta fade-out
  gameEl.classList.add("is-fading");

  setTimeout(() => {
    // Byt rum när fade-out är klar
    gameState.currentRoomId = targetRoomId;
    window.saveGame();
    renderRoom();

    // Fade-in
    gameEl.classList.remove("is-fading");
  }, 300); // samma tid som i CSS
}

/**
 * Lägger till ett föremål i inventory och kollar vinstvillkor.
 * @param {string} itemId - Id:t för föremålet, t.ex. "nyckel".
 * @returns {void}
 */
function addToInventory(itemId) {
  const gameState = window.gameState;
  const items = window.items;

  if (!gameState.inventory.includes(itemId)) {
    gameState.inventory.push(itemId);

    const itemInfo = items[itemId];
    window.playSound("pickup");
    if (itemInfo) {
      window.showToast(`Du plockade upp ${itemInfo.name}!`);
    }

    window.saveGame();
    window.updateInventoryUI();

    // Använd globala vinst-kollen från state.js
    if (typeof window.checkWinCondition === "function") {
      window.checkWinCondition();
    }
  } else {
    console.log("Item finns redan:", itemId);
  }
}

// Gör renderRoom (och ev. andra) globala
window.renderRoom = renderRoom;
window.addToInventory = addToInventory;
window.changeRoom = changeRoom;
window.handleChoice = handleChoice;

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

  updateRoomBackground(room.id);

  const roomNameEl = document.getElementById("room-name");
  const roomDescEl = document.getElementById("room-description");

  roomNameEl.textContent = room.name;
  roomDescEl.textContent = room.description;

  updateChoices(room);
  updateInventoryUI();
}

/**
 * Skapar knappar för alla val i ett rum.
 * @param {Room} room
 * @returns {void}
 */
function updateChoices(room) {
  const choicesContainer = document.getElementById("choices");
  const inv = gameState.inventory;

  choicesContainer.innerHTML = "";

  room.choices.forEach((choice) => {
    if (choice.hideIfHasItem && inv.includes(choice.hideIfHasItem)) {
      return;
    }

    const btn = document.createElement("button");
    btn.textContent = choice.text;

    btn.addEventListener("click", () => {
      playSound("click");
      handleChoice(choice);
    });

    choicesContainer.appendChild(btn);
  });
}

/**
 * Hanterar ett val (choice) när spelaren klickar på en knapp.
 * @param {RoomChoice} choice
 * @returns {void}
 */
function handleChoice(choice) {
  // 1. Kräver valet ett föremål som spelaren inte har?
  if (
    choice.requiredItem &&
    !gameState.inventory.includes(choice.requiredItem)
  ) {
    const message =
      choice.failureMessage || "Du saknar något för att göra detta.";
    showToast(message); // 
    return;
  }

  // 2. Ger valet ett föremål?
  if (choice.addItem) {
    addToInventory(choice.addItem);
  }

  // 3. Byt rum eller stanna kvar
  if (!choice.stayInRoom && choice.targetRoom) {
    changeRoom(choice.targetRoom);
  } else {
    renderRoom();
  }
}


/**
 * Byter rum med fade-animation och sparar spelet.
 * @param {string} targetRoomId
 * @returns {void}
 */
function changeRoom(targetRoomId) {
  if (!rooms[targetRoomId]) {
    console.error("Okänt rum:", targetRoomId);
    return;
  }

  const gameEl = document.getElementById("game");
  gameEl.classList.add("is-fading");

  setTimeout(() => {
    gameState.currentRoomId = targetRoomId;
    saveGame();
    renderRoom();
    gameEl.classList.remove("is-fading");
  }, 300);
}

/**
 * Lägger till ett föremål i inventory och kollar vinstvillkor.
 * @param {string} itemId
 * @returns {void}
 */
function addToInventory(itemId) {
  if (!gameState.inventory.includes(itemId)) {
    gameState.inventory.push(itemId);

    const itemInfo = items[itemId];
    playSound("pickup");
    if (itemInfo) {
      showToast(`Du plockade upp ${itemInfo.name}!`);
    }

    saveGame();
    updateInventoryUI();
    checkWinCondition();
  } else {
    console.log("Item finns redan:", itemId);
  }
}

/**
 * Central controller för spelets livscykel och UI-händelser.
 */
const GameController = {
  introEl: null,
  gameEl: null,
  endingEl: null,
  startBtn: null,
  playAgainBtn: null,
  resetBtn: null,

  /**
   * Initierar spelet när DOM:en är laddad.
   * @returns {void}
   */
  init() {
    // Skapa intro- och ending-skärmar
    createIntroAndEndingScreens();

    this.introEl = document.getElementById("intro");
    this.gameEl = document.getElementById("game");
    this.endingEl = document.getElementById("ending");
    this.startBtn = document.getElementById("start-btn");
    this.playAgainBtn = document.getElementById("play-again-btn");
    this.resetBtn = document.getElementById("reset-btn");

    // Ladda sparat spel
    loadGame();

    // Rendera aktuell state (osynlig bakom intro)
    renderRoom();

    // Om sparfil finns → visa "Fortsätt spelet"
    const hasSave = !!localStorage.getItem(SAVE_KEY);
    this.startBtn.textContent = hasSave ? "Fortsätt spelet" : "Börja spelet";

    // Visa intro först
    this.introEl.style.display = "flex";
    this.gameEl.style.display = "none";

    // Koppla händelser
    this.startBtn.addEventListener("click", () => this.startGame());

    if (this.playAgainBtn) {
      this.playAgainBtn.addEventListener("click", () => this.playAgain());
    }

    if (this.resetBtn) {
      this.resetBtn.addEventListener("click", () => this.resetGame());
    }
  },

  /**
   * Startar eller fortsätter spelet från intro-skärmen.
   * @returns {void}
   */
  startGame() {
    this.introEl.style.display = "none";
    this.endingEl.style.display = "none";
    this.gameEl.style.display = "block";
    renderRoom();
  },

  /**
   * När spelaren klickar "Spela igen" på vinnar-skärmen.
   * @returns {void}
   */
  playAgain() {
    this.endingEl.style.display = "none";
    this.gameEl.style.display = "block";
    renderRoom(); // fortsätt med samma state
  },

  /**
   * Startar om spelet helt (enda stället där state rensas).
   * @returns {void}
   */
  // resetGame() {
  //   if (!confirm("Starta om spelet?")) return;

  //   resetGame(); // från state.js
  //   renderRoom();

  //   // Visa intro igen
  //   this.introEl.style.display = "flex";
  //   this.gameEl.style.display = "none";

  //   // Ändra knapptext tillbaka till "Börja spelet"
  //   this.startBtn.textContent = "Börja spelet";
  // },

  /**
   * Startar om spelet helt (enda stället där state rensas).
   * @returns {void}
   */
  resetGame() {
    const hasItems = gameState.inventory && gameState.inventory.length > 0;

    // Välj meddelande beroende på om spelaren har föremål
    const message = hasItems
      ? "Du har föremål i din ryggsäck. Vill du starta om? \n Allt sparat raderas."
      : "Vill du starta om spelet?";

    if (!confirm(message)) return;
    // Rensa state (från state.js)
    resetGame();

    // Rendera om
    renderRoom();

    // Visa intro igen
    this.introEl.style.display = "flex";
    this.gameEl.style.display = "none";

    // Ändra knapptext tillbaka till "Börja spelet"
    this.startBtn.textContent = "Börja spelet";
  },
};

document.addEventListener("DOMContentLoaded", () => GameController.init());

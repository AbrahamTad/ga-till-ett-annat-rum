/**
 * Item-objekt i spelet.
 * @typedef {Object} GameItem
 * @property {string} id
 * @property {string} name
 * @property {string} icon
 * @property {string} description
 */

/**
 * Alla föremål i spelet.
 * OBS: Lägg till motsvarande bilder i mappen images/
 * @type {Record<string, GameItem>}
 */
const items = {
  nyckel: {
    id: "nyckel",
    name: "Nyckel",
    icon: "images/key.png",
    description: "En gammal rostig nyckel från köket.",
  },
  fackla: {
    id: "fackla",
    name: "Fackla",
    icon: "images/torch.png",
    description: "En fackla som kan lysa upp mörka platser.",
  },
  mynt: {
    id: "mynt",
    name: "Guldmynt",
    icon: "images/coin.png",
    description: "Ett litet guldmynt. Kanske värt något?",
  },
  bok: {
    id: "bok",
    name: "Gammal bok",
    icon: "images/book.png", 
    description: "En gammal dammig bok med mystiska symboler.",
  },
  nyckelkort: {
    id: "nyckelkort",
    name: "Nyckelkort",
    icon: "images/keycard.png", 
    description: "Ett nyckelkort som verkar öppna något hemligt.",
  },
};

// js/items.js

/**
 * Item-objekt i spelet.
 * @type {Record<string, {id: string, name: string, icon: string, description: string}>}
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
};

// gör items tillgängligt globalt
window.items = items;

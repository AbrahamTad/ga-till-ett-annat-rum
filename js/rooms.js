

/**
 * @typedef {Object} RoomChoice
 * @property {string} text - Texten som visas på knappen.
 * @property {string} [targetRoom] - Id för rummet man går till.
 * @property {string} [requiredItem] - Item som krävs för att välja detta val.
 * @property {string} [failureMessage] - Meddelande om spelaren saknar item.
 * @property {string} [addItem] - Item-id som läggs till i inventory.
 * @property {boolean} [stayInRoom] - Om true stannar man i samma rum.
 * @property {string} [hideIfHasItem] - Dölj valet om spelaren redan har detta item.
 */

/**
 * @typedef {Object} Room
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {RoomChoice[]} choices
 */

/**
 * Alla rum i spelet.
 * @type {Record<string, Room>}
 */
const rooms = {
  hall: {
    id: "hall",
    name: "Hallen",
    description:
      "Du står i hallen. Det finns en dörr till köket och en dörr till vardagsrummet.",
    choices: [
      { text: "Gå till köket", targetRoom: "kitchen" },
      { text: "Gå till vardagsrummet", targetRoom: "livingRoom" },
    ],
  },

  kitchen: {
    id: "kitchen",
    name: "Köket",
    description: "Du är i köket. På bordet ligger en nyckel.",
    choices: [
      {
        text: "Ta nyckeln",
        addItem: "nyckel",
        stayInRoom: true,
        hideIfHasItem: "nyckel",
      },
      { text: "Gå tillbaka till hallen", targetRoom: "hall" },
    ],
  },

  livingRoom: {
    id: "livingRoom",
    name: "Vardagsrummet",
    description: "Du är i vardagsrummet. Här finns en låst dörr till källaren.",
    choices: [
      {
        text: "Försök öppna dörren till källaren",
        targetRoom: "basement",
        requiredItem: "nyckel",
        failureMessage: "Dörren är låst. Du behöver nyckeln från köket.",
      },
      {
        text: "Titta under soffan (kanske finns något där?)",
        addItem: "mynt",
        stayInRoom: true,
      },
      { text: "Gå tillbaka till hallen", targetRoom: "hall" },
    ],
  },

  basement: {
    id: "basement",
    name: "Källaren",
    description:
      "Du är i källaren. Det är mörkt, men du ser något glimma på golvet.",
    choices: [
      { text: "Plocka upp facklan", addItem: "fackla", stayInRoom: true },
      { text: "Gå upp till vardagsrummet", targetRoom: "livingRoom" },
    ],
  },
};



// gör tillgängligt globalt
window.rooms = rooms;

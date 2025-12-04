/**
 * @typedef {Object} RoomChoice
 * @property {string} text
 * @property {string} [targetRoom]
 * @property {string} [requiredItem]
 * @property {string} [failureMessage]
 * @property {string} [addItem]
 * @property {boolean} [stayInRoom]
 * @property {string} [hideIfHasItem]
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
      "Du står i hallen. Det finns en dörr till köket, en dörr till vardagsrummet och en dörr ut till trädgården.",
    choices: [
      { text: "Gå till köket", targetRoom: "kitchen" },
      { text: "Gå till vardagsrummet", targetRoom: "livingRoom" },
      { text: "Gå ut i trädgården", targetRoom: "garden" },
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
    description:
      "Du är i vardagsrummet. Här finns en låst dörr till källaren och en vindstrappa.",
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
        hideIfHasItem: "mynt",
      },
      {
        text: "Gå upp på vinden",
        targetRoom: "attic",
        requiredItem: "fackla",
        failureMessage: "Det är för mörkt på vinden. Du behöver en fackla.",
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
      {
        text: "Plocka upp facklan",
        addItem: "fackla",
        stayInRoom: true,
        hideIfHasItem: "fackla",
      },
      { text: "Gå upp till vardagsrummet", targetRoom: "livingRoom" },
      {
        text: "Använd nyckelkortet på den hemliga dörren",
        targetRoom: "secretRoom",
        requiredItem: "nyckelkort",
        failureMessage:
          "Dörren är låst med ett kortlås. Du saknar nyckelkortet.",
      },
    ],
  },

  garden: {
    id: "garden",
    name: "Trädgården",
    description:
      "Du står i en liten trädgård. Vid staketet ligger något nedtrampat i gräset.",
    choices: [
      {
        text: "Plocka upp nyckelkortet i gräset",
        addItem: "nyckelkort",
        stayInRoom: true,
        hideIfHasItem: "nyckelkort",
      },
      { text: "Gå tillbaka till hallen", targetRoom: "hall" },
    ],
  },

  attic: {
    id: "attic",
    name: "Vinden",
    description:
      "Du är på vinden. Med facklan tänd ser du en gammal kista i hörnet.",
    choices: [
      {
        text: "Öppna kistan och ta boken",
        addItem: "bok",
        stayInRoom: true,
        hideIfHasItem: "bok",
      },
      { text: "Gå ner till vardagsrummet", targetRoom: "livingRoom" },
    ],
  },

  secretRoom: {
    id: "secretRoom",
    name: "Hemligt rum",
    description:
      "Du har hittat ett hemligt rum fyllt med märkliga symboler. Här finns inget mer att ta – men du känner dig som en riktig äventyrare.",
    choices: [{ text: "Gå tillbaka till källaren", targetRoom: "basement" }],
  },
};

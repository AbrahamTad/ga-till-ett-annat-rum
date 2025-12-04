# Gå till ett annat rum, Interaktivt Äventyrsspel

Ett interaktivt textbaserat äventyr där du utforskar rum, samlar föremål, låser upp hemligheter och till slut hittar den dolda vägen ut!
Spelet är utvecklat som en skoluppgift och har sedan byggts ut med fler funktioner, rum, ljud, grafik och UI-effekter.

🔗 **Spela direkt:**
[https://abrahamtad.github.io/ga-till-ett-annat-rum/](https://abrahamtad.github.io/ga-till-ett-annat-rum/)

---

## Hur man spelar

- Läs texten i varje rum
- Klicka på knapparna för att:
  - Gå till andra rum
  - Samla föremål
  - Låsa upp dörrar
- Föremålen hamnar i din **ryggsäck**
- Utforska hela huset och samla allt du behöver för att vinna!

Spelet sparas automatiskt i webbläsaren.

---

## Funktioner

- Utforska flera rum (hallen, köket, vardagsrummet,
 källaren, vinden, trädgården, hemliga rummet)
- Samla föremål (nyckel, fackla, guldmynt, gammal bok, nyckelkort m.fl.)
- Dörrar som kräver rätt föremål för att kunna öppnas
- Fade-animationer vid rumsbyte
- Inventory med ikoner och pickup-animation
- Toast-meddelanden vid fel eller när man plockar upp ett föremål
- Ljudeffekter (klick, pickup, bakgrundsmusik)
- Spara/Ladda spelet med localStorage
- Automatisk uppstart: “Börja spel” / “Fortsätt spel”

### 🎒 Utökat föremålssystem (Inventory)

| Ikon | Föremål    | Funktion                 |
| ---- | ---------- | ------------------------ |
| 🔑   | Nyckel     | Låser dörrar             |
| 🔦   | Fackla     | Lyser upp mörka områden  |
| 📘   | Gammal bok | Hittas på vinden         |
| 💰   | Guldmynt   | Värdefullt föremål       |
| 🪪    | Nyckelkort | Krävs för Hemliga rummet |

### 🎵 Ljud

- Klickljud
- Pickup-ljud

### 💾 Spara / Ladda spelet

Spelet använder `localStorage` för att spara:

- Rumsposition
- Föremål i ryggsäcken

---

## 🧱 Projektstruktur

```bash
project-root/
│
├─ index.html            # Huvudfilen med spelgränssnitt & modaler
├─ styles.css            # UI, layout, animationer, bakgrunder
│
├─ js/
│  ├─ rooms.js           # Alla rum & val (RoomChoice)
│  ├─ items.js           # Samtliga föremål
│  ├─ state.js           # GameState + save/load/reset
│  ├─ ui.js              # Inventory, modal, toast, animationer
│  ├─ audio.js           # Musik & ljudeffekter
│  ├─ game.js            # Kärnlogik: renderRoom, val, inventory
│  └─ script.js          # GameController: init, events,
│
├─ images/               # Ikoner & bakgrundsbilder
└─ sounds/               # Musik & ljudeffekter
```

---

## ▶️ Kör projektet lokalt

### 1️⃣ Klona projektet

```bash
git clone https://github.com/abrahamtad/ga-till-ett-annat-rum.git
```

### 2️⃣ Gå in i projektmappen

```bash
cd ga-till-ett-annat-rum
```

### 3️⃣ Starta projektet (rekommenderat: Live Server i VS Code)

```bash
# Ingen extra installation behövs
# Öppna projektet i VS Code och kör med Live Server
```

---

## 🌐 Live-demo

👉 [https://abrahamtad.github.io/ga-till-ett-annat-rum/](https://abrahamtad.github.io/ga-till-ett-annat-rum/)

---

## 📘 Licens & användning

Detta projekt är skapat som en **skoluppgift** och får användas fritt för:

- Lärande
- Övning
- Personlig utveckling

Vill du förfina, forka eller bygga vidare på spelet?
**Gör det gärna, alla förbättringar är välkomna!**

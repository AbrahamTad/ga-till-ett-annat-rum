# Gå till ett annat rum

Det här är ett litet interaktivt textspel där du går runt mellan olika rum,
gör val och samlar saker som hjälper dig vidare.
Spelet är gjort som en del av min inlämningsuppgift.

## Hur man spelar

- Läs texten som visas på skärmen.
- Klicka på knapparna för att:
  - Gå vidare till olika rum.
  - Samla föremål.
  - Låsa upp nya vägar beroende på dina val.

## Funktioner
  - Utforska flera rum
  - Samla föremål (nyckel, mynt, fackla)
  - Dörrar som kräver rätt föremål
  - Fade-animationer vid rumsbyte
  - Inventory med ikoner

## 🗂️ Projektstruktur

```bash
project-root/
│
├─ index.html        # Huvud-HTML med spelgränssnitt
├─ styles.css        # All CSS (bakgrundsbilder, UI, layout)
│
├─ js/               # All JavaScript
│  ├─ rooms.js       # Alla rum & deras val (Room & RoomChoice)
│  ├─ items.js       # Databas över samtliga föremål
│  ├─ state.js       # GameState, save/load/reset, win logic
│  ├─ ui.js          # UI-hjälpare (inventory, bakgrund, ending)
│  ├─ audio.js       # Ljudhantering (musik, click, pickup)
│  ├─ game.js        # Kärnspelslogik (renderRoom, choices, inventory)
│  └─ script.js      # Startfil: initGame + DOM-event listeners
│
├─ images/           # Ikoner & bakgrundsbilder
└─ sounds/           # Musik & ljudeffekter


## Kör projektet lokalt

1. Klona repot:
   ```bash
   git clone https://github.com/AbrahamTad/ga-till-ett-annat-rum.git
   ```

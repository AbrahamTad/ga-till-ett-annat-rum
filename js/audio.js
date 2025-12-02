/**
 * Ljud-effekter som används i spelet.
 * @type {Record<string, HTMLAudioElement | null>}
 */
const sounds = {
  click: document.getElementById("sfx-click"),
  pickup: document.getElementById("sfx-pickup"),
};

/**
 * Spelar upp ett ljud
 * @param {string} name - Ljudets nyckel, t.ex. "click" eller "pickup".
 * @returns {void}
 */
function playSound(name) {
  const audio = sounds[name];
  if (!audio) return;
  audio.currentTime = 0; // börja om från början
  audio.play().catch(() => {
    // vissa browsers blockerar auto-play,
  });
}

// gör globalt
window.sounds = sounds;
window.playSound = playSound;

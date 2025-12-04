/**
 * Ljud-effekter som används i spelet.
 * @type {Record<string, HTMLAudioElement | null>}
 */
const sounds = {
  click: document.getElementById("sfx-click"),
  pickup: document.getElementById("sfx-pickup"),
};

/**
 * Spelar upp ett ljud om det finns definierat.
 * @param {string} name - "click" eller "pickup".
 * @returns {void}
 */
function playSound(name) {
  const audio = sounds[name];
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch(() => {
    // vissa browsers blockerar auto-play, inga problem.
  });
}

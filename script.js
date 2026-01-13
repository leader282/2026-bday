const bgVideo = document.getElementById("bgVideo");
const walkVideo = document.getElementById("walkVideo");

// Ensure bg video is paused initially
bgVideo.pause();

// =============================
// TIMEZONE HANDLING (IST)
// =============================
function getISTNow() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 5.5 * 60 * 60 * 1000);
}

const targetDate = new Date("2026-01-14T21:30:00");

// =============================
// COUNTDOWN LOGIC
// =============================
let celebrationStarted = false;

function updateTimer() {
  const nowIST = getISTNow();
  const diff = targetDate - nowIST;

  if (diff <= 0) {
    if (!celebrationStarted) {
      celebrationStarted = true;

      // 🎬 Hide walking video
      walkVideo.classList.add("hide");

      // 🧾 Hide main title
      const title = document.getElementById("mainTitle");
      title.classList.add("fade-out");

      // 🎵 Unmute + play bg video
      bgVideo.muted = false;
      bgVideo.currentTime = 0;

      const playPromise = bgVideo.play();

      // Handle autoplay restriction
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If blocked, show a tap-to-play hint
          showTapToPlay();
        });
      }

      // 🎉 Animated birthday message
      const timerBox = document.querySelector(".timer");
      timerBox.innerHTML = "";

      const msg = document.createElement("div");
      msg.className = "birthday-msg";
      msg.textContent = "Happy Birthday Baby 🥳";

      timerBox.appendChild(msg);

      // ⏳ Remove message after 2 seconds
      setTimeout(() => {
        msg.remove();
      }, 8000);
    }
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);

  document.getElementById("days").textContent =
    Math.floor(totalSeconds / (3600 * 24));
  document.getElementById("hours").textContent =
    Math.floor((totalSeconds % (3600 * 24)) / 3600);
  document.getElementById("minutes").textContent =
    Math.floor((totalSeconds % 3600) / 60);
  document.getElementById("seconds").textContent =
    totalSeconds % 60;
}

// =============================
// FALLBACK FOR AUTOPLAY BLOCK
// =============================
function showTapToPlay() {
  const hint = document.createElement("div");
  hint.textContent = "Tap to play 🎵";
  hint.style.cssText = `
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.6);
    color: white;
    font-size: 1.5rem;
    z-index: 9999;
    cursor: pointer;
  `;

  hint.addEventListener("click", () => {
    bgVideo.play();
    hint.remove();
  });

  document.body.appendChild(hint);
}

// Start timer
updateTimer();
setInterval(updateTimer, 1000);
// =============================
// 1. SET HER BIRTHDAY HERE
// =============================
// Format: YYYY-MM-DDTHH:MM:SS
// Example: 2026-04-18T00:00:00
const birthdayIST = "2026-01-14T00:00:00";

// =============================
// 2. VIDEO SHOULD BE PAUSED
// =============================
const video = document.getElementById("bgVideo");
video.pause();

// =============================
// 3. TIMEZONE HANDLING (IST)
// =============================
// IST = UTC + 5:30
function getISTNow() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 5.5 * 60 * 60 * 1000);
}

// Birthday in IST
const targetDate = new Date(birthdayIST);

// =============================
// 4. COUNTDOWN LOGIC
// =============================
function updateTimer() {
  const nowIST = getISTNow();
  const diff = targetDate - nowIST;

  if (diff <= 0) {
    document.querySelector(".timer").innerHTML =
      "<h2 style='color:#ffb6c1'>🎉 Happy Birthday My Love 🎉</h2>";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Initial call + update every second
updateTimer();
setInterval(updateTimer, 1000);
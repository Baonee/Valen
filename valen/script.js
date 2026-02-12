const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const photoContainer = document.getElementById("photoContainer");
const h1 = document.querySelector("h1");
const container = document.querySelector(".container");

const images = [
  "images/IMG_0134.JPG",
  "images/IMG_0792.JPG",
  "images/IMG_1544.JPG",
  "images/IMG_5802.JPG",
  "images/IMG_9701.JPG"
];

const messages = [
  "Are you sure? ",
  "Think again! ",
  "I know you want to! ",
  "Come on, say YES! ",
  "You didnt have a choice but YAY!"
];

let currentImg = 0;
let currentMsg = 0;
const usedPositions = [];

/* ================================
   IMAGE POSITIONING
================================ */
function getRandomPosition(width = 200, height = 200, margin = 10) {
  const containerRect = container.getBoundingClientRect();

  const maxX = window.innerWidth - width - margin;
  const maxY = window.innerHeight - height - margin;

  let x, y, attempts = 0;

  do {
    x = margin + Math.random() * (maxX - margin);
    y = margin + Math.random() * (maxY - margin);
    attempts++;
    if (attempts > 100) break;

  } while (
    usedPositions.some(pos =>
      !(x + width < pos.x ||
        x > pos.x + width ||
        y + height < pos.y ||
        y > pos.y + height)
    ) ||
    !(x + width < containerRect.left ||
      x > containerRect.right ||
      y + height < containerRect.top ||
      y > containerRect.bottom)
  );

  usedPositions.push({ x, y });
  return { x, y };
}

/* ================================
   NO BUTTON CLICK
================================ */
noBtn.addEventListener("click", () => {

  // Shake animation
  noBtn.classList.remove("shake");
  void noBtn.offsetWidth;
  noBtn.classList.add("shake");

  // Show image
  if (currentImg < images.length) {
    const img = document.createElement("img");
    img.src = images[currentImg];
    img.classList.add("photo");

    const pos = getRandomPosition();
    img.style.left = pos.x + "px";
    img.style.top = pos.y + "px";

    photoContainer.appendChild(img);
    currentImg++;
  }

  // Update message
  if (currentMsg < messages.length) {
    h1.textContent = messages[currentMsg];
    currentMsg++;
  }

  // Simple fade away after 5 clicks
  if (currentMsg >= 5) {
    noBtn.style.transition = "opacity 0.4s ease";
    noBtn.style.opacity = "0";

    setTimeout(() => {
      noBtn.style.display = "none";
    }, 400);
  }
});

/* ================================
   YES BUTTON CLICK
================================ */
yesBtn.addEventListener("click", () => {

  // Fade out photos
  document.querySelectorAll(".photo").forEach(photo => {
    photo.classList.add("fade-out");
  });

  // Fade container
  container.classList.add("fade-out");

  setTimeout(() => {
document.body.innerHTML = `
  <div style="
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    height:100vh;
    gap:40px;
    font-family: Arial, sans-serif;
  ">

    <!-- Text Card -->
    <div style="
      background: rgba(255,255,255,0.8);
      padding: 30px;
      border-radius: 20px;
      text-align:center;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      max-width: 400px;
    ">
      <h1 style="
        color: rgb(131,39,39);
        font-size: 2.5rem;
        font-family: Impact, sans-serif;
        margin-bottom: 10px;
      ">
        You clicked YES! 💖
      </h1>
      <p style="
        font-size: 1.2rem;
        color: #333;
      ">
        But for saying no, you will have to play this game
      </p>
    </div>

    <!-- Picture Card -->
    <div style="
      background: rgba(255,255,255,0.8);
      padding: 20px;
      border-radius: 20px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      display:flex;
      justify-content:center;
      align-items:center;
    ">
      <img src="https://cdn1.epicgames.com/offer/baa1163025994ae3b1cf3d425230e90a/EGS_Aimlabs_StateSpaceLabsInc_S1_2560x1440-822f084347a4e7190a312dd54b77f015" alt="Fun Image" style="
        max-width: 400px;
        border-radius: 15px;
        object-fit: cover;
      ">
    </div>

  </div>

  <!-- Button Below Cards -->
  <div style="text-align:center; margin-top: 500px;">
    <button id="planBtn" style="
      padding:14px 24px;
      font-size:1.2rem;
      border:none;
      border-radius:12px;
      background:#0099ff;
      color:white;
      cursor:pointer;
      transition:transform .15s ease;
    ">
      PLANS
    </button>
  </div>
`;


    initPlanButton();
  }, 900);
});

/* ================================
   AIMLAB STYLE PLAN BUTTON
================================ */
function initPlanButton() {
  const btn = document.getElementById("planBtn");
  const h1 = document.querySelector("h1");

  // --- Counter display ---
  const counterDisplay = document.createElement("div");
  counterDisplay.style.position = "fixed";
  counterDisplay.style.top = "10px";
  counterDisplay.style.right = "10px";
  counterDisplay.style.fontSize = "1.2rem";
  counterDisplay.style.fontFamily = "Arial, sans-serif";
  counterDisplay.style.color = "#fff";
  counterDisplay.style.background = "rgba(0,0,0,0.4)";
  counterDisplay.style.padding = "6px 12px";
  counterDisplay.style.borderRadius = "8px";
  counterDisplay.style.zIndex = "9999";
  counterDisplay.textContent = "Attempts: 0";
  document.body.appendChild(counterDisplay);

  // --- Give Up button ---
  const giveUpBtn = document.createElement("button");
  giveUpBtn.textContent = "Give Up";
  giveUpBtn.style.position = "fixed";
  giveUpBtn.style.top = "50px"; // below counter
  giveUpBtn.style.right = "10px";
  giveUpBtn.style.padding = "6px 12px";
  giveUpBtn.style.fontSize = "1rem";
  giveUpBtn.style.borderRadius = "8px";
  giveUpBtn.style.border = "none";
  giveUpBtn.style.cursor = "pointer";
  giveUpBtn.style.zIndex = "9999";
  giveUpBtn.style.background = "#ff4d6d";
  giveUpBtn.style.color = "#fff";
  document.body.appendChild(giveUpBtn);

  // Initial centered position
  const h1Rect = h1.getBoundingClientRect();
  btn.style.position = "fixed";
  btn.style.left = h1Rect.left + h1Rect.width / 2 - btn.offsetWidth / 2 + "px";
  btn.style.top = h1Rect.bottom + 200 + "px";

  // Track failed attempts
  let failCount = 0;
  const maxFails = 10;

  // Function to move button randomly but fully on-screen
  function moveButton() {
    const padding = 20;
    const maxX = window.innerWidth - btn.offsetWidth - padding;
    const maxY = window.innerHeight - btn.offsetHeight - padding;
    const x = padding + Math.random() * (maxX - padding);
    const y = padding + Math.random() * (maxY - padding);
    btn.style.left = x + "px";
    btn.style.top = y + "px";
  }

  // --- Mouse move handler for Aimlab effect ---
  let movementActive = true; // flag to control movement
  const mouseMoveHandler = (e) => {
    if (!movementActive) return; // stop moving if Give Up clicked

    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

    if (dist < 50) {
      failCount++;
      counterDisplay.textContent = `Attempts: ${failCount}`;

      if (failCount === maxFails) {
        alert("I'll make it easier for you babe.");
        btn.style.transform = "scale(1.5)";
        btn.style.transition = "transform 0.2s ease";
      }

      moveButton();
    }
  };

  document.addEventListener("mousemove", mouseMoveHandler);

  // --- Give Up button click ---
  giveUpBtn.addEventListener("click", () => {
    movementActive = false; // stop button from moving
    alert("I did not date a quitter!");
  });

  // Click finally shows the plans
btn.addEventListener("click", () => {
  alert(`You tried ${failCount} ${failCount === 1 ? "time" : "times"} means ${failCount} ${failCount === 1 ? "kiss" : "kisses"}`);

  // Clear the page
  document.body.innerHTML = "";

  // Set gradient background
  document.body.style.background = "linear-gradient(135deg, #ffadf4, #a997ad)";
  document.body.style.height = "100vh";
  document.body.style.margin = "0";
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";

  // Add your menu image
  const menuImg = document.createElement("img");
  menuImg.src = "images/menu.png"; // <-- your PNG file here
  menuImg.style.maxWidth = "90%";    // scales on smaller screens
  menuImg.style.height = "auto";
  menuImg.style.borderRadius = "15px"; // optional for style
  menuImg.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)"; // optional
  document.body.appendChild(menuImg);
});

}


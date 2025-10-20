// ===============================
// Bubble Sound Effect
// ===============================
const bubbleSound = new Audio('sounds/bubble-pop-283674.mp3');
bubbleSound.volume = 1.0; // test with max volume

function playBubble() {
  bubbleSound.currentTime = 0;
  bubbleSound.play()
    .then(() => console.log("✅ Sound played"))
    .catch(err => console.log("❌ Sound play blocked:", err));
}

// Preload/unlock sound on first touch
document.body.addEventListener('touchstart', () => {
  bubbleSound.play().then(() => {
    bubbleSound.pause();
    bubbleSound.currentTime = 0;
    console.log("🔓 Sound unlocked on mobile");
  }).catch(err => console.log("Unlock failed:", err));
}, { once: true });

// ===============================
// DOM Elements
// ===============================
const eraserBtn = document.getElementById('eraserBtn');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const popupYes = document.getElementById('popupYes');
const popupNo = document.getElementById('popupNo');

// ===============================
// Popup Functions
// ===============================
function showPopup() {
  popup.classList.add('show');
  overlay.classList.add('show');
  popup.setAttribute('aria-hidden', 'false');
}

function hidePopup() {
  popup.classList.remove('show');
  overlay.classList.remove('show');
  popup.setAttribute('aria-hidden', 'true');
}

// ===============================
// Event Listeners (mobile-friendly)
// ===============================
if (eraserBtn) {
  eraserBtn.addEventListener('click', e => {
    e.preventDefault();
    console.log("Eraser clicked");
    playBubble();
    showPopup();
  });
}

if (popupYes) {
  popupYes.addEventListener('click', e => {
    e.preventDefault();
    console.log("Yes clicked");
    playBubble();
    markers = [];
    saveMarkers();
    hidePopup();
    needsRedraw = true;
  });
}

if (popupNo) {
  popupNo.addEventListener('click', e => {
    e.preventDefault();
    console.log("No clicked");
    playBubble();
    hidePopup();
  });
}

if (overlay) {
  overlay.addEventListener('click', e => {
    e.preventDefault();
    console.log("Overlay clicked");
    hidePopup();
  });
}  popup.setAttribute('aria-hidden', 'false');
}

function hidePopup() {
  popup.classList.remove('show');
  overlay.classList.remove('show');
  popup.setAttribute('aria-hidden', 'true');
}

// ===============================
// Event Listeners (mobile-friendly)
// ===============================
if (eraserBtn) {
  eraserBtn.addEventListener('touchstart', e => {
    e.preventDefault();
    playBubble();   // 🔊 play sound
    showPopup();
  });
}

if (popupYes) {
  popupYes.addEventListener('touchstart', e => {
    e.preventDefault();
    playBubble();   // 🔊 play sound
    // Clear markers (assuming you have markers array and saveMarkers function)
    markers = [];
    saveMarkers();
    hidePopup();
    needsRedraw = true;
  });
}

if (popupNo) {
  popupNo.addEventListener('touchstart', e => {
    e.preventDefault();
    playBubble();   // 🔊 play sound
    hidePopup();
  });
}

if (overlay) {
  overlay.addEventListener('touchstart', e => {
    e.preventDefault();
    hidePopup();
  });
}      marker.style.top = ev.clientY - offsetY + "px";
    }

    function up(ev) {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      saveMarkers();
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  marker.addEventListener("dblclick", e => {
    e.stopPropagation();
    marker.remove();
    saveMarkers();
  });

  mapContainer.appendChild(marker);
  if (save) {
    markers.push({ x, y, color });
    saveMarkers();
  }
}

function saveMarkers() {
  const all = Array.from(document.querySelectorAll(".marker")).map(m => ({
    x: parseFloat(m.style.left),
    y: parseFloat(m.style.top),
    color: m.style.background
  }));
  localStorage.setItem("markers", JSON.stringify(all));
}

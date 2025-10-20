// ===============================
// Bubble Sound Effect
// ===============================
const bubbleSound = new Audio('sounds/bubble-pop-283674.mp3');
bubbleSound.volume = 0.8; // louder for mobile, adjust if needed

function playBubble() {
  bubbleSound.currentTime = 0; // restart from beginning
  bubbleSound.play().catch(err => {
    console.log("Sound play blocked:", err);
  });
}

// Preload sound on first user interaction (mobile browsers need this)
document.body.addEventListener('touchstart', () => {
  bubbleSound.play().then(() => {
    bubbleSound.pause();
    bubbleSound.currentTime = 0;
  }).catch(() => {});
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

const map = document.getElementById("map");
const mapContainer = document.getElementById("map-container");
const colorButtons = document.querySelectorAll(".color");
let selectedColor = "#ff0000";
let markers = JSON.parse(localStorage.getItem("markers") || "[]");

// بارگذاری مارکرهای ذخیره‌شده
markers.forEach(m => addMarker(m.x, m.y, m.color, false));

colorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedColor = btn.dataset.color;
  });
});

mapContainer.addEventListener("click", e => {
  const rect = mapContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  addMarker(x, y, selectedColor, true);
});

function addMarker(x, y, color, save) {
  const marker = document.createElement("div");
  marker.className = "marker";
  marker.style.background = color;
  marker.style.left = x + "px";
  marker.style.top = y + "px";

  marker.addEventListener("mousedown", e => {
    e.stopPropagation();
    let offsetX = e.clientX - marker.offsetLeft;
    let offsetY = e.clientY - marker.offsetTop;

    function move(ev) {
      marker.style.left = ev.clientX - offsetX + "px";
      marker.style.top = ev.clientY - offsetY + "px";
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
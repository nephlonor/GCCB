// Hole data extracted from the per-hole HTML files.
// Coordinates are in the original 210x700 canvas space.
const HOLES = {
  1:  { green: {x:114, y:77},  tees: { WHITE:{x:102,y:656}, YELLOW:{x:100,y:636}, BLUE:{x:98,y:615},  RED:{x:98,y:600}  }, holeLength: 315, pixelLength: 578 },
  2:  { green: {x:104, y:70},  tees: { WHITE:{x:80, y:657}, YELLOW:{x:82, y:639}, BLUE:{x:86, y:614}, RED:{x:91, y:587} }, holeLength: 447, pixelLength: 603 },
  3:  { green: {x:121, y:121}, tees: { WHITE:{x:90, y:578}, YELLOW:{x:93, y:556}, BLUE:{x:103,y:494}, RED:{x:83, y:456} }, holeLength: 203, pixelLength: 458 },
  4:  { green: {x:135, y:55},  tees: { WHITE:{x:127,y:650}, YELLOW:{x:120,y:630}, BLUE:{x:98, y:573}, RED:{x:98, y:573} }, holeLength: 397, pixelLength: 614 },
  5:  { green: {x:109, y:71},  tees: { WHITE:{x:94, y:650}, YELLOW:{x:93, y:605}, BLUE:{x:95, y:567}, RED:{x:93, y:543} }, holeLength: 381, pixelLength: 580 },
  6:  { green: {x:104, y:68},  tees: { WHITE:{x:84, y:657}, YELLOW:{x:90, y:632}, BLUE:{x:97, y:575}, RED:{x:99, y:562} }, holeLength: 510, pixelLength: 600 },
  7:  { green: {x:111, y:175}, tees: { WHITE:{x:95, y:587}, YELLOW:{x:93, y:546}, BLUE:{x:90, y:525}, RED:{x:81, y:496} }, holeLength: 131, pixelLength: 412 },
  8:  { green: {x:158, y:65},  tees: { WHITE:{x:169,y:649}, YELLOW:{x:152,y:611}, BLUE:{x:138,y:573}, RED:{x:125,y:540} }, holeLength: 355, pixelLength: 600 },
  9:  { green: {x:82,  y:63},  tees: { WHITE:{x:82, y:667}, YELLOW:{x:87, y:624}, BLUE:{x:75, y:572}, RED:{x:79, y:554} }, holeLength: 315, pixelLength: 602 },
  10: { green: {x:89,  y:66},  tees: { WHITE:{x:137,y:665}, YELLOW:{x:128,y:640}, BLUE:{x:109,y:596}, RED:{x:110,y:551} }, holeLength: 454, pixelLength: 601 },
  11: { green: {x:105, y:125}, tees: { WHITE:{x:83, y:626}, YELLOW:{x:105,y:603}, BLUE:{x:100,y:566}, RED:{x:100,y:533} }, holeLength: 185, pixelLength: 501 },
  12: { green: {x:72,  y:62},  tees: { WHITE:{x:61, y:643}, YELLOW:{x:93, y:604}, BLUE:{x:111,y:575}, RED:{x:101,y:503} }, holeLength: 350, pixelLength: 600 },
  13: { green: {x:61,  y:77},  tees: { WHITE:{x:54, y:637}, YELLOW:{x:67, y:612}, BLUE:{x:96, y:556}, RED:{x:104,y:542} }, holeLength: 387, pixelLength: 593 },
  14: { green: {x:154, y:80},  tees: { WHITE:{x:170,y:624}, YELLOW:{x:158,y:596}, BLUE:{x:138,y:553}, RED:{x:125,y:528} }, holeLength: 386, pixelLength: 569 },
  15: { green: {x:124, y:92},  tees: { WHITE:{x:101,y:650}, YELLOW:{x:100,y:631}, BLUE:{x:98, y:594}, RED:{x:97, y:581} }, holeLength: 302, pixelLength: 558 },
  16: { green: {x:105, y:136}, tees: { WHITE:{x:118,y:628}, YELLOW:{x:114,y:609}, BLUE:{x:110,y:553}, RED:{x:110,y:543} }, holeLength: 167, pixelLength: 490 },
  17: { green: {x:163, y:68},  tees: { WHITE:{x:89, y:646}, YELLOW:{x:80, y:601}, BLUE:{x:78, y:578}, RED:{x:72, y:536} }, holeLength: 415, pixelLength: 595 },
  18: { green: {x:64,  y:69},  tees: { WHITE:{x:80, y:661}, YELLOW:{x:98, y:607}, BLUE:{x:100,y:585}, RED:{x:120,y:548} }, holeLength: 549, pixelLength: 601 },
};

const TEE_COLORS = {
  WHITE:  '#ffffff',
  YELLOW: '#FFD700',
  BLUE:   '#87CEFA',
  RED:    '#ff3b30',
};

// Per-hole scorecard. Tee numbers map: 63=WHITE, 62=YELLOW, 58=BLUE, 55=RED.
const HOLE_INFO = {
  1:  { par: 4, hcp: 16, dist: { WHITE: 315, YELLOW: 305, BLUE: 295, RED: 287 } },
  2:  { par: 5, hcp:  8, dist: { WHITE: 447, YELLOW: 437, BLUE: 403, RED: 384 } },
  3:  { par: 3, hcp: 12, dist: { WHITE: 203, YELLOW: 193, BLUE: 176, RED: 149 } },
  4:  { par: 4, hcp:  2, dist: { WHITE: 397, YELLOW: 385, BLUE: 353, RED: 353 } },
  5:  { par: 4, hcp: 10, dist: { WHITE: 381, YELLOW: 359, BLUE: 329, RED: 309 } },
  6:  { par: 5, hcp:  4, dist: { WHITE: 510, YELLOW: 490, BLUE: 436, RED: 436 } },
  7:  { par: 3, hcp: 18, dist: { WHITE: 131, YELLOW: 119, BLUE: 113, RED: 102 } },
  8:  { par: 4, hcp:  6, dist: { WHITE: 355, YELLOW: 331, BLUE: 309, RED: 296 } },
  9:  { par: 4, hcp: 14, dist: { WHITE: 315, YELLOW: 299, BLUE: 270, RED: 258 } },
  10: { par: 5, hcp: 15, dist: { WHITE: 454, YELLOW: 438, BLUE: 412, RED: 391 } },
  11: { par: 3, hcp: 11, dist: { WHITE: 185, YELLOW: 175, BLUE: 167, RED: 159 } },
  12: { par: 4, hcp:  7, dist: { WHITE: 350, YELLOW: 328, BLUE: 306, RED: 274 } },
  13: { par: 4, hcp:  1, dist: { WHITE: 387, YELLOW: 367, BLUE: 330, RED: 330 } },
  14: { par: 4, hcp:  5, dist: { WHITE: 386, YELLOW: 372, BLUE: 353, RED: 331 } },
  15: { par: 4, hcp: 13, dist: { WHITE: 302, YELLOW: 292, BLUE: 273, RED: 266 } },
  16: { par: 3, hcp: 17, dist: { WHITE: 167, YELLOW: 159, BLUE: 141, RED: 141 } },
  17: { par: 4, hcp:  3, dist: { WHITE: 415, YELLOW: 384, BLUE: 367, RED: 339 } },
  18: { par: 5, hcp:  9, dist: { WHITE: 549, YELLOW: 497, BLUE: 479, RED: 445 } },
};

const TEE_NUMBERS = { WHITE: 63, YELLOW: 62, BLUE: 58, RED: 55 };

function updateHoleInfo() {
  const info = HOLE_INFO[currentHole];
  const parEl = document.getElementById('parVal');
  const hcpEl = document.getElementById('hcpVal');
  const distEl = document.getElementById('distVal');
  const teeEl = document.getElementById('distTee');
  if (!info || !parEl) return;
  parEl.textContent = info.par == null ? '—' : info.par;
  hcpEl.textContent = info.hcp == null ? '—' : info.hcp;
  const tee = teeboxSelect.value;
  const d = info.dist[tee];
  distEl.textContent = d == null ? '—' : `${d}m`;
  teeEl.textContent = `· ${TEE_NUMBERS[tee]} (${tee})`;
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// Hole coordinates were authored for a 210x700 canvas. The canvas
// element is 840x2800 internally for crisp rendering; SCALE maps the
// logical 210x700 space to the actual pixel buffer.
const COORD_W = 210;
const COORD_H = 700;
const SCALE = canvas.width / COORD_W; // 4
const sx = v => v * SCALE;
const teeboxSelect = document.getElementById('teeboxSelect');
const measurementModeSwitch = document.getElementById('measurementMode');
const holeSelect = document.getElementById('holeSelect');
const holeGrid = document.getElementById('holeGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const clearBtn = document.getElementById('clearBtn');
const nineTabs = document.getElementById('nineTabs');

let currentHole = parseInt(localStorage.getItem('gccb.hole')) || 1;
let currentNine = currentHole >= 10 ? 'back' : 'front';
let bgImage = null;
let bgLoaded = false;
let lastClick = null;
let firstPoint = null;

// Build hole dropdown
for (let i = 1; i <= 18; i++) {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = `Hole ${i}`;
  holeSelect.appendChild(opt);
}

function buildHoleGrid() {
  holeGrid.innerHTML = '';
  const start = currentNine === 'front' ? 1 : 10;
  for (let i = start; i < start + 9; i++) {
    const b = document.createElement('button');
    b.textContent = i;
    b.dataset.hole = i;
    if (i === currentHole) b.classList.add('active');
    b.addEventListener('click', () => selectHole(i));
    holeGrid.appendChild(b);
  }
}

function updateNineTabs() {
  nineTabs.querySelectorAll('button').forEach(b => {
    b.classList.toggle('active', b.dataset.nine === currentNine);
  });
}

function loadHole(n) {
  currentHole = n;
  currentNine = n >= 10 ? 'back' : 'front';
  localStorage.setItem('gccb.hole', n);
  holeSelect.value = n;
  updateNineTabs();
  buildHoleGrid();
  prevBtn.disabled = (n === 1);
  nextBtn.disabled = (n === 18);

  lastClick = null;
  firstPoint = null;
  bgLoaded = false;
  bgImage = new Image();
  bgImage.onload = () => { bgLoaded = true; redraw(); };
  bgImage.onerror = () => { bgLoaded = false; redraw(); };
  bgImage.src = `holes/loch${n}.png?v=9`;
  updateHoleInfo();
  redraw();
}

function selectHole(n) {
  if (n < 1 || n > 18) return;
  loadHole(n);
}

function drawPoint(point, color, size) {
  ctx.beginPath();
  ctx.arc(sx(point.x), sx(point.y), sx(size), 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = sx(1.2);
  ctx.stroke();
}

function drawLine(p1, p2, color, width) {
  ctx.beginPath();
  ctx.moveTo(sx(p1.x), sx(p1.y));
  ctx.lineTo(sx(p2.x), sx(p2.y));
  ctx.strokeStyle = color;
  ctx.lineWidth = sx(width);
  ctx.stroke();
}

function getDistance(p1, p2) {
  return Math.sqrt((p2.x-p1.x)**2 + (p2.y-p1.y)**2);
}

function getLength(p1, p2) {
  const hole = HOLES[currentHole];
  return getDistance(p1, p2) * (hole.holeLength / hole.pixelLength);
}

function drawLabel(text, x, y) {
  const fontPx = sx(14);
  ctx.font = `bold ${fontPx}px -apple-system, Helvetica, Arial`;
  const w = ctx.measureText(text).width;
  const padX = sx(3), padY = sx(2);
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.fillRect(sx(x) - padX, sx(y) - fontPx + padY, w + padX * 2, fontPx + padY);
  ctx.fillStyle = '#000';
  ctx.fillText(text, sx(x), sx(y));
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (bgLoaded && bgImage) {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = '#e8eef2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#9ab';
    ctx.font = `bold ${sx(18)}px -apple-system, Helvetica, Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(`Hole ${currentHole}`, canvas.width / 2, canvas.height / 2);
    ctx.textAlign = 'start';
  }
}

function drawTeeAndGreen() {
  // In point-to-point mode the green and tee markers are hidden so they
  // don't compete visually with the user's measurement.
  if (measurementModeSwitch.checked) return;
  const hole = HOLES[currentHole];
  const tee = hole.tees[teeboxSelect.value];
  drawPoint(hole.green, '#2ecc71', 9);
  drawPoint(tee, TEE_COLORS[teeboxSelect.value] || '#fff', 9);
}

function updateDisplay() {
  const hole = HOLES[currentHole];
  const ballColor = TEE_COLORS[teeboxSelect.value] || '#ffd54a';

  if (!measurementModeSwitch.checked) {
    if (!lastClick) return;
    const tee = hole.tees[teeboxSelect.value];
    drawLine(tee, lastClick, 'rgba(0,0,0,0.85)', 2.5);
    drawLine(hole.green, lastClick, 'rgba(0,0,0,0.85)', 2.5);
    drawPoint(lastClick, ballColor, 9);
    drawLabel(`${Math.round(getLength(hole.green, lastClick))}m`, lastClick.x + 12, lastClick.y);
    drawLabel(`${Math.round(getLength(tee, lastClick))}m`,        lastClick.x + 12, lastClick.y + 16);
  } else {
    if (firstPoint) drawPoint(firstPoint, ballColor, 9);
    if (lastClick) drawPoint(lastClick, ballColor, 9);
    if (firstPoint && lastClick) {
      drawLine(firstPoint, lastClick, 'rgba(0,0,0,0.85)', 2.5);
      drawLabel(`${Math.round(getLength(firstPoint, lastClick))}m`, lastClick.x + 12, lastClick.y + 10);
    }
  }
}

function redraw() {
  clear();
  drawTeeAndGreen();
  updateDisplay();
}

function getCanvasPoint(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = COORD_W / rect.width;
  const scaleY = COORD_H / rect.height;
  const pt = e.touches ? e.touches[0] : e;
  return {
    x: (pt.clientX - rect.left) * scaleX,
    y: (pt.clientY - rect.top) * scaleY
  };
}

// Hit radius (in logical 210x700 coords) for grabbing a placed dot.
const HIT_RADIUS = 16;

function hitTest(p) {
  // Returns the *user-placed* dot under the pointer, or null.
  // Tees and the green are intentionally not draggable.
  if (measurementModeSwitch.checked) {
    if (lastClick  && getDistance(lastClick,  p) <= HIT_RADIUS) return 'last';
    if (firstPoint && getDistance(firstPoint, p) <= HIT_RADIUS) return 'first';
  } else {
    if (lastClick  && getDistance(lastClick,  p) <= HIT_RADIUS) return 'last';
  }
  return null;
}

function placeTap(p) {
  if (measurementModeSwitch.checked) {
    if (!firstPoint) {
      // 1st tap: drop first point on its own.
      firstPoint = p;
      lastClick = null;
    } else if (!lastClick) {
      // 2nd tap: drop second point and reveal the measurement.
      lastClick = p;
    } else {
      // 3rd tap: restart with a fresh first point.
      firstPoint = p;
      lastClick = null;
    }
  } else {
    lastClick = p;
  }
  redraw();
}

// Pointer handling: single-finger drag of placed dots, single-finger
// tap to drop a new dot, horizontal swipe to change hole. Multi-touch
// is left alone so the browser can pinch-zoom.
let activePointers = 0;
let dragTarget = null;      // 'last' | 'first' | null
let downAt = null;          // { x, y, time } client coords of pointerdown
let moved = false;          // exceeded the tap threshold

canvas.addEventListener('pointerdown', (e) => {
  activePointers++;
  if (activePointers > 1) {
    // Pinch starting — abandon any drag in progress.
    dragTarget = null;
    downAt = null;
    return;
  }
  const p = getCanvasPoint(e);
  downAt = { x: e.clientX, y: e.clientY, time: Date.now() };
  moved = false;
  const hit = hitTest(p);
  if (hit) {
    dragTarget = hit;
    try { canvas.setPointerCapture(e.pointerId); } catch {}
    e.preventDefault();
  }
});

canvas.addEventListener('pointermove', (e) => {
  if (activePointers > 1) return;
  if (!downAt) return;
  const dx = e.clientX - downAt.x;
  const dy = e.clientY - downAt.y;
  if (!moved && Math.hypot(dx, dy) > 6) moved = true;
  if (!dragTarget) return;
  const p = getCanvasPoint(e);
  if (dragTarget === 'last')  lastClick = p;
  if (dragTarget === 'first') firstPoint = p;
  redraw();
  e.preventDefault();
});

function endPointer(e) {
  activePointers = Math.max(0, activePointers - 1);
  const wasDrag = !!dragTarget;
  dragTarget = null;
  if (!downAt) return;
  const dx = e.clientX - downAt.x;
  const dy = e.clientY - downAt.y;
  const dist = Math.hypot(dx, dy);
  const dt = Date.now() - downAt.time;
  downAt = null;
  if (wasDrag) return;
  if (!moved && dist < 10 && dt < 500) {
    placeTap(getCanvasPoint(e));
    return;
  }
  // Treat a clear horizontal flick as a hole-change swipe.
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    if (dx < 0 && currentHole < 18) selectHole(currentHole + 1);
    else if (dx > 0 && currentHole > 1) selectHole(currentHole - 1);
  }
}

canvas.addEventListener('pointerup', endPointer);
canvas.addEventListener('pointercancel', (e) => {
  activePointers = Math.max(0, activePointers - 1);
  dragTarget = null;
  downAt = null;
});

holeSelect.addEventListener('change', () => selectHole(parseInt(holeSelect.value)));
prevBtn.addEventListener('click', () => selectHole(currentHole - 1));
nextBtn.addEventListener('click', () => selectHole(currentHole + 1));
teeboxSelect.addEventListener('change', () => { updateHoleInfo(); redraw(); });
measurementModeSwitch.addEventListener('change', () => {
  firstPoint = null;
  lastClick = null;
  redraw();
});
clearBtn.addEventListener('click', () => {
  firstPoint = null;
  lastClick = null;
  redraw();
});

nineTabs.querySelectorAll('button').forEach(b => {
  b.addEventListener('click', () => {
    currentNine = b.dataset.nine;
    updateNineTabs();
    buildHoleGrid();
  });
});

loadHole(currentHole);

// First-visit welcome popup. Persisted in localStorage so it only ever
// shows once per device (until the user clears site data).
(function () {
  if (localStorage.getItem('gccb.seenWelcome')) return;
  const modal = document.getElementById('welcomeModal');
  const ok = document.getElementById('welcomeOk');
  if (!modal || !ok) return;
  modal.hidden = false;
  ok.addEventListener('click', () => {
    modal.hidden = true;
    localStorage.setItem('gccb.seenWelcome', '1');
  });
})();

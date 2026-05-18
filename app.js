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
  bgImage.src = `holes/loch${n}.png?v=3`;
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
  const hole = HOLES[currentHole];
  const tee = hole.tees[teeboxSelect.value];
  drawPoint(hole.green, '#2ecc71', 9);
  drawPoint(tee, TEE_COLORS[teeboxSelect.value] || '#fff', 9);
}

function updateDisplay(clickPos) {
  if (!clickPos) return;
  const hole = HOLES[currentHole];
  const tee = hole.tees[teeboxSelect.value];
  const ballColor = '#ffd54a';

  if (!measurementModeSwitch.checked) {
    drawLine(tee, clickPos, 'rgba(0,0,0,0.85)', 2.5);
    drawLine(hole.green, clickPos, 'rgba(0,0,0,0.85)', 2.5);
    drawPoint(clickPos, ballColor, 9);

    const approach = Math.round(getLength(hole.green, clickPos));
    const teeshot = Math.round(getLength(tee, clickPos));
    drawLabel(`${approach}m`, clickPos.x + 12, clickPos.y);
    drawLabel(`${teeshot}m`, clickPos.x + 12, clickPos.y + 16);
  } else {
    if (firstPoint && firstPoint !== clickPos) drawPoint(firstPoint, ballColor, 9);
    drawPoint(clickPos, ballColor, 9);
    if (firstPoint && firstPoint !== clickPos) {
      drawLine(firstPoint, clickPos, 'rgba(0,0,0,0.85)', 2.5);
      const distance = Math.round(getLength(firstPoint, clickPos));
      drawLabel(`${distance}m`, clickPos.x + 12, clickPos.y + 10);
    }
  }
}

function redraw() {
  clear();
  drawTeeAndGreen();
  updateDisplay(lastClick);
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

canvas.addEventListener('click', (e) => {
  const p = getCanvasPoint(e);
  if (measurementModeSwitch.checked) {
    if (!firstPoint) {
      // 1st click: mark first point, show it immediately.
      firstPoint = p;
      lastClick = p;
    } else if (!lastClick || lastClick === firstPoint) {
      // 2nd click: measure to first point.
      lastClick = p;
    } else {
      // 3rd click: start a new measurement from this point.
      firstPoint = p;
      lastClick = p;
    }
  } else {
    lastClick = p;
  }
  redraw();
});

holeSelect.addEventListener('change', () => selectHole(parseInt(holeSelect.value)));
prevBtn.addEventListener('click', () => selectHole(currentHole - 1));
nextBtn.addEventListener('click', () => selectHole(currentHole + 1));
teeboxSelect.addEventListener('change', redraw);
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

// Swipe between holes
let touchStartX = null;
let touchStartY = null;
canvas.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
}, { passive: true });
canvas.addEventListener('touchend', (e) => {
  if (touchStartX === null) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  touchStartX = touchStartY = null;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    if (dx < 0 && currentHole < 18) selectHole(currentHole + 1);
    else if (dx > 0 && currentHole > 1) selectHole(currentHole - 1);
  }
}, { passive: true });

loadHole(currentHole);

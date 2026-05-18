// Sponsor rotation for the bottom banner. Edit SPONSORS to change what
// shows up. Each entry can have an image (preferred) and/or a label;
// `href` is optional. Clicks open in a new tab.
//
// To switch to Google AdSense instead, delete this file's contents and
// inject the AdSense <script> in index.html's <head>, then put the
// <ins class="adsbygoogle"> slot inside #adSlot.

const SPONSORS = [
  {
    label: 'Your club sponsor here',
    img: 'assets/sponsor-placeholder.png',
    href: 'https://gccb.ch/',
  },
  // {
  //   label: 'Pro Shop',
  //   img: 'assets/sponsor-proshop.png',
  //   href: 'https://example.com/',
  // },
  // {
  //   label: 'Restaurant Clubhaus',
  //   img: 'assets/sponsor-restaurant.png',
  //   href: 'https://example.com/',
  // },
];

// How long each sponsor is shown, in milliseconds.
const ROTATE_MS = 8000;

(function () {
  const slot = document.getElementById('adSlot');
  if (!slot || !SPONSORS.length) return;

  let i = 0;
  function render() {
    const s = SPONSORS[i % SPONSORS.length];
    slot.innerHTML = '';
    const a = document.createElement('a');
    a.href = s.href || '#';
    if (s.href) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer sponsored';
    }
    if (s.img) {
      const img = document.createElement('img');
      img.src = s.img;
      img.alt = s.label || 'Sponsor';
      a.appendChild(img);
    }
    if (s.label && !s.img) {
      a.appendChild(document.createTextNode(s.label));
    }
    slot.appendChild(a);
    i++;
  }

  render();
  if (SPONSORS.length > 1) {
    setInterval(render, ROTATE_MS);
  }
})();

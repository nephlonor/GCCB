# GCCB Shot Tracker

iOS-friendly webapp for tracking shots on the Golf & Country Club Basel course.

## Features

- Interactive hole map for all 18 holes
- Tap to mark a shot — shows distance to green and distance from tee
- Point-to-point measurement mode
- Hole selector: Front 9 / Back 9 grid, dropdown, Prev/Next buttons, swipe gestures
- Teebox selection (WHITE / YELLOW / BLUE / RED)
- Dark-blue CI background, white GCCB shield logo
- Installable as iOS home-screen app (PWA)

## Structure

```
index.html              Main page
app.js                  Hole data + interaction logic
manifest.webmanifest    PWA manifest
assets/logo-white.png   GCCB shield (white)
icons/                  App icons (Apple touch icon, PWA icons, favicon)
holes/loch1.png..loch18.png   Per-hole background maps (placeholders)
```

## Replacing placeholder hole maps

The `holes/loch{N}.png` files are 210×700 placeholders. Replace each one
with the corresponding real hole map (same filename, same dimensions or
they'll be stretched to that aspect ratio).

## Running

It's a static site — open `index.html` in a browser or serve the folder:

```
python3 -m http.server 8000
```

On iOS Safari, use *Share → Add to Home Screen* to install as an app.

#  pranikasharma.com

A little scrapbook-style personal site — milestones, a photo gallery, art board, audio clips
("Little Voices"), an about section, and a guestbook — plus a separate password-protected
"Family Login" page for private content.

Live site: **https://www.pranikasharma.com**
Deployed from GitHub repo: **https://github.com/pranikashr/pranikasharma.com**

No build step, no package manager, no dependencies to install. It's plain HTML/CSS/JS —
open `index.html` in a browser and it works.

---

## 1. Project structure

```
pranikasharmadotcom/
├── index.html      → the public site (markup only)
├── style.css        → all styling for index.html
├── script.js        → all behavior for index.html (data arrays + interactivity)
├── parent.html       → standalone "Family Login" private page (self-contained)
├── photos/           → every image used by the site
│   ├── family-time.jpg
│   ├── festival.jpg
│   ├── music-time.jpg
│   ├── pranika-about.jpg
│   ├── pranika-avatar.jpg
│   └── pranika-hero.jpg
└── CNAME             → custom-domain config for GitHub Pages (lives on the deployed repo;
                         contains "www.pranikasharma.com" — see §4)
```

`index.html`, `style.css`, and `script.js` used to be one giant file; they were split so each
piece can be edited on its own without scrolling through thousands of lines.

`parent.html` is **not** split — it's intentionally one self-contained file (its own
`<style>`/`<script>`) so it can't accidentally break if `style.css`/`script.js` change, since
it guards more sensitive content. See §3.6.

---

## 2. How index.html is organized

The page is one scrolling document with a nav bar that jumps between `<section>`s:

| Nav button      | Section id       | What's in it |
|------------------|------------------|---------------|
| 🏠 Home          | `#home`          | Hero banner, profile card |
| 🏆 Milestones    | `#milestones`    | Vertical timeline of firsts (hardcoded HTML, see §3.3) |
| 📸 Gallery       | `#gallery`       | Auto-scrolling photo reel + clickable album tiles (see §3.1 / §3.2) |
| 🎨 Art           | `#art`           | "Pranika's Art Gallery" pinboard |
| 🔊 Little Voices | `#voices`        | Audio clip players (see §3.4) |
| 🧒 About         | `#about`         | Bio card with facts |
| 📓 Guestbook     | `#guestbook`     | Visitor messages (see §3.5) |
| 🔒 Family Login  | → `parent.html`  | Separate password-gated page (see §3.6) |

Scrolling/nav behavior, reveal animations, and the lightbox (the pop-up viewer when you click a
photo) all live in `script.js`.

Almost everything is data-driven: edit a JavaScript array near the top of `script.js` and the
matching tiles/cards are generated automatically. The one exception is the Milestones timeline,
which is written directly as HTML.

---

## 3. Things you'll probably want to modify

### 3.1 Add / change photos in the auto-scrolling reel (Gallery section)

In `script.js`, find `REEL_PHOTOS` (near the top):

```js
var REEL_PHOTOS = [
  { img: "photos/festival.jpg", pos: "center 20%", title: "Festival Days" },
  { img: "photos/family-time.jpg", pos: "center 25%", title: "Family Time" },
  ...
];
```

- Drop the new image file into `photos/` first.
- Add a line: `{ img: "photos/your-file.jpg", pos: "center", title: "Caption" }`.
- `pos` is the CSS `object-position` — adjust it (e.g. `"center 30%"`) if the photo gets
  cropped awkwardly.
- You can add as many as you like — the reel splits them across two rows automatically and
  loops seamlessly no matter the count.
- The reel pauses on hover (desktop) and on touch (mobile) automatically — no extra work needed.

### 3.2 Add / change an album tile (Gallery section)

Same file, find `ALBUMS`:

```js
var ALBUMS = [
  { img: "photos/festival.jpg", pos: "center 20%", emoji: "✨", bg: "...",
    title: "Festival Days!", sub: "all dressed up" },
  ...
  { emoji: "🛝", bg: "linear-gradient(135deg,#a7d8f0,#54b0e6)",
    title: "Playpark Fun!", sub: "swings & slides" }, // no img yet → shows an emoji tile
];
```

- Give it an `img` (+ optional `pos`) to show a real photo; omit `img` to show a placeholder
  emoji tile with a gradient background (handy before you have a real photo for that album).
- Add `count: "12"` to show a little "📷 12" badge on the tile.

### 3.3 Add a milestone (Milestones section)

This one is **not** data-driven — copy an existing block directly in `index.html` inside
`<section id="milestones">`. Each entry looks like:

```html
<div class="mrow left">
  <div class="mcard">
    <div class="mthumb" style="background: #d9f6e6">🦷</div>
    <div>
      <div class="mtype">First tooth</div>
      <div class="mt">A tiny pearly white!</div>
      <div class="md">add the date ✏️</div>
    </div>
  </div>
  <div class="node"></div>
</div>
```

- Alternate `mrow left` / `mrow right` so entries zig-zag down the timeline.
- Use `<div class="mthumb" style="background: #hexcolor">🎉</div>` for an emoji thumbnail, or
  swap it for a real `<img src="photos/..." loading="lazy">` (see the "First words" entry for
  an example).
- A new age bracket starts with an `<div class="agebadge aN"><span class="em">🎂</span><span class="lb">Age N</span></div>` block between rows.

### 3.4 Add a real audio clip (Little Voices section)

Each clip is a `<div class="voice" data-audio="">` in `index.html` — right now `data-audio` is
empty, so clicking play just shows a "add a recording" toast.

1. Put the audio file somewhere (e.g. a `clips/` folder next to `index.html`).
2. Set `data-audio="clips/your-clip.mp3"` on that card.
3. Update the title/duration text inside (`.vt` / `.vd`).

No JS changes needed — `script.js` already plays whatever `data-audio` points to.

### 3.5 Guestbook

- Seed/fallback messages (shown before any real wishes exist) are in `script.js` as `SEED`.
- Real visitor wishes are saved to the browser's `localStorage` **and**, if
  `GUESTBOOK_ENDPOINT` (also in `script.js`) is set to a Google Apps Script Web App URL, synced
  to that backend so everyone sees the same wishes and you get notified. That endpoint is
  already configured and live — don't delete it unless you're replacing it with a new one you
  control. The companion Apps Script code isn't part of this repo (only the public-facing
  fetch calls are) — it lives in your Google account's Apps Script project.

### 3.6 Family Login (`parent.html`)

A separate, self-contained private page linked from the "🔒 Family Login" button. It:

- Is password-protected client-side using PBKDF2 + AES (the encrypted content is embedded
  right in the HTML as a JSON blob).
- Is **not** a real server-side secure vault — anyone who knows/guesses the passphrase (or who
  is sophisticated enough to brute-force the client-side crypto) can unlock it. Good enough to
  keep casual visitors out of family photos/videos; don't treat it as bank-grade security.
- Has its own styles/script inline (deliberately not split out) so it stays a single portable
  file.

Open `parent.html` directly to set it up (first run offers to set a passphrase) or to change
its content.

### 3.7 Colors, fonts, spacing

All design tokens are CSS custom properties at the very top of `style.css`:

```css
:root {
  --cream: #fff6f7;
  --ink: #544b6b;
  --sky: #a7d8f0;
  --blush: #ffc2d6;
  ...
}
```

Change a value here and it updates everywhere that color/shadow is used. Fonts (Baloo 2 /
Caveat / Nunito) are loaded from Google Fonts in the `<head>` of `index.html`.

### 3.8 SEO / search engines

`index.html` has `<meta name="robots" content="noindex, nofollow" />` — the page is
intentionally hidden from search engines (anyone with the link can still open it). Remove that
line if you ever want it indexed.

---

## 4. Deploying to GitHub Pages (manual steps)

The live site is served by **GitHub Pages** from `https://github.com/pranikashr/pranikasharma.com`,
branch `main`, with a `CNAME` file in the repo root containing `www.pranikasharma.com` so the
custom domain keeps working. GitHub Pages rebuilds automatically within a minute or two of any
push to `main` — there's nothing to click or trigger manually beyond pushing.

### One-time setup (new machine / new clone)

```bash
git clone https://github.com/pranikashr/pranikasharma.com.git
cd pranikasharma.com
```

If you're working from an existing local copy whose `origin` points somewhere else, point it at
the live repo instead:

```bash
git remote set-url origin https://github.com/pranikashr/pranikasharma.com.git
# (or, to keep the old remote too: git remote add live https://github.com/pranikashr/pranikasharma.com.git)
```

You'll need **write access** to `pranikashr/pranikasharma.com` — ask the repo owner to add you
as a collaborator (Settings → Collaborators) if `git push` is rejected with a 403.

### Every time you make a change

```bash
# 1. Make your edits to index.html / style.css / script.js / parent.html / photos/

# 2. Preview locally before pushing (optional but recommended)
python3 -m http.server 8765
# then open http://localhost:8765/index.html in a browser

# 3. Stage and commit
git add index.html style.css script.js parent.html photos/
git commit -m "Describe what changed"

# 4. Push to GitHub — this is what triggers the live deploy
git push origin main
```

That's it — no build, no CI step. Within a minute or two, https://www.pranikasharma.com
reflects the new push.

### Things to double-check before pushing

- **Never remove the `CNAME` file** from the repo — without it, GitHub Pages will stop serving
  the site on `www.pranikasharma.com` (it'll fall back to the default `*.github.io` URL, or
  break entirely, until someone re-adds it).
- Keep `photos/` paths relative (`photos/filename.jpg`), not absolute — the site should work
  the same whether opened via `file://` or the live domain.
- `.DS_Store` (a macOS Finder junk file) sometimes shows up as a changed file on Mac — it's
  safe to leave uncommitted or add a `.gitignore` entry for `.DS_Store` if it keeps nagging you.

---

## 5. Local preview without deploying

Just open `index.html` directly in a browser (double-click it, or `open index.html` on macOS).
Everything works over `file://` since there's no backend. If a browser blocks something over
`file://` (rare, usually an audio/fetch quirk), serve it locally instead:

```bash
python3 -m http.server 8765
# visit http://localhost:8765/index.html
```

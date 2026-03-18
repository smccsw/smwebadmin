# Screenshots for "What you get" cards

The first card uses **thereparatory.gif** — an animated GIF that shows the site as you scroll. When the file is present, it plays in the mockup window.

## How to create the scroll GIF (thereparatory.co.uk)

1. **Pick a screen recorder that can export GIF**
   - **Windows:** [ScreenToGif](https://www.screentogif.com/) (free) — record, then File → Save as → GIF.
   - **Mac:** [Kap](https://getkap.co/) (free) — record, then export as GIF. Or [LICEcap](https://www.cockos.com/licecap/).
   - **Browser:** [ShareX](https://getsharex.com/) (Windows) can record and export GIF. Chrome extensions like "GIF Scrubber" or "Screen Recorder" can record and save as GIF.

2. **Set the viewport**
   - Open https://thereparatory.co.uk in your browser.
   - Resize the window to **~600px wide** (or use DevTools → device toolbar and set width to 600px). This matches the mockup.

3. **Record the scroll**
   - Start the recorder (capture the browser window only).
   - Smoothly scroll down the page from top to bottom (or a section you like). Keep it short (e.g. 3–8 seconds) so the GIF stays a reasonable size.
   - Stop the recording.

4. **Export as GIF**
   - Export/save as **GIF**. If the tool offers it, reduce frames or resolution to keep file size down (e.g. 5–10 fps, or reduce width to 600px).
   - Save as **`thereparatory.gif`** in this folder: `images/screenshots/`.

5. **If the GIF is too large**
   - Use [ezgif.com](https://ezgif.com/optimize) or similar to compress.
   - Or shorten the clip / lower frame rate / reduce dimensions.

**Recommended:** About **600×400** pixels, **3–6 seconds**, **~5 fps** — keeps the file under a few MB so it loads quickly.

---

## Fallback (static screenshot)

If you prefer a static image or don’t have a GIF yet:

- Add **thereparatory.jpg** (or .png) in this folder.
- In `index.html`, change the first card’s image `src` from `thereparatory.gif` to `thereparatory.jpg` (or `.png`).

If neither file exists, the card shows a text fallback (“The Reparatory” / “thereparatory.co.uk”) and the link still works.

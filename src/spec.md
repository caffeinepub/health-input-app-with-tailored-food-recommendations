# Specification

## Summary
**Goal:** Restore missing hero tiger decal decorations and make the header Play control reliably produce audible soundtrack playback with clear user-facing errors when playback fails.

**Planned changes:**
- Ensure the hero section in `frontend/src/App.tsx` loads and displays two tiger decal images from `/assets/generated/tiger-decal-left.dim_256x256.png` and `/assets/generated/tiger-decal-right.dim_256x256.png` on the initial (non-results) screen.
- Add a safe fallback so if a decal image fails to load, its image element is hidden (no broken-image UI is shown).
- Add/verify the required static tiger decal assets exist under `frontend/public/assets/generated/` with the exact filenames used by the app.
- Fix `frontend/src/components/SoundtrackControls.tsx` so clicking Play starts audible playback within ~1 second when allowed/unmuted, and the Play/Pause icon matches the actual playback state.
- If soundtrack playback fails (blocked/missing/etc.), show a clear English user-facing message (not console-only).
- Ensure the soundtrack file exists and is served as a frontend static asset from `/assets/audio/barrera-healthy-eats-theme.mp3` (placed at `frontend/public/assets/audio/barrera-healthy-eats-theme.mp3`).

**User-visible outcome:** On initial load, the hero shows two subtle tiger decal decorations without broken-image placeholders, and the header Play button starts the background music (or shows a clear message if audio can’t be played).

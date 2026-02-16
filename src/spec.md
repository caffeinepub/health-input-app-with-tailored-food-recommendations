# Specification

## Summary
**Goal:** Add an in-app English/Spanish language toggle and translate all frontend UI chrome/static strings into Spanish, with the choice persisted across refreshes.

**Planned changes:**
- Add a language toggle control on both the input (form) screen and the results screen, showing a button labeled exactly “Cambiar A Español” when English is active and a separate visible control to switch back to English when Spanish is active.
- Implement a simple local (in-code) localization mechanism and replace hard-coded user-facing UI strings with English/Spanish variants across `frontend/src/App.tsx`, `frontend/src/components/HealthInputForm.tsx`, `frontend/src/components/ResultsView.tsx`, and `frontend/src/components/SoundtrackControls.tsx`.
- Persist the selected language in local storage and safely default to English if storage is unavailable/errors occur.
- Ensure backend-provided recommendation/recipe content is not automatically translated and continues rendering unchanged when toggling languages.

**User-visible outcome:** Users can switch the app UI between English and Spanish from either the form screen or results screen without refreshing, and their language preference remains after a page reload.

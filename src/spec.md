# Specification

## Summary
**Goal:** Let users enter basic health inputs and receive tailored food recommendations with brief explanations.

**Planned changes:**
- Build a single-backend API endpoint that accepts age, weight, health conditions, and systolic/diastolic blood pressure, and returns a deterministic typed list of recommended foods (name + explanation) with user-friendly validation errors.
- Implement backend recommendation logic using condition keywords and blood-pressure categories (low/normal/elevated/high), including safe default recommendations and a note for unrecognized conditions.
- Create a frontend health input form (Age, Weight, Systolic BP, Diastolic BP, Sicknesses/Health conditions) with client-side validation and a primary button labeled exactly “Search Foods”.
- Add a results view that displays recommendations as readable list/cards, includes a clear disclaimer that it’s not medical advice, and allows users to go back/edit inputs.
- Apply a cohesive health/nutrition visual theme (not primarily blue/purple) across the app.
- Add generated static images under `frontend/public/assets/generated` and reference them via static paths from the frontend (no backend image hosting).

**User-visible outcome:** Users can enter their age, weight, conditions, and blood pressure, click “Search Foods”, and see a themed results page listing recommended foods with explanations and a visible not-medical-advice disclaimer, with an option to edit inputs.

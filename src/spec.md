# Specification

## Summary
**Goal:** Ensure food recommendations are never empty after deployment, improve allergy handling (including a “No allergies” option), and make health condition selection easier with a broad built-in list.

**Planned changes:**
- Seed the backend’s in-canister recipe database with a built-in set of real dishes so recommendations are available immediately after deployment.
- Make backend allergy filtering case-insensitive and ensure an empty allergies list disables allergen filtering.
- Add a “No allergies” option in the Allergies UI that clears selected/typed allergies and submits an empty allergies array.
- Expand the Health Conditions UI to include a broad selectable list of common conditions (mobile-usable), while still supporting custom condition entry and tag-style selection/removal.

**User-visible outcome:** Users will see 1–5 food recommendations right away, can explicitly choose “No allergies” to avoid accidental filtering, and can quickly select common health conditions without needing to type most of them manually.

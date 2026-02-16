# Specification

## Summary
**Goal:** Let users optionally enter a favorite food and, when provided, receive a highlighted “Star Meal” recommendation based on that favorite food.

**Planned changes:**
- Add an optional “Favorite food” text input to the existing health input form without changing the primary button label (“Search Foods”).
- Extend the frontend form data and recommendation request payload to include an optional `favoriteFood` string.
- Update the backend `getFoodRecommendations` method signature to accept the additional favorite food parameter and regenerate/update frontend bindings so types match.
- Implement backend logic to include a dedicated “Star Meal” Dish when `favoriteFood` is non-empty (trimmed), including health explanation, ingredients, instructions, and nutrition summary, while respecting allergy constraints.
- Update results UI to prominently highlight the Star Meal (badge/label “Star Meal”) and display the favorite food name in English.

**User-visible outcome:** Users can (optionally) type a favorite food before pressing “Search Foods”; if provided, results include a clearly highlighted “Star Meal” entry showing that favorite food with details, while leaving the app’s behavior unchanged when the field is empty.

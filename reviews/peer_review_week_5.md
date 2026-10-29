# Contract Review

**Contract:** Week 5 Contract  
**Date:** October 24, 2026  
**Peer Conversation Partner:** Daphne Pack (my wife)
**Slices Reviewed:** Identifying and managing interface state, keeping state changes reflected in the DOM, saving and retrieving appropriate data with `localStorage`, and validating missing, malformed, or outdated values

---

## 1. What I Demonstrated Across the Contract

I demonstrated that I can manage interactive application state in my Neil Land Hiking Guide using a single `hikingGuideState` object as the source of truth. My state tracks the visitor's preferred trail difficulty (`difficulty`), their selected favorite trail (`favoriteTrailId`), and a storage schema version (`version`). Whenever a visitor changes the difficulty filter, marks or unmarks a trail as a favorite, or clicks the reset button, the state updates first, saves to `localStorage`, and triggers `renderApp()` so the trail cards, favorite badges, button states, and status summary in the DOM immediately reflect the changes.

I also demonstrated how to safely persist and restore user preferences across page refreshes while keeping temporary data (like the live weather fetch state) separate from permanent storage.

## 2. Evidence I Showed

- **Artifact:** My updated hiking guide (`hike.html`, `hike.css`, and `hike.js`), featuring the Trail Preferences control bar, difficulty filter dropdown, reset button, live preference status banner, and interactive favorite buttons on each trail card.
- **Test or Verification:** I tested selecting a difficulty filter and marking a trail as a favorite, then refreshed the browser and inspected the Application tab in DevTools to verify that `hikingGuideState` persisted and restored the exact view. I also tested resilience by manually setting `localStorage.setItem("hikingGuideState", "{bad-json")` and injecting invalid property values (such as a nonexistent trail ID and `"extreme"` difficulty) in the console, confirming the page caught the errors and fell back to safe defaults without crashing.
- **Explanation, Challenge, or Decision:** I explained how `initHikingGuide()` calls `loadState()` on startup, which parses the JSON inside a `try...catch` block and passes it through `validateAndNormalizeState()` before rendering. I also explained my decision to store a single `favoriteTrailId` and `difficulty` under one `hikingGuideState` key with a `version` number, rather than scattering multiple keys in `localStorage`, so future updates can cleanly migrate or reset older saved data.

## 3. What My Peer Helped Me Notice

Gemini helped me notice that each trail object in the `hikes` array needed a stable, unique `id` property (like `"moonberry-falls"`) rather than relying on array indexes or display names, which could break saved favorites if trails are reordered or renamed later. We also noticed that when `validateAndNormalizeState()` repairs an outdated or partially invalid object from `localStorage`, immediately saving the cleaned state back to `localStorage` keeps the stored data synchronized with what the user sees on screen. Additionally, we noted that the "Placeholder" test trail has an `"Unknown"` difficulty, meaning it only appears when the filter is set to "All Difficulties."

## 4. What I Learned by Asking Questions or Listening

It became clearer to me why treating the JavaScript state object as the single source of truth is much more reliable than reading state out of the DOM. Instead of manually toggling classes in several places when a button is clicked, updating `hikingGuideState` and calling `renderApp()` guarantees that the dropdown value, the filtered trail cards, the `aria-pressed` attributes, and the status message never get out of sync. I also learned that `JSON.parse()` is only the first step of loading from `localStorage`—even valid JSON can contain the wrong data types or outdated values, so property-by-property validation is essential.

## 5. Review Status

Every slice reviewed.

## 6. My Next Step

My next step is to take screenshots of the `localStorage` Application panel in DevTools (showing both valid persisted state and the console warning recovery test for malformed JSON) to include in my final submission, and consider whether I want to eventually allow users to save an array of multiple favorite trails instead of a single favorite trail.
# Learning Contract Week 5

## Contract 5: Add Application State and Persistence

### Competency Slices

- Identifying and managing interface state
- Keeping state changes reflected in the DOM
- Saving and retrieving appropriate data with `localStorage`
- Validating missing, malformed, or outdated values

### Suggested Outcome

I can manage a meaningful piece of interface state and persist it when appropriate. I can explain where the state lives, what changes it, and what the application does when stored data is missing or invalid.

### Suggested Evidence

- A user flow that changes state
- Persistence demonstrated after a refresh
- A test using missing or malformed stored data
- Explanation of the state transitions and validation approach

*Suggested resource: **localStorage Practice**.*

---

## My Hiking Guide Application Plan

### Application Focus

I will improve my hiking guide by adding a saved trail-preference state. Visitors will be able to mark a hiking trail as a favorite and save their preferred hiking difficulty. The page will update immediately when these values change, and the saved preferences will still be available after the visitor refreshes the page.

### State I Will Manage

The main state will be a `hikingGuideState` object in `hike.js` containing:

- `favoriteTrailId`: the ID of the trail selected as a favorite, or `null` when no trail is selected.
- `difficulty`: the preferred difficulty, such as `all`, `easy`, `moderate`, or `hard`.
- `version`: a storage version number so the application can recognize older saved data.

The JavaScript state will be the source of truth. Trail cards, favorite button labels, selected filter controls, and status messages in the DOM will be rendered from that state.

### State Changes and User Flow

1. The hiking guide loads and initializes the default state.
2. The application reads the saved hiking-guide state from `localStorage`.
3. The application validates the saved values before using them.
4. The visitor chooses a difficulty filter and/or clicks a trail's favorite button.
5. The state object changes in response to the visitor's action.
6. The trail list and controls re-render so the DOM reflects the new state.
7. The updated state is saved to `localStorage`.
8. After a refresh, the application restores valid saved preferences and displays the same hiking-guide view.

### Persistence Approach

I will store the state under one clearly named key, `hikingGuideState`, using `JSON.stringify()` when saving and `JSON.parse()` when retrieving. Only useful interface preferences will be persisted; temporary loading messages and API response data will not be stored as permanent preferences.

The save operation will run after a valid state change. The load operation will run during page initialization before the hiking-guide controls and trail cards are rendered.

### Validation and Recovery

The application will safely handle these cases:

- No value exists in `localStorage`: use the default state.
- The stored value is not valid JSON: catch the parsing error, ignore the bad value, and use the default state.
- The stored JSON is not an object: use the default state.
- A property is missing: use a safe default for that property.
- A property has an invalid type or value: replace it with a valid default.
- The storage version is missing or outdated: migrate supported values when possible; otherwise reset to the current default state.
- `localStorage` is unavailable or throws an error: keep the hiking guide usable for the current session without persistence.

### Planned Evidence

I will demonstrate the following in my hiking guide:

- Clicking a favorite button changes the trail's selected state and its button text or appearance.
- Changing the difficulty filter updates the visible trail cards and the selected control.
- Refreshing the page restores the selected favorite and difficulty preference.
- Manually inserting malformed JSON or an invalid value for `hikingGuideState` does not break the page; the guide falls back to safe defaults.
- A short explanation identifies the JavaScript state object, the DOM elements updated from it, the `localStorage` key, and the validation and recovery behavior.

### Completion Criteria

I will consider this contract complete when the hiking guide has a meaningful interactive state, every state change is reflected in the DOM, appropriate preferences persist across a refresh, invalid stored data is handled safely, and I can explain the complete state flow from user action to rendering and persistence.

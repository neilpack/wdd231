
# Contract Review

**Contract:** Week 6 Contract
**Date:** October 29, 2026
**Peer Conversation Partner:** Jacob Hirschi
**Slices Reviewed:** URL search parameters and multi-page navigation, identifier validation and detail retrieval, useful handling of missing or invalid URLs, open and closed interaction states, synchronized visual/keyboard/ARIA state, and `Escape`, focus, and click-away behavior

---

## 1. What I Demonstrated Across the Contract

I demonstrated that I can connect the hiking trail collection page to a separate trail detail page. Each trail card creates a link such as `trail.html?id=moonberry-falls`, and the detail page reads the `id` value with `URLSearchParams`. The JavaScript validates the ID against the available trail data before rendering the selected trail's name, description, image, difficulty, distance, and location.

I also demonstrated an accessible mobile navigation interaction. The menu button updates `aria-expanded`, changes the visible menu state, moves focus to the first navigation link when the menu opens, returns focus to the trigger when it closes with `Escape`, closes when a link is selected, and supports click-away behavior.

## 2. Evidence I Showed

- **Artifact:** My Neil Land Hiking Guide, including `pages/hike.html`, `pages/trail.html`, `styles/hike.css`, and `scripts/hike.js`.
- **Test or Verification:** I tested selecting a trail from the collection page, refreshing a valid detail URL, visiting the detail page without an ID, and using an unknown ID. Missing or invalid IDs show a helpful message and provide a link back to the trail collection. I also tested opening and closing the navigation menu with the button, keyboard, `Escape`, a navigation link, and click-away behavior.
- **Explanation, Challenge, or Decision:** I explained that stable trail IDs are used instead of array positions or display names so links continue to identify the correct trail. I also explained that the menu's visual visibility, button text, `aria-expanded` value, and focus behavior need to change together. A challenge for me was understanding how the JavaScript connects URL data, DOM rendering, event listeners, and accessibility state.

## 3. What My Peer Helped Me Notice

My reviewer helped me notice that the difficulty filter needs a closer accessibility review. I can reach the difficulty control with the Tab key, but I use the arrow keys to move through its options. This made me realize that I need to test the control more carefully with keyboard-only navigation and provide clearer accessibility support where needed. We also identified that I need to understand the JavaScript details better instead of only recognizing that the interaction works.

## 4. What I Learned by Asking Questions or Listening

It became clearer to me that accessibility includes more than adding ARIA attributes or making a button respond to a click. I need to check the complete keyboard experience, including focus order, visible focus, expected key behavior, clear labels, and whether each control communicates its state. I also learned that `URLSearchParams` only reads the value from the URL; my code still has to validate that value, find the matching trail, and render a useful recovery message when the value is missing or invalid.

## 5. Review Status

Every slice reviewed, with additional accessibility and JavaScript follow-up needed.

## 6. My Next Step

My next step is to improve the difficulty-filter accessibility and complete a keyboard-only walkthrough of the entire page. I will verify the Tab order, visible focus, select-control behavior, menu focus management, `Escape` handling, and screen-reader-friendly labels. I will also trace the main JavaScript functions line by line so I can explain how the URL parameter, validation, rendering, and interaction state work together.

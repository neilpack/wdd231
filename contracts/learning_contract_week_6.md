# Learning Contract: Connect Navigation and Interaction Flows

Student: Neil Pack  
Date: October 22, 2026  
Target assessment date: October 29, 2026

## Primary competency

By the end of this contract, I will be able to:

I can connect a user flow across navigation and interface interaction. I can link from a collection of hiking trails to a detail view using a URL parameter, validate the selected trail, handle missing or unknown trail IDs, and build an accessible open-and-close interaction with synchronized visual, keyboard, and ARIA state.

## Specific slices in this contract

- URL search parameters and multi-page navigation
- Identifier validation and detail retrieval
- Useful handling of missing or invalid URLs
- Open and closed interaction states
- Synchronized visual, keyboard, and ARIA state
- Appropriate `Escape`, focus, and click-away behavior

## My starting point

I already know/can:

I can build a data-driven hiking guide with HTML, CSS, and JavaScript. My project already renders trail information from data, uses reusable functions and modules, includes responsive styling, retrieves weather information from an API, and stores selected hiking preferences with `localStorage`.

I still need to learn or improve:

- How to create links that pass a trail identifier in a URL search parameter.
- How to read and validate a parameter with `URLSearchParams`.
- How to use the parameter to select the correct trail and render a detail page.
- How to show a useful message when the parameter is missing or does not match a trail.
- How to build an accessible menu, modal, accordion, or similar interaction.
- How to keep the visual state, keyboard behavior, and ARIA attributes synchronized.
- How to manage focus, `Escape`, and click-away behavior without making the page difficult to use.

## My learning plan

I will use these resources:

- Youtube
- W3Schools
- [MDN: URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams).
- [MDN: `<dialog>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) and [MDN: ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA).
- The existing trail data, page structure, and JavaScript modules in my hiking guide.
- Browser developer tools and feedback from a peer, instructor, or teaching assistant.

I will practice by:

I will add a trail-detail flow to my hiking guide. Each trail card on the collection page will include a meaningful link such as `trail.html?id=trail-id`. The detail page will read the `id` search parameter, validate it against the available trail data, and render the matching trail’s name, description, difficulty, distance, image, and other useful information. If the parameter is missing, malformed, or unknown, the page will display a helpful message and provide a link back to the trail collection.

I will also add an accessible interaction, such as a mobile navigation menu or trail information dialog. The interaction will have clearly defined open and closed states. Its button label, `aria-expanded` value, visibility, focus behavior, and keyboard handling will stay synchronized. Pressing `Escape`, clicking outside when appropriate, or selecting a navigation link will close the interaction safely.

My first milestone, due October 27, 2026, is:

I will create working trail links from the collection page and a detail page that reads a valid trail ID from the URL and displays the matching trail. I will also create the basic open-and-close interaction with a visible control and a working keyboard-accessible state.

## Evidence of learning

I will submit or demonstrate:

- A working list-to-detail trail flow using a URL search parameter.
- A direct visit to a valid detail URL after refreshing the page.
- Tests for a valid ID, a missing ID, and an unknown ID.
- A short explanation of how the URL parameter controls data selection and rendering.
- A working menu, dialog, accordion, or similar open-and-close interaction.
- A keyboard demonstration using `Tab`, `Enter` or `Space`, and `Escape` as appropriate.
- Evidence that the visual state and relevant ARIA state change together.
- One documented bug, challenge, or design decision and what I learned from it.

I will know I am ready when:

- A visitor can select a trail from the collection page and reach the correct detail view.
- The detail page still works when its URL is copied, refreshed, or opened directly.
- Missing and unknown trail IDs produce a clear recovery message instead of a broken or blank page.
- The interactive control has a clear open and closed state, works with a keyboard, and keeps its ARIA attributes synchronized.
- I can explain how I validate the URL parameter, retrieve the trail data, update the page, and manage the interaction state.

## Support and risks

The help I may need is:

I may ask a peer or instructor to test the detail links and keyboard interaction. I may use MDN and accessibility inspection tools when I am unsure about URL parsing, focus management, ARIA attributes, or the correct behavior for a dialog or navigation menu.

A risk to my plan is:

A likely obstacle is that a link may contain an invalid ID, or the interaction may appear to work with a mouse while failing for keyboard users. I will respond by testing direct URLs and invalid values, checking the browser console, inspecting the rendered HTML and ARIA attributes, and walking through the interaction using only the keyboard. I will keep the recovery path simple by providing a clear message and a link back to the trail collection.

## AI use, if applicable

I expect to use AI for:

I may use AI for explanations of `URLSearchParams`, brainstorming the detail-page data flow, interpreting debugging messages, and suggesting small accessibility improvements. I will write, adapt, and understand the final implementation myself.

I will verify AI suggestions by:

I will compare suggestions with MDN and accessibility guidance, test valid and invalid URLs in my own project, inspect the page with browser developer tools, and complete a keyboard-only walkthrough. I will not count an AI suggestion as evidence until I can explain the code and verify that the navigation and interaction work correctly.

## Signature

Student signature: Neil Pack

Date signed: October 24, 2026


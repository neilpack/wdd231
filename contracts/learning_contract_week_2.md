# Learning Contract: Make My Page Data-Driven

Student: Neil Pack  
Date: September 24, 2026  
Target assessment date: October 1, 2026

## Primary competency

By the end of this contract, I will be able to:

I can make a web page data-driven with JavaScript by using variables, functions, arrays, and objects to represent page content. I can select DOM elements, render repeated content with reusable functions, respond to user events, and organize my JavaScript into modules with clear responsibilities for data, rendering, event handling, and startup code. I can also maintain a mobile-first layout and check visual accessibility as the page content changes.

## My starting point

I already know/can:

I can build a basic web page using semantic HTML and CSS and add a simple JavaScript interaction. In Week 1, I built the shell for a fictional local hiking guide and added a basic navigation interaction. I understand the purpose of headings, navigation, main content, and a footer, and I can make a simple DOM change in response to an event.

I still need to learn or improve:

- Using JavaScript variables, functions, arrays, and objects to represent page content.
- Selecting DOM elements and rendering content into them with reusable functions.
- Responding to click, input, submit, or change events and updating the page.
- Creating repeated content from data instead of duplicating HTML markup.
- Using module imports and exports to separate data, rendering, and event handling.
- Making data-driven content work within a mobile-first responsive layout.
- Testing visual accessibility, including contrast, readable sizing, reflow, zoom, text enlargement, motion, and touch-target size.

## My learning plan

I will use these resources:

- Course modules covering JavaScript variables, arrays, objects, functions, DOM selection, event listeners, and ES modules.
- MDN Web Docs to verify JavaScript syntax and behavior when I get stuck.
- Browser developer tools to test JavaScript behavior, console errors, responsive layouts, zoom, and text enlargement.
- An accessibility checklist to guide my visual accessibility testing.
- Feedback from a peer, instructor, or teaching assistant before spending too much time on visual polish.

I will practice by:

I will continue the local hiking guide from Week 1 and turn its main section into a data-driven trail directory. Each trail card will show a trail name, difficulty, distance, location, short description, and an image or image alternative.

I will create a `trailData.js` module containing an array of trail objects. I will create a `renderTrails.js` module with a reusable function that generates the trail cards from that data. I will create an `events.js` module that handles a filter or search interaction and updates the visible results and result count. I will connect these modules through `main.js` using `import` and `export` statements.

I will keep data definitions separate from event-handling code and keep event logic separate from rendering functions. I will also refine the CSS using custom properties, a mobile-first layout, and Flexbox or Grid at wider viewport sizes.

I will test long trail names, longer descriptions, different image proportions, narrow and wide screens, browser zoom, and text enlargement. I will diagnose and correct at least one responsive or visual accessibility problem and document the symptom, likely cause, test, fix, and verification result.

My first milestone, due September 26, 2026, is:

I will create a page that displays at least two trail cards from JavaScript data, runs without console errors, and includes the first version of the filter or search interaction and mobile layout. I will ask for feedback before spending additional time on visual polish.

## Evidence of learning

I will submit or demonstrate:

- A link to the working page and the relevant project files.
- An array or object containing repeated trail content with at least two data items.
- A reusable rendering function that generates the repeated trail-card interface.
- A demonstration showing that a third trail can be added by adding data instead of duplicating card markup.
- A filter, search, submit, or change interaction showing an event listener and resulting DOM update.
- The use of `import` and `export` statements to separate data, rendering, event handling, and startup code.
- A brief explanation of what belongs in the data, rendering, event-handling, and startup modules.
- Screenshots or a live demonstration at narrow and wide viewport sizes, including a zoom or text-enlargement check.
- A visual accessibility check covering contrast, text size, focus visibility, reflow, image alternatives, and touch-target size.
- One responsive or visual accessibility problem, my hypothesis about its cause, the fix I tried, and how I verified the fix.

I will know I am ready when:

- The project starts correctly, the modules load successfully, and the browser console has no errors.
- The page displays repeated trail cards from JavaScript data.
- A new trail card can be added by adding another data object without copying the card markup.
- The interaction changes the rendered results and provides a useful message when no trails match.
- The layout remains readable and usable at narrow and wide viewport sizes without unnecessary horizontal scrolling.
- The page continues to work during browser zoom and text enlargement.
- Text and controls have readable contrast, visible focus, comfortable spacing, and touch targets that are easy to activate.
- I can explain one JavaScript function, one module boundary, one responsive CSS decision, and one accessibility test without reading an explanation from someone else.

## Support and risks

The help I may need is:

I may ask a peer or instructor for help with module import paths, rendering an empty result, or choosing an appropriate responsive breakpoint. Before asking for help, I will record the expected behavior, the actual behavior, and at least one hypothesis about what is causing the problem.

A risk to my plan is:

My main risks are mixing responsibilities between modules and spending too much time on visual polish. If I get stuck on the JavaScript structure, I will reduce the problem to one data item and one render call before adding complexity. If visual polish starts taking too much time, I will stop, complete the evidence checklist, and test the most important usability issues before making decorative changes.

## AI use, if applicable

I expect to use AI for:

I may use AI to explain module boundaries, suggest debugging questions, review a responsive testing plan, or help identify likely causes of a JavaScript, layout, or contrast problem. I will not ask AI to produce the complete project for me.

I will verify AI suggestions by:

I will compare suggestions with course documentation and MDN, test the code in my own project, inspect the result in the browser, and use keyboard, zoom, and text-enlargement testing. If I use AI, I will record the question I asked, identify which suggestions I accepted or rejected, and make sure I can explain the final code and decisions myself.

## Signature

Student signature: Neil Pack  

Date signed: 9/24/2026
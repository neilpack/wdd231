# Learning Contract: Integrate an API

Student: Neil Pack  
Date: October 8, 2026  
Target assessment date: October 15, 2026

## Primary competency

By the end of this contract, I will be able to:

I can use `fetch` and `async`/`await` to retrieve weather data from an external API, check the response status, parse and transform JSON data, and render useful weather information in my fictional Yellowstone/local hiking guide. I can also provide clear loading, empty, and error states and explain how I inspected and safely handled the network request.

## My starting point

I already know/can:

I can build a data-driven hiking website with HTML, CSS, and JavaScript. My project already uses reusable rendering and module organization, including files such as `parkService.js`, `templates.mjs`, and `main.js`. In Week 3, I used CSS Grid for trail cards and column Flexbox inside the cards, along with mobile-first responsive and accessible styling.

I still need to learn or improve:

- How to make an API request with `fetch` and `async`/`await`.
- How to check whether a response was successful before using its data.
- How to parse JSON and transform a large API response into only the weather information my page needs.
- How to render loading, empty, and error states instead of leaving the page blank.
- How to inspect a request in browser developer tools and understand its status, response, and timing.
- How to avoid exposing secrets and safely handle API configuration in a front-end project.

## My learning plan

I will use these resources:

- [MDN Web Docs: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
- [Open-Meteo documentation](https://open-meteo.com/en/docs) for the weather endpoint and response format.
- Browser developer tools and feedback from a peer, instructor, or teaching assistant.
- w3schools
- Other tools to learn how to incorporate APIs

I will practice by:

I will add a weather page or weather section to my hiking guide for the Yellowstone/local hiking area. The page will request current or forecast weather data using `fetch` and `async`/`await`, then display useful information such as temperature, weather conditions, wind, and the forecast date. I will transform the API response into a smaller object or array before rendering it with my existing project structure. I will create visible loading, empty, and error messages and test both successful and unsuccessful requests. I will inspect the request in browser developer tools and make sure I do not place a private API key or other secret in client-side code.

My first milestone, due October 11, 2026, is:

I will create a separate weather page or working weather section that successfully requests data from the API and displays at least the location, current temperature, and weather condition. The page will use `fetch` with `async`/`await`, check the response status, parse the JSON response, and show a loading message while the request is in progress.

## Evidence of learning

I will submit or demonstrate:

- A working weather page or weather section integrated into my hiking guide.
- A short explanation of how `fetch`, `async`/`await`, response status checking, JSON parsing, data transformation, and rendering work together.
- A screenshot or live demonstration of the successful weather response and the network request in browser developer tools.
- A test of the loading state, an empty or missing-data state, and an error state caused by an invalid request or unavailable response.
- One documented bug, challenge, or design decision, such as handling a failed request or deciding which fields from the API response to display.
- An explanation of how I kept the front-end code safe by avoiding exposed secrets and only using appropriate public configuration.

I will know I am ready when:

- The page displays useful weather information from a real API instead of hard-coded weather data.
- The code uses `fetch` and `async`/`await`, checks the response before parsing it, and transforms the response into data that the page can render.
- Users see clear loading, empty, and error messages when the API is loading, provides no usable data, or fails.
- I can use browser developer tools to identify the request URL, status code, response data, and any problem with the request.
- No private API key, password, or other secret is exposed in the browser code.

## Support and risks

The help I may need is:

I may ask a peer or instructor to review my API request, transformed data, and error handling. I may use MDN and the weather API documentation when I am unsure about response status checks, JSON structure, asynchronous code, or browser network errors.

A risk to my plan is:

A likely obstacle is that the API may return a different structure than I expect, fail because of a bad URL or location, or be temporarily unavailable. I will respond by inspecting the actual response in developer tools, logging only safe debugging information, checking the response before parsing it, and displaying a helpful error message instead of allowing the page to break. I will also avoid using an API that requires a secret key in client-side code unless my instructor gives me an approved way to protect it.

## AI use, if applicable

I expect to use AI for:

I may use AI for brainstorming how to organize the weather feature, explaining `fetch` and `async`/`await`, interpreting error messages, and suggesting debugging ideas or small code examples. I will write, adapt, and understand the final implementation myself.

I will verify AI suggestions by:

I will compare AI suggestions with MDN and the weather API documentation, test the request in my own project, inspect the network request and response in browser developer tools, and deliberately test successful, loading, empty, and failed states. I will not count an AI suggestion as evidence until I can explain what the code does and verify that it works safely.

## Signature

Student signature: Neil Pack

Date signed: October 9th, 2026

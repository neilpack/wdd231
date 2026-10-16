
# Contract Review

**Contract:** Week 4 Contract  
**Date:** October 15, 2026  
**Peer Conversation Partner:** Jacob Hirschi
**Slices Reviewed:** Fetch and async/await, response status checking, JSON parsing and data transformation, loading/empty/error states, browser developer tools, and safe public API configuration

---

## 1. What I Demonstrated Across the Contract

I demonstrated that I can use `fetch` with `async`/`await` to request real weather data from the Open-Meteo API and add it to my fictional hiking guide. The request checks `response.ok` before parsing the response, converts the JSON into a smaller weather object, and renders the useful information in a weather card. I also learned how important it is to give the user feedback while asynchronous data is loading and when the request does not provide usable data.

The weather section displays the location, temperature, feels-like temperature, weather condition, wind, and forecast date. I also kept the request safe for a front-end project by using a public endpoint that does not require a private API key.

## 2. Evidence I Showed

- **Artifact:** My live hiking guide, including `hike.html`, `hike.css`, and `hike.js`, with the Neil Land Trail Weather section and the generated weather card.
- **Test or Verification:** I showed the page running on a live server and inspected the weather request in the browser developer tools. I verified that the request returned successfully, that the JSON data was used to populate the card, and that the page initially showed “Loading current weather...” before the result appeared.
- **Explanation, Challenge, or Decision:** I explained how `loadWeather()` awaits the request, checks the response status, parses JSON, passes it through `transformWeatherData()`, and sends the smaller object to `renderWeather()`. I also explained that invalid or incomplete data is handled with an unavailable message and that a failed request is caught and reported to the user instead of leaving the page blank. I decided to use Open-Meteo because it provides the needed public weather data without exposing a secret key.

## 3. What My Peer Helped Me Notice

My peer helped me notice that the page does more than simply display a successful API result: the status element and the hidden weather card work together to communicate the request state. We also noticed that the page is using a real Yellowstone-area coordinate even though the hiking locations are fictional, so the wording should make that relationship clear. Another small issue to keep checking is the fallback temperature-unit text in the JavaScript, because the displayed unit should always use the correct character encoding and match the API response.

## 4. What I Learned by Asking Questions or Listening

It became clearer to me that checking `response.ok` is necessary because `fetch` does not automatically throw an error for every HTTP failure. I also better understood why transforming the response before rendering is useful: the API returns more information than the page needs, while the transformed object gives the rendering function a predictable structure. Asking questions about the loading and failure behavior also helped me see that error handling is part of the user experience, not just debugging code.

## 5. Review Status

Every slice reviewed, with a small follow-up needed for wording and final display polish.

## 6. My Next Step

My next step is to test the request again with an invalid URL or unavailable response and document the visible error state. I will also correct or verify the temperature-unit fallback and clarify that the weather represents the Yellowstone-area trail guide location while keeping the fictional hiking content clearly labeled.

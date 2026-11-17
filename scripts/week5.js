// Rexburg, Idaho is at latitude 43.826, longitude -111.7897.
// im using Open-Meteo and that needs no API key
const baseUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=43.826&longitude=-111.7897" +
  "&temperature_unit=fahrenheit&wind_speed_unit=mph";

// Normal request: ask for the current temperature, feels-like, and wind.
const weatherUrl = baseUrl + "&current=temperature_2m,apparent_temperature,wind_speed_10m";

// this has no weather because we didn't finish the url in baseUrl
const emptyUrl = baseUrl;

// latitude 999 doesn't exist, so the API answers with status 400.
const errorUrl = "https://api.open-meteo.com/v1/forecast?latitude=999&longitude=-111.7897&current=temperature_2m";


const statusText = document.querySelector("#status");
const weatherList = document.querySelector("#weather");
const temperature = document.querySelector("#temperature");
const feelsLike = document.querySelector("#feels-like");
const wind = document.querySelector("#wind");

// state is "loading", "success", "empty", or "error".
function showState(state, message) {
  statusText.textContent = message;
  statusText.className = "status " + state;
  weatherList.hidden = state !== "success"; //if it works then you can show the weather, i don't want 999 longitude showing something dumb
}

async function loadWeather(url) {
  // shown right away, before the request finishes.
  showState("loading", "Loading weather...");

  try {
    const response = await fetch(url);

    console.log("Status:", response.status);
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    const data = await response.json();
    console.log("Data:", data);

    //empty
    if (!data.current) {
      showState("empty", "The request worked, but no weather data came back.");
      return;
    }

    // success
    temperature.textContent = data.current.temperature_2m + " °F";
    feelsLike.textContent = data.current.apparent_temperature + " °F";
    wind.textContent = data.current.wind_speed_10m + " mph";
    showState("success", "Weather loaded. Status " + response.status + ".");

  } catch (error) {
    // a bad status, or no internet connection.
    console.error(error);
    showState("error", "Could not load the weather. " + error.message);
  }
}

document.querySelector("#load-button").addEventListener("click", () => loadWeather(weatherUrl));
document.querySelector("#empty-button").addEventListener("click", () => loadWeather(emptyUrl));
document.querySelector("#error-button").addEventListener("click", () => loadWeather(errorUrl));

loadWeather(weatherUrl);

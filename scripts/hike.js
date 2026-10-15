const hikes = [
  {
    name: "Moonberry Falls Trail",
    location: "Moonberry Forest",
    difficulty: "Easy",
    distance: "2.4 miles",
    image: "https://picsum.photos/seed/moonberry/600/400",
    description:
      "A peaceful forest trail leading to the bright blue waters of Moonberry Falls."
  },
  {
    name: "Mount Neil Summit",
    location: "Neil Mountains",
    difficulty: "Hard",
    distance: "8.7 miles",
    image: "https://picsum.photos/seed/mountneil/600/400",
    description:
      "A challenging climb to the highest point in Neil Land with wide views of the surrounding valleys."
  },
  {
    name: "Golden Pine Loop",
    location: "Golden Pine Valley",
    difficulty: "Easy",
    distance: "3.1 miles",
    image: "https://picsum.photos/seed/goldenpine/600/400",
    description:
      "A relaxing loop through giant golden pine trees and open meadows."
  },
  {
    name: "Dragon Tooth Ridge",
    location: "Northern Neil Land",
    difficulty: "Hard",
    distance: "6.5 miles",
    image: "https://picsum.photos/seed/dragontooth/600/400",
    description:
      "A steep rocky hike following a narrow ridge shaped like the teeth of an ancient dragon."
  },
  {
    name: "Whispering Lake Trail",
    location: "Whispering Woods",
    difficulty: "Moderate",
    distance: "4.8 miles",
    image: "https://picsum.photos/seed/whisperinglake/600/400",
    description:
      "A wooded trail ending at a quiet mountain lake surrounded by tall cliffs."
  },

  // long description, and missing image for testing.
  {
    name: "Placeholder",
    location: "Placeholder",
    difficulty: "Unknown",
    distance: "X miles",
    image: "",
    description:
      "Placeholder description."
  }
];


const hikeList = document.querySelector("#hike-list");
const weatherStatus = document.querySelector("#weather-status");
const weatherCard = document.querySelector("#weather-card");

const weatherUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=44.4280&longitude=-110.5885" +
  "&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,is_day" +
  "&daily=weather_code&forecast_days=1&timezone=auto";


const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};


function setWeatherStatus(message, isError = false) {
  weatherStatus.textContent = message;
  weatherStatus.classList.toggle("is-error", isError);
}


function transformWeatherData(data) {
  const current = data?.current;

  if (!current || typeof current.temperature_2m !== "number" ||
      typeof current.weather_code !== "number") {
    return null;
  }

  return {
    location: "NEIL LAND WEATHER",
    temperature: `${Math.round(current.temperature_2m)} ${data.current_units?.temperature_2m || "°C"}`,
    feelsLike: `${Math.round(current.apparent_temperature)} ${data.current_units?.apparent_temperature || "°C"}`,
    condition: weatherDescriptions[current.weather_code] || "Weather condition unavailable",
    wind: `${Math.round(current.wind_speed_10m)} ${data.current_units?.wind_speed_10m || "km/h"}`,
    date: current.time ? new Date(current.time).toLocaleDateString() : "Date unavailable"
  };
}


function renderWeather(weather) {
  const summary = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = weather.location;

  const temperature = document.createElement("p");
  temperature.classList.add("weather-temperature");
  temperature.textContent = weather.temperature;

  const condition = document.createElement("p");
  condition.textContent = weather.condition;
  summary.append(title, temperature, condition);

  const details = document.createElement("dl");
  details.classList.add("weather-details");

  const addWeatherDetail = (label, value) => {
    const row = document.createElement("div");
    const term = document.createElement("dt");
    term.textContent = label;
    const description = document.createElement("dd");
    description.textContent = value;
    row.append(term, description);
    details.appendChild(row);
  };

  addWeatherDetail("Feels like", weather.feelsLike);
  addWeatherDetail("Wind", weather.wind);
  addWeatherDetail("Forecast date", weather.date);

  weatherCard.replaceChildren(summary, details);
  weatherCard.hidden = false;
}


async function loadWeather() {
  setWeatherStatus("Loading current weather...");
  weatherCard.hidden = true;

  try {
    const response = await fetch(weatherUrl);

    if (!response.ok) {
      throw new Error(`Weather request failed with status ${response.status}`);
    }

    const data = await response.json();
    const weather = transformWeatherData(data);

    if (!weather) {
      setWeatherStatus("Weather data is currently unavailable. Please try again later.", true);
      return;
    }

    renderWeather(weather);
    setWeatherStatus("Current weather loaded.");
  } catch (error) {
    console.error("Unable to load weather data:", error);
    setWeatherStatus("We couldn't load the weather right now. Please check your connection and try again.", true);
  }
}


function createHikeCard(hike) {
  const article = document.createElement("article");
  article.classList.add("hike-card");


  // IMAGE OR PLACEHOLDER

  if (hike.image) {
    const image = document.createElement("img");

    image.classList.add("hike-image");
    image.src = hike.image;
    image.alt = `View along the ${hike.name}`;
    image.loading = "lazy";

    article.appendChild(image);
  } else {
    const placeholder = document.createElement("div");

    placeholder.classList.add("image-placeholder");
    placeholder.textContent = "No trail image available";

    article.appendChild(placeholder);
  }


  // CARD CONTENT

  const content = document.createElement("div");
  content.classList.add("hike-content");


  const title = document.createElement("h3");
  title.textContent = hike.name;


  const details = document.createElement("div");
  details.classList.add("hike-details");


  const difficulty = document.createElement("span");
  difficulty.textContent = hike.difficulty;


  const distance = document.createElement("span");
  distance.textContent = hike.distance;


  details.append(difficulty, distance);


  const location = document.createElement("p");
  location.innerHTML = `<strong>Location:</strong> ${hike.location}`;


  const description = document.createElement("p");
  description.classList.add("hike-description");
  description.textContent = hike.description;


  const button = document.createElement("button");
  button.classList.add("hike-button");
  button.type = "button";
  button.textContent = "Trail Details";

  button.addEventListener("click", () => {
    alert(
      `${hike.name}\n\n` +
      `Location: ${hike.location}\n` +
      `Difficulty: ${hike.difficulty}\n` +
      `Distance: ${hike.distance}`
    );
  });


  content.append(
    title,
    details,
    location,
    description,
    button
  );

  article.appendChild(content);

  return article;
}


function displayHikes() {
  hikes.forEach((hike) => {
    const hikeCard = createHikeCard(hike);
    hikeList.appendChild(hikeCard);
  });
}


displayHikes();
loadWeather();

const hikes = [
  {
    id: "moonberry-falls",
    name: "Moonberry Falls Trail",
    location: "Moonberry Forest",
    difficulty: "Easy",
    distance: "2.4 miles",
    image: "https://picsum.photos/seed/moonberry/600/400",
    description:
      "A peaceful forest trail leading to the bright blue waters of Moonberry Falls."
  },
  {
    id: "mount-neil-summit",
    name: "Mount Neil Summit",
    location: "Neil Mountains",
    difficulty: "Hard",
    distance: "8.7 miles",
    image: "https://picsum.photos/seed/mountneil/600/400",
    description:
      "A challenging climb to the highest point in Neil Land with wide views of the surrounding valleys."
  },
  {
    id: "golden-pine-loop",
    name: "Golden Pine Loop",
    location: "Golden Pine Valley",
    difficulty: "Easy",
    distance: "3.1 miles",
    image: "https://picsum.photos/seed/goldenpine/600/400",
    description:
      "A relaxing loop through giant golden pine trees and open meadows."
  },
  {
    id: "dragon-tooth-ridge",
    name: "Dragon Tooth Ridge",
    location: "Northern Neil Land",
    difficulty: "Hard",
    distance: "6.5 miles",
    image: "https://picsum.photos/seed/dragontooth/600/400",
    description:
      "A steep rocky hike following a narrow ridge shaped like the teeth of an ancient dragon."
  },
  {
    id: "whispering-lake",
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
    id: "placeholder-trail",
    name: "Placeholder",
    location: "Placeholder",
    difficulty: "Unknown",
    distance: "X miles",
    image: "",
    description:
      "Placeholder description."
  }
];


// --------------------
// STATE & PERSISTENCE CONFIGURATION
// --------------------

const STORAGE_KEY = "hikingGuideState";
const STORAGE_VERSION = 1;
const VALID_DIFFICULTIES = ["all", "easy", "moderate", "hard"];
const VALID_TRAIL_IDS = hikes.map((hike) => hike.id);

function createDefaultState() {
  return {
    favoriteTrailId: null,
    difficulty: "all",
    version: STORAGE_VERSION
  };
}

// Main application state (Single Source of Truth)
let hikingGuideState = createDefaultState();


// --------------------
// DOM ELEMENTS
// --------------------

const hikeList = document.querySelector("#hike-list");
const difficultyFilter = document.querySelector("#difficulty-filter");
const resetPreferencesButton = document.querySelector("#reset-preferences");
const preferenceStatus = document.querySelector("#preference-status");
const weatherStatus = document.querySelector("#weather-status");
const weatherCard = document.querySelector("#weather-card");
const trailDetail = document.querySelector("#trail-detail");
const menuToggle = document.querySelector("#menu-toggle");
const siteNavigation = document.querySelector("#site-navigation");


// --------------------
// ACCESSIBLE NAVIGATION
// --------------------

let lastMenuTrigger = null;

function setMenuOpen(isOpen, returnFocus = false) {
  if (!menuToggle || !siteNavigation) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "Close menu" : "Menu";
  siteNavigation.hidden = !isOpen;

  if (isOpen) {
    lastMenuTrigger = document.activeElement;
    siteNavigation.querySelector("a")?.focus();
  } else if (returnFocus) {
    (lastMenuTrigger || menuToggle).focus();
  }
}

function initNavigation() {
  if (!menuToggle || !siteNavigation) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  siteNavigation.addEventListener("click", () => {
    setMenuOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (
      menuToggle.getAttribute("aria-expanded") === "true" &&
      !siteNavigation.contains(event.target) &&
      event.target !== menuToggle
    ) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, true);
    }
  });
}


// --------------------
// VALIDATION & LOCALSTORAGE
// --------------------

function validateAndNormalizeState(rawState) {
  const defaults = createDefaultState();

  // If stored JSON is not a non-null plain object, return defaults
  if (!rawState || typeof rawState !== "object" || Array.isArray(rawState)) {
    return defaults;
  }

  // Handle missing or outdated version numbers by migrating valid fields
  const normalizedDifficulty =
    typeof rawState.difficulty === "string" &&
    VALID_DIFFICULTIES.includes(rawState.difficulty.toLowerCase())
      ? rawState.difficulty.toLowerCase()
      : defaults.difficulty;

  const normalizedFavoriteId =
    typeof rawState.favoriteTrailId === "string" &&
    VALID_TRAIL_IDS.includes(rawState.favoriteTrailId)
      ? rawState.favoriteTrailId
      : defaults.favoriteTrailId;

  return {
    favoriteTrailId: normalizedFavoriteId,
    difficulty: normalizedDifficulty,
    version: STORAGE_VERSION
  };
}


function loadState() {
  const defaults = createDefaultState();

  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return defaults;
    }

    const parsedValue = JSON.parse(rawValue);
    const validatedState = validateAndNormalizeState(parsedValue);

    // If stored version was outdated or had invalid properties, overwrite with clean state
    if (
      parsedValue?.version !== STORAGE_VERSION ||
      parsedValue?.difficulty !== validatedState.difficulty ||
      parsedValue?.favoriteTrailId !== validatedState.favoriteTrailId
    ) {
      saveState(validatedState);
    }

    return validatedState;
  } catch (error) {
    console.warn(
      "Invalid or inaccessible hikingGuideState in localStorage. Falling back to default state.",
      error
    );
    return defaults;
  }
}


function saveState(stateToSave = hikingGuideState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.warn("Unable to save hikingGuideState to localStorage:", error);
  }
}


// --------------------
// STATE TRANSITIONS
// --------------------

function setDifficultyPreference(newDifficulty) {
  const cleanDifficulty =
    typeof newDifficulty === "string" &&
    VALID_DIFFICULTIES.includes(newDifficulty.toLowerCase())
      ? newDifficulty.toLowerCase()
      : "all";

  hikingGuideState = {
    ...hikingGuideState,
    difficulty: cleanDifficulty
  };

  saveState();
  renderApp();
}


function toggleFavoriteTrail(trailId) {
  if (!VALID_TRAIL_IDS.includes(trailId)) {
    return;
  }

  const nextFavoriteId =
    hikingGuideState.favoriteTrailId === trailId ? null : trailId;

  hikingGuideState = {
    ...hikingGuideState,
    favoriteTrailId: nextFavoriteId
  };

  saveState();
  renderApp();
}


function resetPreferences() {
  hikingGuideState = createDefaultState();
  saveState();
  renderApp();
}


// --------------------
// WEATHER API
// --------------------

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

  if (
    !current ||
    typeof current.temperature_2m !== "number" ||
    typeof current.weather_code !== "number"
  ) {
    return null;
  }

  return {
    location: "NEIL LAND WEATHER",
    temperature: `${Math.round(current.temperature_2m)} ${data.current_units?.temperature_2m || "°C"}`,
    feelsLike: `${Math.round(current.apparent_temperature)} ${data.current_units?.apparent_temperature || "°C"}`,
    condition:
      weatherDescriptions[current.weather_code] ||
      "Weather condition unavailable",
    wind: `${Math.round(current.wind_speed_10m)} ${data.current_units?.wind_speed_10m || "km/h"}`,
    date: current.time
      ? new Date(current.time).toLocaleDateString()
      : "Date unavailable"
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
      setWeatherStatus(
        "Weather data is currently unavailable. Please try again later.",
        true
      );
      return;
    }

    renderWeather(weather);
    setWeatherStatus("Current weather loaded.");
  } catch (error) {
    console.error("Unable to load weather data:", error);
    setWeatherStatus(
      "We couldn't load the weather right now. Please check your connection and try again.",
      true
    );
  }
}


// --------------------
// DOM RENDERING FROM STATE
// --------------------

function createHikeCard(hike) {
  const isFavorite = hikingGuideState.favoriteTrailId === hike.id;

  const article = document.createElement("article");
  article.classList.add("hike-card");
  if (isFavorite) {
    article.classList.add("is-favorite");
  }

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

  const titleRow = document.createElement("div");
  titleRow.classList.add("hike-title-row");

  const title = document.createElement("h3");
  title.textContent = hike.name;
  titleRow.appendChild(title);

  if (isFavorite) {
    const badge = document.createElement("span");
    badge.classList.add("favorite-badge");
    badge.textContent = "★ Favorite";
    titleRow.appendChild(badge);
  }

  const details = document.createElement("div");
  details.classList.add("hike-details");

  const difficulty = document.createElement("span");
  difficulty.textContent = hike.difficulty;

  const distance = document.createElement("span");
  distance.textContent = hike.distance;

  details.append(difficulty, distance);

  const location = document.createElement("p");
  const locationStrong = document.createElement("strong");
  locationStrong.textContent = "Location: ";
  location.append(locationStrong, document.createTextNode(hike.location));

  const description = document.createElement("p");
  description.classList.add("hike-description");
  description.textContent = hike.description;

  // ACTION BUTTONS
  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  const detailsButton = document.createElement("a");
  detailsButton.classList.add("hike-button");
  detailsButton.textContent = "Trail Details";
  detailsButton.href = `trail.html?id=${encodeURIComponent(hike.id)}`;

  const favoriteButton = document.createElement("button");
  favoriteButton.classList.add("favorite-button");
  if (isFavorite) {
    favoriteButton.classList.add("is-active");
  }
  favoriteButton.type = "button";
  favoriteButton.setAttribute("aria-pressed", String(isFavorite));
  favoriteButton.textContent = isFavorite
    ? "★ Favorited"
    : "☆ Mark as Favorite";

  favoriteButton.addEventListener("click", () => {
    toggleFavoriteTrail(hike.id);
  });

  actions.append(detailsButton, favoriteButton);

  content.append(titleRow, details, location, description, actions);
  article.appendChild(content);

  return article;
}


function renderControlsAndStatus(filteredCount) {
  if (difficultyFilter) {
    difficultyFilter.value = hikingGuideState.difficulty;
  }

  if (preferenceStatus) {
    const favoriteHike = hikes.find(
      (hike) => hike.id === hikingGuideState.favoriteTrailId
    );
    const difficultyLabel =
      hikingGuideState.difficulty === "all"
        ? "All difficulties"
        : `${hikingGuideState.difficulty.charAt(0).toUpperCase()}${hikingGuideState.difficulty.slice(1)}`;
    const favoriteLabel = favoriteHike ? favoriteHike.name : "None selected";

    preferenceStatus.textContent = `Showing ${filteredCount} trail(s) (${difficultyLabel}) • Saved Favorite: ${favoriteLabel}`;
  }
}


function renderHikes() {
  const selectedDifficulty = hikingGuideState.difficulty;

  const filteredHikes = hikes.filter((hike) => {
    if (selectedDifficulty === "all") {
      return true;
    }
    return hike.difficulty.toLowerCase() === selectedDifficulty;
  });

  hikeList.replaceChildren();

  if (filteredHikes.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-state");
    emptyMessage.textContent =
      "No hiking trails match the selected difficulty filter.";
    hikeList.appendChild(emptyMessage);
  } else {
    filteredHikes.forEach((hike) => {
      const hikeCard = createHikeCard(hike);
      hikeList.appendChild(hikeCard);
    });
  }

  return filteredHikes.length;
}


function renderApp() {
  const visibleCount = renderHikes();
  renderControlsAndStatus(visibleCount);
}


function renderTrailDetail() {
  if (!trailDetail) {
    return;
  }

  const trailId = new URLSearchParams(window.location.search).get("id");
  const selectedTrail = hikes.find((hike) => hike.id === trailId);

  if (!trailId || !selectedTrail) {
    trailDetail.classList.add("is-error");
    trailDetail.replaceChildren();

    const heading = document.createElement("h2");
    heading.id = "trail-detail-heading";
    heading.textContent = trailId
      ? "Trail not found"
      : "Choose a trail to view its details";

    const message = document.createElement("p");
    message.textContent = trailId
      ? "That trail link is missing or no longer matches an available trail."
      : "A trail ID was not included in this link.";

    const backLink = document.createElement("a");
    backLink.className = "hike-button";
    backLink.href = "hike.html";
    backLink.textContent = "Back to all trails";

    trailDetail.append(heading, message, backLink);
    return;
  }

  trailDetail.classList.remove("is-error");
  trailDetail.replaceChildren();

  const heading = document.createElement("h2");
  heading.id = "trail-detail-heading";
  heading.textContent = selectedTrail.name;

  const content = document.createElement("div");
  content.className = "trail-detail-content";

  if (selectedTrail.image) {
    const image = document.createElement("img");
    image.className = "trail-detail-image";
    image.src = selectedTrail.image;
    image.alt = `View along the ${selectedTrail.name}`;
    content.appendChild(image);
  }

  const information = document.createElement("div");
  const description = document.createElement("p");
  description.textContent = selectedTrail.description;

  const details = document.createElement("dl");
  details.className = "trail-detail-list";
  [
    ["Location", selectedTrail.location],
    ["Difficulty", selectedTrail.difficulty],
    ["Distance", selectedTrail.distance]
  ].forEach(([label, value]) => {
    const term = document.createElement("dt");
    term.textContent = label;
    const definition = document.createElement("dd");
    definition.textContent = value;
    details.append(term, definition);
  });

  const backLink = document.createElement("a");
  backLink.className = "hike-button back-link";
  backLink.href = "hike.html";
  backLink.textContent = "Back to all trails";

  information.append(description, details, backLink);
  content.appendChild(information);
  trailDetail.append(heading, content);
}


// --------------------
// INITIALIZATION
// --------------------

function initHikingGuide() {
  initNavigation();

  if (trailDetail) {
    renderTrailDetail();
    return;
  }

  hikingGuideState = loadState();

  if (difficultyFilter) {
    difficultyFilter.addEventListener("change", (event) => {
      setDifficultyPreference(event.target.value);
    });
  }

  if (resetPreferencesButton) {
    resetPreferencesButton.addEventListener("click", () => {
      resetPreferences();
    });
  }

  renderApp();
  loadWeather();
}

initHikingGuide();

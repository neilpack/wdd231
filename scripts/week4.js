import { hikes } from "./week4/hikes.mjs";
import { hikeTemplate } from "./week4/templates.mjs";

// takes a list of hikes and an element, and fills the element with cards.
function renderHikes(hikeList, element) {
  const html = hikeList.map(hikeTemplate); // run the template on every hike
  element.innerHTML = html.join("");       // join into one string and put it on the page
}

// pick out only the hikes shorter than 3 miles.
function getShortHikes(hikeList) {
  return hikeList.filter((hike) => hike.distance < 3);
}

const allHikesElement = document.querySelector("#all-hikes");
const shortHikesElement = document.querySelector("#short-hikes");

renderHikes(hikes, allHikesElement);
renderHikes(getShortHikes(hikes), shortHikesElement);

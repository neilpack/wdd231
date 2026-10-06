import { getParkData, parkInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";
const parkData = getParkData();

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const resultCount = document.querySelector("#result-count");

  // Clear the old results before rendering new ones
  infoEl.innerHTML = "";

  // Update the result count
  resultCount.textContent = `Showing ${data.length} result(s)`;

  // Show a message if nothing matches
  if (data.length === 0) {
    infoEl.innerHTML = "<p>No park information matches your search.</p>";
    return;
  }

  // Render the matching cards
  const html = data.map(mediaCardTemplate);
  infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

function setupSearch() {
  const searchInput = document.querySelector("#info-search");

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredLinks = parkInfoLinks.filter(function (info) {
      return info.name.toLowerCase().includes(searchTerm);
    });

    setParkInfoLinks(filteredLinks);
  });
}

setHeaderFooter(parkData);
setParkIntro(parkData);
setParkInfoLinks(parkInfoLinks);
setupSearch();
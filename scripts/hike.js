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

  // This hike intentionally has a long title,
  // long description, and missing image for testing.
  {
    name: "The Extremely Long Trail Through the Forgotten Hills of Western Neil Land",
    location: "Forgotten Hills",
    difficulty: "Moderate",
    distance: "5.9 miles",
    image: "",
    description:
      "This hike has a much longer description so we can test whether the card continues to work when there is more text than usual. The trail travels through forests, rocky hills, open fields, and several fictional ruins before reaching a viewpoint overlooking western Neil Land."
  }
];


const hikeList = document.querySelector("#hike-list");


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
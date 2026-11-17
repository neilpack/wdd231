export function hikeTemplate(hike) {
  return `
    <li class="hike-card">
      <h3>${hike.name}</h3>
      <p>Distance: ${hike.distance} miles</p>
      <p>Difficulty: ${hike.difficulty}</p>
    </li>
  `;
}

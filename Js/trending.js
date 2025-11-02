import { getWallhavenImages } from "../api/wallhaven.js";

async function loadTrending() {
  const data = await getWallhavenImages("trending");
  const container = document.getElementById("wallpapers");

  data.forEach(wall => {
    const img = document.createElement("img");
    img.src = wall.thumb;
    img.className = "wall";
    container.appendChild(img);
  });
}

loadTrending();

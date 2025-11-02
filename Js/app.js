import { getWallhavenImages } from "../api/wallhaven.js";
import { getPexelsImages } from "../api/pexels.js";
import { getUnsplashImages } from "../api/unsplash.js";

async function loadWallpapers(query) {
  const allResults = await Promise.all([
    getWallhavenImages(query),
    getPexelsImages(query),
    getUnsplashImages(query)
  ]);
  const wallpapers = allResults.flat();
  displayWallpapers(wallpapers);
}

function displayWallpapers(wallpapers) {
  const container = document.getElementById("wallpapers");
  container.innerHTML = "";

  wallpapers.forEach(wall => {
    const card = document.createElement("div");
    card.className = "wallpaper-card";

    const img = document.createElement("img");
    img.src = wall.thumb || wall.thumbnail || wall.src;
    img.alt = "Wallpaper";

    const actions = document.createElement("div");
    actions.className = "actions";

    // ❤️ Like button
    const like = document.createElement("button");
    like.className = "like-btn";
    like.innerHTML = "❤️";
    like.onclick = () => like.classList.toggle("liked");

    // ⭐ Rating
    const rating = document.createElement("div");
    rating.className = "rating";
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.textContent = "⭐";
      star.onclick = () => {
        rating.querySelectorAll("span").forEach((s, idx) => {
          s.classList.toggle("rated", idx < i);
        });
      };
      rating.appendChild(star);
    }

    // 🔗 Share button
    const share = document.createElement("button");
    share.className = "share-btn";
    share.textContent = "🔗";
    share.onclick = async () => {
      await navigator.clipboard.writeText(wall.url || wall.src);
      share.textContent = "✅";
      setTimeout(() => (share.textContent = "🔗"), 1500);
    };

    actions.append(like, rating, share);
    card.append(img, actions);
    container.appendChild(card);
  });
}

document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.trim() || "nature";
  loadWallpapers(query);
});

loadWallpapers("peach aesthetic");

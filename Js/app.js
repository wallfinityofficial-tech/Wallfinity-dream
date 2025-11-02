async function loadWallpapers(query) {
  const res = await fetch(`/api/pexels?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  const container = document.getElementById("wallpapers");
  container.innerHTML = "";

  data.photos.forEach(p => {
    const img = document.createElement("img");
    img.src = p.src.large;
    img.alt = p.photographer;
    container.appendChild(img);
  });
}

document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.trim() || "nature";
  loadWallpapers(query);
});

loadWallpapers("nature");

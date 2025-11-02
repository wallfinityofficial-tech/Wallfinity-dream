export async function getUnsplashImages(query) {
  const KEY = process.env.UNSPLASH_API_KEY;
  if (!KEY) return [];

  const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&client_id=${KEY}`);
  const data = await res.json();
  if (!data.results) return [];

  return data.results.map(p => ({
    thumb: p.urls.small,
    src: p.urls.full,
    author: p.user.name,
    url: p.links.html,
    source: "Unsplash"
  }));
}

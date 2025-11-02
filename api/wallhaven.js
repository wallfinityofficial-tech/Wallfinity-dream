export async function getWallhavenImages(query) {
  const KEY = process.env.WALLHAVEN_API_KEY;
  if (!KEY) return [];

  const res = await fetch(`https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(query)}&apikey=${KEY}`);
  const data = await res.json();
  if (!data.data) return [];

  return data.data.map(p => ({
    thumb: p.thumbs.large,
    src: p.path,
    author: p.uploader.username,
    url: p.url,
    source: "Wallhaven"
  }));
}

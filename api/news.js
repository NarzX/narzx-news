export default async function handler(req, res) {
  const { q, page = 1 } = req.query;
  const pageSize = 6;

  const API_KEY = process.env.NEWS_API_KEY;

  let url = "";

  if (q && q.trim() !== "") {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=id&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=id&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil berita" });
  }
}

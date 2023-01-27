import { baseURl, trending, TMDBKEY } from "../../src/components/tmdb";
export default async function handler(req, res) {
  const { q, page: pageno } = req.query;

  if (q) {
    const data = await fetch(
      `${baseURl}/search/multi?api_key=${TMDBKEY}&language=en-US&query=${q}&page=${pageno}`
    );
    const movies = await data.json();
    console.log({ movies });
    return res.status(200).json(movies);
  }
  res.status(404).json({ success: false, message: "resource not found " });
}

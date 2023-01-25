import { baseURl, trending, TMDBKEY } from "../../src/components/tmdb";
export default async function handler(req, res) {
  const { q } = req.query;

  // https://api.themoviedb.org/3/search/movie?api_key=a74c9d362a96073b0bc4b10675a3ab80&language=en-US&query=batman&page=1&include_adult=false
  if (q) {
    const data = await fetch(
      `${baseURl}/search/multi?api_key=${TMDBKEY}&language=en-US&query=${q}&page=1`
    );
    const movies = await data.json();
    return res.status(200).json(movies);
  }
  res.status(404).json({ success: false, message: "resource not found " });
}

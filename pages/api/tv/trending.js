import { baseURl, trendingtv, TMDBKEY } from "../../../src/components/tmdb";

export default async function handler(req, res) {
  const data = await fetch(`${baseURl}${trendingtv}?api_key=${TMDBKEY}`);
  const movies = await data.json();

  res.status(200).json(movies);
}

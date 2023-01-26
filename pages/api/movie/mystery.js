import { baseURl, TMDBKEY } from "../../../src/components/tmdb";

export default async function handler(req, res) {
  const data = await fetch(
    `${baseURl}/discover/movie?api_key=${TMDBKEY}&with_genres=9648&sort_by=popularity.desc`
  );
  const movies = await data.json();

  res.status(200).json(movies);
}

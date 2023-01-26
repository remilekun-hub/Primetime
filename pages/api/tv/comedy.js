import { baseURl, TMDBKEY } from "../../../src/components/tmdb";

export default async function handler(req, res) {
  const data = await fetch(
    `${baseURl}/discover/tv?api_key=${TMDBKEY}&with_genres=35&sort_by=popularity.desc`
  );
  const tv = await data.json();

  res.status(200).json(tv);
}

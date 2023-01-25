import { baseURl, TMDBKEY } from "../../../src/components/tmdb";

export default async function handler(req, res) {
  const { id, page: pageno } = req.query;
  const data = await fetch(
    `${baseURl}/discover/tv?api_key=${TMDBKEY}&with_genres=${id}&sort_by=popularity.desc&page=${pageno}`
  );
  const tv = await data.json();

  res.status(200).json(tv);
}

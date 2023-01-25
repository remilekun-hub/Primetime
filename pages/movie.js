import React from "react";
import Genre from "../src/components/Genre";
import Head from "next/head";

function movies() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 ms:grid-cols-3 lg:grid-cols-4">
      <Head>
        <title>PrimeTime - Movie</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Genre name="action" href={"movie/genre/28?name=Action"} />
      <Genre name="adventure" href={"movie/genre/12?name=Adventure"} />
      <Genre name="animation" href={"movie/genre/16?name=Animation"} />
      <Genre name="comedy" href={"movie/genre/35?name=Comedy"} />
      <Genre name="crime" href={"movie/genre/80?name=Crime"} />
      <Genre name="documentary" href={"movie/genre/99?name=Documentary"} />
      <Genre name="drama" href={"movie/genre/18?name=Drama"} />
      <Genre name="family" href={"movie/genre/10751?name=Family"} />
      <Genre name="fantasy" href={"movie/genre/14?name=Fantasy"} />
      <Genre name="history" href={"movie/genre/36?name=History"} />
      <Genre name="horror" href={"movie/genre/27?name=Horror"} />
      <Genre name="music" href={"movie/genre/10402?name=Music"} />
      <Genre name="mystery" href={"movie/genre/9648?name=Mystery"} />
      <Genre name="romance" href={"movie/genre/10749?name=Romance"} />
      <Genre
        name="science Fiction"
        href={"movie/genre/878?name=Science Fiction"}
      />
      <Genre name="Tv Movie" href={"movie/genre/10770?name=TV Movie"} />
      <Genre name="Thriller" href={"movie/genre/53?name=Thriller"} />
      <Genre name="War" href={"movie/genre/10752?name=War"} />
      <Genre name="western" href={"movie/genre/37?name=Western"} />
    </div>
  );
}

export default movies;

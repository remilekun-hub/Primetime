import Head from "next/head";
import React from "react";

function Movie({ data }) {
  return (
    <div className="text-white">
      <Head>
        <title>{`${data.original_title} - PrimeTime`}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      {data?.original_title}
    </div>
  );
}

export default Movie;

export const getServerSideProps = async ({ params: { id } }) => {
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=a74c9d362a96073b0bc4b10675a3ab80`
  );
  const data = await movie.json();
  return {
    props: {
      data,
    },
  };
};

import React from "react";
import { getProviders, getSession, useSession } from "next-auth/react";
import { baseURl, TMDBKEY } from "../src/components/tmdb";
import Head from "next/head";

function search({ movies, q }) {
  return (
    <div className="text-white">
      <Head>
        <title>{q ? `${q} search results ` : "Search | Primetime"}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      {movies?.results && (
        <p className="text-[16px] md:text-[25px] font-medium">{`Found ${movies?.total_results} results for "${q}"`}</p>
      )}
      <div className="mt-3 text-white relative cursor-pointer text-white grid gap-x-3 gap-y-6 sm:gap-x-4 lg:gap-x-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.results.map((d) => (
          <div key={d.id}>{d.title || d.name}</div>
        ))}
      </div>
    </div>
  );
}

export default search;

export const getServerSideProps = async (ctx) => {
  const {
    query: { q },
  } = ctx;
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  if (!q) return { props: {} };

  const data = await fetch(
    `${baseURl}/search/multi?api_key=${TMDBKEY}&language=en-US&query=${q}&page=1`
  );
  const movies = await data.json();
  return {
    props: {
      movies,
      q,
    },
  };
};

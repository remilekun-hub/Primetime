import React, { useState } from "react";
import { getProviders, getSession, useSession } from "next-auth/react";
import { baseURl, TMDBKEY } from "../src/components/tmdb";
import Head from "next/head";
import Link from "next/link";
import Image from "next/legacy/image";

function search({ movies, q }) {
  function MovieIcon() {
    return (
      <svg
        className=" text-white/80"
        fill="currentColor"
        width="13px"
        height="13px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z" />
      </svg>
    );
  }

  function TvIcon() {
    return (
      <svg
        className="text-white/80"
        fill="currentColor"
        width="13px"
        height="13px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z" />
      </svg>
    );
  }
  return (
    <div className="text-white">
      <Head>
        <title>
          {q ? `${q} - Search Results | PrimeTime ` : "Search | PrimeTime"}
        </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      {movies?.results && (
        <p className="text-[16px] md:text-[25px] font-medium">{`Found ${movies?.total_results} results for "${q}"`}</p>
      )}
      <div className="mt-3 text-white relative  text-white grid gap-x-3 gap-y-6 sm:gap-x-4 lg:gap-x-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies?.results.map((d) => (
          <div key={d.id}>
            <div className="w-full h-[110px] sm:h-[130px] md:h-[160px] lg:h-[170px]  relative cursor-pointer">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${d.backdrop_path}`}
                blurDataURL={`https://image.tmdb.org/t/p/w500/${d.backdrop_path}`}
                className="object-cover object-center rounded-[6px] md:rounded-md"
                placeholder="blur"
                layout="fill"
                alt={`${d.title}_backdrop`}
              />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-[11px] sm:text-[12px] md:text-[13px]">
                <span className="text-white/80">
                  {d.release_date?.slice(0, 4) || d.first_air_date?.slice(0, 4)}
                </span>
                <span className="w-[3px] h-[3px] rounded-full bg-white/80 ml-[7px]" />

                <div className="ml-2">
                  {d.media_type == "movie" ? (
                    <span className="flex space-x-[5px] items-center text-white/80">
                      <MovieIcon /> <span>Movie</span>
                    </span>
                  ) : (
                    <span className="flex space-x-[5px] items-center text-white/80">
                      <TvIcon /> <span>Tv</span>
                    </span>
                  )}
                </div>
              </div>
              <h4 className="max-w-full font-semibold truncate text-[12px] sm:text-[15px] md:text-[16px] lg:text-[18px]">
                {d.title || d.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="text-white text-[16px] mt-4 flex items-center justify-center">
        <span
          onClick={() => {
            if (pageIndex == 1) return;
            setPageIndex((pageIndex) => pageIndex - 1);
          }}
        >
          Previous
        </span>
        <span onClick={() => setPageIndex((pageIndex) => pageIndex + 1)}>
          Next
        </span>
        
      </div> */}
      <div>
        {movies && (
          <p className="text-[15px] sm:text-[17px] md:text-[20px] text-center">
            {`Page ${movies?.page} of ${movies?.total_pages}`}
          </p>
        )}
      </div>
      {movies && (
        <div className="text-center">
          {movies?.page > 1 ? (
            <Link href={`/search?q=${q}&page=${movies?.page + 1}`}>
              Previous
            </Link>
          ) : (
            ""
          )}
          <Link href={`/search?q=${q}&page=${movies?.page + 1}`}>next</Link>
        </div>
      )}
    </div>
  );
}

export default search;

export const getServerSideProps = async (ctx) => {
  const {
    query: { q, page },
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
    `${baseURl}/search/multi?api_key=${TMDBKEY}&language=en-US&query=${q}&page=${page}`
  );
  const movies = await data.json();
  return {
    props: {
      movies,
      q,
    },
  };
};

import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { baseURl, TMDBKEY } from "../../src/components/tmdb";
import Image from "next/legacy/image";
function Movie({ data }) {
  console.log({ data });
  return (
    <div className="text-white flex flex-col items-center gap-y-5 md:gap-y-0 md:flex-row md:items-start lg:justify-center pt-4 lg:pt-6">
      <Head>
        <title>{`${data.original_title} | PrimeTime`}</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="w-[55%] md:w-[45%] lg:w-[36%] ">
        <img
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
          alt={`${data.original_title}_poster`}
          className="object-cover object-center rounded-[5px]  h-auto md:h-[500px] w-auto mx-auto"
        />
      </div>

      <div className="md:pl-[20px] lg:pl-[20px] md:w-[55%] lg:w-[64%]">
        <div className="mb-6 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl lg:text-5xl tracking-[1px] mb-2 md:mb-3 lg:mb-4">
            {data.original_title}
          </h2>
          <p className="text-white/50 text-[14px] md:text-[18px]">
            {data.tagline}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap justify-between lg:max-w-[85%]">
          <div className="space-y-1">
            <p className="tracking-[2px] text-white/50 text-[14px] md:text-[16px] font-medium">
              Length
            </p>
            <p className="tracking-[2px] text-[14px] md:text-[16px] font-medium">{`${data.runtime} min.`}</p>
          </div>

          <div className="space-y-1">
            <p className="tracking-[2px] text-white/50 text-[14px] md:text-[16px] font-medium">
              Language
            </p>
            <p className="tracking-[2px] text-[14px] md:text-[16px] font-medium">
              English
            </p>
          </div>
          <div className="space-y-1">
            <p className="tracking-[2px] text-white/50 text-[14px] md:text-[16px] font-medium">
              Year
            </p>
            <p className="tracking-[2px] text-[14px] md:text-[16px] font-medium">
              {data.release_date.slice(0, 4)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="tracking-[2px] text-white/50 text-[14px] md:text-[16px] font-medium">
              Status
            </p>
            <p className="tracking-[2px] text-[14px] md:text-[16px] font-medium">
              {data.status}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl mb-3 font-semibold">Genres</h3>
          <div className="flex flex-wrap">
            {data.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-white mb-3 text-[#10141E] rounded-[6px] mr-[10px] font-bold px-[5px] py-[2px] text-[15px]"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl mb-3 font-semibold">Synopsis</h3>
          <p>{data.overview}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl mb-3 font-semibold">Casts</h3>
          <p>{data.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default Movie;

export const getServerSideProps = async (ctx) => {
  const {
    params: { id },
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

  const movie = await fetch(`${baseURl}/movie/${id}?api_key=${TMDBKEY}`);
  const data = await movie.json();
  return {
    props: {
      data,
    },
  };
};

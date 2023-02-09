import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { baseURl, TMDBKEY } from "../../src/components/tmdb";
function Movie({ data }) {
  const star = Array(5);
  const voteaverage = data.vote_average / 2;
  return (
    <div className="text-white flex flex-col items-center gap-y-5 md:gap-y-0 md:flex-row md:items-start lg:justify-center pt-4 lg:pt-6">
      <Head>
        <title>{`${data.title} | PrimeTime`}</title>
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
            {data.title}
          </h2>
          <p className="text-white/50 text-[14px] md:text-[18px]">
            {data.tagline}
          </p>
          <div className="flex items-center justify-center mt-3 md:justify-start ">
            <span className="text-[22px] md:text-[25px] lg:text-[30px] font-semibold mr-3">
              {voteaverage.toFixed(1)}
            </span>

            <div className="flex">
              {star.fill().map((_, i) =>
                voteaverage > i ? (
                  <span key={i}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="w-[15px] fill-white"
                    >
                      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                  </span>
                ) : (
                  <span key={i}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="w-[15px] fill-white stroke-2"
                    >
                      <path d="M287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9zM226.5 168.8C221.9 178.3 212.9 184.9 202.4 186.5L64.99 206.8L164.8 305.6C172.1 312.9 175.5 323.4 173.8 333.7L150.2 473.2L272.8 407.7C282.3 402.6 293.6 402.6 303 407.7L425.6 473.2L402.1 333.7C400.3 323.4 403.7 312.9 411.1 305.6L510.9 206.8L373.4 186.5C362.1 184.9 353.1 178.3 349.3 168.8L287.9 42.32L226.5 168.8z" />
                    </svg>
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap justify-between lg:max-w-[85%]">
          <div className="space-y-1">
            <p className="tracking-[2px] text-white/50 text-[14px] md:text-[16px] font-semibold">
              Length
            </p>
            <p className="tracking-[2px] text-[14px] md:text-[16px] font-semibold">{`${data.runtime} min.`}</p>
          </div>

          <div className="space-y-1">
            <p className="tracking-[2px] text-white/50 text-[14px] md:text-[16px] font-semibold">
              Language
            </p>
            <p className="tracking-[2px] text-[14px] md:text-[16px] font-semibold">
              English
            </p>
          </div>
          <div className="space-y-1">
            <p className="tracking-[2px] text-white/50 text-[14px] md:text-[16px] font-semibold">
              Year
            </p>
            <p className="tracking-[2px] text-[14px] md:text-[16px] font-semibold">
              {data.release_date.slice(0, 4)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="tracking-[2px] text-white/50 text-[14px] md:text-[16px] font-semibold">
              Status
            </p>
            <p className="tracking-[2px] text-[14px] md:text-[16px] font-semibold">
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
          <div className="flex flex-wrap">
            {data.credits.cast.map((c) => (
              <span
                key={c.name}
                className="px-[5px] py-[3px] border border-white rounded-[5px] mr-[8px] mb-[8px] text-[14px] font-semibold"
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 pb-5">
          <a
            href={data.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#5a6a90] px-[25px] py-[9px] rounded-[5px]"
          >
            Website
          </a>
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

  const movie = await fetch(
    `${baseURl}/movie/${id}?api_key=${TMDBKEY}&append_to_response=credits`
  );
  const data = await movie.json();
  return {
    props: {
      data,
    },
  };
};

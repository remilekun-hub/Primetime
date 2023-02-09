import React from "react";
import useSwr from "swr";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addBookmark, removeBookMark } from "../redux/slices/bookMarkSlice";
import BookmarkedIcon from "./icons/bookmarkedIcon";
import NotBookmarkedIcon from "./icons/notBookmarkedIcon";

function Row({ title, route, grid, tv, movie }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSwr(route, fetcher);
  const router = useRouter();
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);

  const checkid = (movieid, bookmarks) => {
    const bookmark = bookmarks.find((m) => m.id === movieid);

    return movieid === bookmark?.id;
  };

  function MovieIcon() {
    return (
      <svg
        className="text-white"
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
        className="text-white"
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

  if (error)
    return (
      <div className="flex items-center justify-center text-white text-[28px] pb-5">
        Error Fetching data.
      </div>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center text-white text-[28px] pb-5">
        Loading....
      </div>
    );

  return (
    <section className="pb-6 text-white">
      <p className="text-white text-[17px] font-bold sm:text-[20px] md:text-[26px] lg:text-[31px] mb-5 tracking-[.5px]">
        {title}
      </p>
      {grid ? (
        <div className=" text-white grid gap-x-4 gap-y-6 sm:gap-x-4 lg:gap-x-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {data?.results?.slice(0, 10).map((d) => (
            <div
              key={d.id}
              onClick={() => {
                router.push(`${tv ? `/tv/${d.id}` : `/movie/${d.id}`}`);
              }}
              className="relative cursor-pointer"
            >
              {checkid(d.id, bookmarks) ? (
                <div
                  className="absolute top-[10px] right-[12px] bg-black/50 p-[5px] w-9 h-9 flex items-center justify-center z-50 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeBookMark(d.id));
                  }}
                >
                  <BookmarkedIcon />
                </div>
              ) : (
                <div
                  className="absolute top-[10px] right-[12px] bg-black/50 p-[5px] w-9 h-9 flex items-center justify-center z-50 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addBookmark(d));
                  }}
                >
                  <NotBookmarkedIcon className="text-[50px] w-6 h-5 stroke-2" />
                </div>
              )}
              <div className="w-full h-[115px] sm:h-[130px] md:h-[160px] lg:h-[170px]  relative">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${d.backdrop_path}`}
                  blurDataURL={`https://image.tmdb.org/t/p/w500/${d.backdrop_path}`}
                  className="object-cover object-center rounded-[6px] md:rounded-md"
                  placeholder="blur"
                  layout="fill"
                  alt={`${d.title}_backdrop`}
                  quality={80}
                />
              </div>
              <div className="mt-2">
                <div className="flex items-center text-[11px] sm:text-[12px] md:text-[13px]">
                  <span className="text-white/80">
                    {d.release_date?.slice(0, 4) ||
                      d.first_air_date?.slice(0, 4)}
                  </span>
                  {movie ? (
                    <div className="flex items-center">
                      <span className="w-[3px] h-[3px] rounded-full bg-white/80 ml-[7px]" />
                      <span className="ml-[9px]">
                        <MovieIcon />
                      </span>{" "}
                      <span className="ml-[7px] text-white/80">Movie</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="w-[3px] h-[3px] rounded-full bg-white/80 ml-[7px]" />
                      <span className="ml-[9px]">
                        <TvIcon />
                      </span>{" "}
                      <span className="ml-[7px] text-white/80">Tv</span>
                    </div>
                  )}
                </div>

                <h4 className="max-w-full font-semibold truncate text-[12px] sm:text-[15px] md:text-[16px] lg:text-[18px]">
                  {d.title || d.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-auto space-x-4 sm:space-x-5 lg:space-x-9 whitespace-nowrap scrollbar-thin scrollbar-thumb-[#5A6A90] scrollbar-track-gray-[#10141E] scrollbar-thumb-rounded">
          {data?.results?.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer z-10 w-[230px] h-[150px] sm:w-[280px] sm:h-[175px] md:w-[330px] md:h-[210px] lg:w-[450px] lg:h-[240px] relative inline-block rounded-md md:rounded-lg "
              onClick={() => {
                router.push(
                  `${
                    movie.media_type == `movie`
                      ? `/movie/${movie.id}`
                      : `/tv/${movie.id}`
                  }`
                );
              }}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                alt={`${d.title || d.name}_backdrop`}
                layout="fill"
                blurDataURL={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                className="object-cover object-center rounded-lg filter brightness-55"
                placeholder="blur"
                quality={80}
              />

              {checkid(movie.id, bookmarks) ? (
                <div
                  className="absolute top-[10px] right-[12px] bg-black/50 p-[5px] w-9 h-9 flex items-center justify-center z-50 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeBookMark(movie.id));
                  }}
                >
                  <BookmarkedIcon />
                </div>
              ) : (
                <div
                  className="absolute top-[10px] right-[12px] bg-black/50 p-[5px] w-9 h-9 flex items-center justify-center z-50 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addBookmark(movie));
                  }}
                >
                  <NotBookmarkedIcon className="text-[50px] w-6 h-5 stroke-2" />
                </div>
              )}

              <div className="absolute bottom-[13px] sm:bottom-[15px] left-[15px] lg:bottom-[10px] sm:left-[20px] w-full">
                <div className="text-[15px] flex items-center">
                  <span className="text-white">
                    {movie?.release_date?.slice(0, 4) ||
                      movie?.first_air_date?.slice(0, 4)}
                  </span>{" "}
                  <span className="w-[3px] h-[3px] rounded-full bg-white/80 ml-[7px]" />
                  <span className="capitalize text-white font-medium ml-[6px]">
                    {movie.media_type == "movie" ? (
                      <span className="flex space-x-[5px] items-center">
                        <MovieIcon /> <span>Movie</span>
                      </span>
                    ) : (
                      <span className="flex space-x-[5px] items-center">
                        <TvIcon /> <span>Tv</span>
                      </span>
                    )}
                  </span>
                </div>
                <h4 className="text-white md:text-[19px] lg:text-[21px] font-semibold  max-w-[88%] truncate tracking-[.6px]">
                  {movie.title || movie.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Row;

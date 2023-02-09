import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSession } from "next-auth/react";
import SearchIcon from "../src/components/icons/searchicon";
import { useState } from "react";
import { removeAll, removeBookMark } from "../src/redux/slices/bookMarkSlice";
import Head from "next/head";
import Image from "next/legacy/image";
import NotBookmarkedIcon from "../src/components/icons/notBookmarkedIcon";
import BookmarkedIcon from "../src/components/icons/bookmarkedIcon";

function Bookmarks() {
  const bookmarks = useSelector((state) => state.bookmarks);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const movieSearch = () => {
    if (input) {
      return bookmarks.filter((x) =>
        (x.title || x.original_name).startsWith(input)
      );
    } else return bookmarks;
  };
  const checkid = (movieid, bookmarks) => {
    const bookmark = bookmarks.find((m) => m.id === movieid);

    return movieid === bookmark?.id;
  };
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
  return (
    <div className="text-white pb-10">
      <Head>
        <title> Bookmarks | Primetime </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <form className="py-3" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search for bookmarked movies or shows"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="flex-1  text-[16px] md:text-[25px] ml-2 sm:ml-4 bg-transparent outline-0 border-b border-transparent focus:border-b focus:border-[#5A6A90] py-2 text-white"
          />
        </div>
      </form>
      <div className="flex justify-end">
        <button
          className=" bg-[#5A6A90] px-2 py-2 rounded-[8px] text-[14px]"
          onClick={() => dispatch(removeAll())}
        >
          Remove all
        </button>
      </div>
      {bookmarks.length < 1 && (
        <p className="text-[16px] sm:text-[20px] md:text-[35px] lg:text-[30px] mb-4">
          No Movie or Tv Show bookmarked yet
        </p>
      )}
      {input ? (
        <div className="text-white">
          <div>
            <h3 className="text-[16px] sm:text-[20px] md:text-[35px] lg:text-[30px] mb-4">
              Bookmarked Movies
            </h3>
            <div className=" text-white grid gap-x-4 gap-y-6 sm:gap-x-4 lg:gap-x-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {movieSearch().map((d) => (
                <div key={d.id} className="relative">
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
                  <div className="w-full h-[110px] sm:h-[130px] md:h-[160px] lg:h-[170px]  relative">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${d.backdrop_path}`}
                      blurDataURL={`https://image.tmdb.org/t/p/w300/${d.backdrop_path}`}
                      className="object-cover object-center rounded-[6px] md:rounded-md"
                      placeholder="blur"
                      layout="fill"
                      alt={`${d.title}_backdrop`}
                    />
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center text-[11px] sm:text-[12px] md:text-[13px]">
                      <span className="text-white/80">
                        {d.release_date?.slice(0, 4) ||
                          d.first_air_date?.slice(0, 4)}
                      </span>
                      <span className="w-[3px] h-[3px] rounded-full bg-white/80 ml-[7px]" />
                      <span className="ml-[9px]">
                        <MovieIcon />
                      </span>{" "}
                      <span className="ml-[7px] text-white/80">Movie</span>
                    </div>
                    <h4 className="max-w-[95%] font-semibold truncate text-[12px] sm:text-[15px] md:text-[16px] lg:text-[18px]">
                      {d.title || d.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            {bookmarks.length > 0 && (
              <h3 className="text-[16px] sm:text-[20px] md:text-[35px] lg:text-[30px] mb-5">
                Bookmarked Movies
              </h3>
            )}
            <div className=" text-white grid gap-x-4 gap-y-6 sm:gap-x-4 lg:gap-x-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {bookmarks.map((d) => (
                <div key={d.id} className="relative">
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
                  <div className="w-full h-[110px] sm:h-[130px] md:h-[160px] lg:h-[170px]  relative">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${d.backdrop_path}`}
                      blurDataURL={`https://image.tmdb.org/t/p/w300/${d.backdrop_path}`}
                      className="object-cover object-center rounded-[6px] md:rounded-md"
                      placeholder="blur"
                      layout="fill"
                      alt={`${d.title}_backdrop`}
                    />
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center text-[11px] sm:text-[12px] md:text-[13px]">
                      <span className="text-white/80">
                        {d.release_date?.slice(0, 4) ||
                          d.first_air_date?.slice(0, 4)}
                      </span>
                      <span className="w-[3px] h-[3px] rounded-full bg-white/80 ml-[7px]" />
                      <span className="ml-[9px]">
                        <MovieIcon />
                      </span>{" "}
                      <span className="ml-[7px] text-white/80">Movie</span>
                    </div>
                    <h4 className="max-w-[95%] font-semibold truncate text-[12px] sm:text-[15px] md:text-[16px] lg:text-[18px]">
                      {d.title || d.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookmarks;
export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

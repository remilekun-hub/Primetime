import React from "react";
import useSwr from "swr";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { useSelector, useDispatch } from "react-redux";
import { addBookmark, removeBookMark } from "../redux/slices/bookMarkSlice";
import BookmarkedIcon from "./icons/bookmarkedIcon";
import NotBookmarkedIcon from "./icons/notBookmarkedIcon";

function Page({ index, id }) {
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSwr(
    `/api/movie/genre?id=${id}&page=${index}`,
    fetcher
  );
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);
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

  if (isLoading)
    return (
      <div className="flex items-center justify-center text-white text-[28px] pb-5">
        Loading....
      </div>
    );
  return (
    <div>
      <div className="relative text-white grid gap-x-3 gap-y-6 sm:gap-x-4 lg:gap-x-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.results.map((d) => (
          <div
            key={d.id}
            onClick={() => {
              router.push(`/movie/${d.id}`);
            }}
            className="relative"
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
            <div className="w-full h-[110px] sm:h-[130px] md:h-[160px] lg:h-[170px]  relative">
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
                  {d.release_date?.slice(0, 4)}
                </span>
                <span className="w-[3px] h-[3px] rounded-full bg-white/80 ml-[7px]" />
                <span className="ml-[9px]">
                  <MovieIcon />
                </span>{" "}
                <span className="ml-[7px] text-white/80">Movie</span>
              </div>
              <h4 className="max-w-full font-semibold truncate text-[12px] sm:text-[15px] md:text-[16px] lg:text-[18px]">
                {d.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {data && (
        <p className="text-[14px] sm:text-[16px] md:text-[20px] lg:text-[25px] text-center">
          {`Page ${data?.page} of ${data?.total_pages}`}
        </p>
      )}
    </div>
  );
}

export default Page;

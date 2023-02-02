import React from "react";
import useSwr from "swr";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { useSelector, useDispatch } from "react-redux";
import { addBookmark, removeBookMark } from "../redux/slices/bookMarkSlice";
import NotBookmarkedIcon from "./icons/notBookmarkedIcon";
import BookmarkedIcon from "./icons/bookmarkedIcon";

function PageTv({ index, id }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSwr(
    `/api/tv/genre?id=${id}&page=${index}`,
    fetcher
  );
  const router = useRouter();
  const checkid = (movieid, bookmarks) => {
    const bookmark = bookmarks.find((m) => m.id === movieid);

    return movieid === bookmark?.id;
  };
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();

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

  if (isLoading)
    return (
      <div className="flex items-center justify-center text-white text-[28px] pb-5">
        Loading....
      </div>
    );

  return (
    <div className="text-white">
      <div className="relative text-white grid gap-x-3 gap-y-6 sm:gap-x-4 lg:gap-x-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.results.map((d) => (
          <div
            key={d.id}
            onClick={() => {
              router.push(`/tv/${d.id}`);
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
                blurDataURL={`https://image.tmdb.org/t/p/w300/${d.backdrop_path}`}
                className="object-cover object-center rounded-[6px] md:rounded-md"
                placeholder="blur"
                layout="fill"
                alt={`${d.name}_backdrop`}
              />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-[11px] sm:text-[12px] md:text-[13px]">
                <span className="text-white/80">
                  {d.first_air_date?.slice(0, 4)}
                </span>
                <span className="w-[3px] h-[3px] rounded-full bg-white/80 ml-[7px]" />
                <span className="ml-[9px]">
                  <TvIcon />
                </span>{" "}
                <span className="ml-[7px] text-white/80">Tv</span>
              </div>
              <h4 className="max-w-full font-semibold truncate text-[12px] sm:text-[15px] md:text-[16px] lg:text-[18px]">
                {d.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageTv;

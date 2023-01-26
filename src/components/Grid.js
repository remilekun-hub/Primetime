import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBookmark, removeBookMark } from "../redux/slices/bookMarkSlice";
import BookmarkedIcon from "./icons/bookmarkedIcon";
import NotBookmarkedIcon from "./icons/notBookmarkedIcon";

function Grid({ title, data }) {
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
  return (
    <div>
      <p className="text-white text-[16px] sm:text-[20px] md:text-[26px] lg:text-[35px] mb-4 tracking-[.5px]">
        {title}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.results?.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer z-10 w-[200px] h-[150px] sm:w-[250px] sm:h-[175px] md:w-[300px] md:h-[210px] lg:w-[450px] lg:h-[220px] relative inline-block rounded-md md:rounded-lg "
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
            hello
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;

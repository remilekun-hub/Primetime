import Head from "next/head";
import React from "react";
import { getSession } from "next-auth/react";
import { TMDBKEY, baseURl } from "../../../src/components/tmdb";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/legacy/image";
import {
  addBookmark,
  removeBookMark,
} from "../../../src/redux/slices/bookMarkSlice";
import BookmarkedIcon from "../../../src/components/icons/bookmarkedIcon";
import NotBookmarkedIcon from "../../../src/components/icons/notBookmarkedIcon";
import Link from "next/link";

function Genre({ id, name, tv }) {
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

  return (
    <div className="text-white">
      <Head>
        <title>{`${name} | PrimeTime`}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <p className="mb-5 text-white text-[18px] sm:text-[20px] md:text-[26px] lg:text-[35px] capitalize">
        {name}
      </p>

      <div className="relative text-white grid gap-x-3 gap-y-6 sm:gap-x-4 lg:gap-x-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tv.results.map((d) => (
          <div
            key={d.id}
            onClick={() => {
              router.push(`/tv/${d.id}`);
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

      {tv && (
        <div className="py-8 flex items-center justify-center gap-x-3">
          <Link
            href={`/tv/genre/${id}?name=${name}&page=${
              tv.page < tv.total_pages ? tv.page - 1 : tv.page
            }`}
            className={`text-[19px] font-semibold tracking-[2px] border rounded-md px-3 py-2 ${
              tv.page <= 1 ? "hidden" : ""
            }`}
          >
            Prev
          </Link>
          <Link
            href={`/tv/genre/${id}?name=${name}&page=${
              tv.page < tv.total_pages ? tv.page + 1 : tv.page
            }`}
            className={`text-[19px] font-semibold tracking-[2px] border rounded-md px-3 py-2 ${
              tv.page === tv.total_pages ? "hidden" : ""
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}

export default Genre;

export const getServerSideProps = async (ctx) => {
  const {
    params: { id },
    query: { name, page },
  } = ctx;
  const Page = page || 1;
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  const data = await fetch(
    `${baseURl}/discover/tv?api_key=${TMDBKEY}&with_genres=${id}&sort_by=popularity.desc&page=${Page}`
  );
  const tv = await data.json();
  return {
    props: {
      id,
      name,
      tv,
    },
  };
};

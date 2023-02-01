import React from "react";
import Link from "next/link";
import MovieIcon from "./icons/movieicon";
import BookmarkIcon from "./icons/bookmarkicon";
import TvIcon from "./icons/tvicon";
import HomeIcon from "./icons/HomeIcon";
import Logo from "./icons/logo";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  return (
    <div className=" sticky top-0 z-[900] flex justify-between items-center lg:flex-col lg:items-center bg-[#171E31] md:top-0 md:rounded-[15px] px-4 md:px-5 md:mx-5  py-6 lg:py-7 lg:mx-0 lg:fixed lg:top-7 lg:h-[91vh] lg:left-6">
      <Link href="/">
        <Logo />
      </Link>
      <div className="space-x-[20px] sm:space-x-6 md:space-x-9 items-center lg:space-x-0 flex lg:flex-col lg:space-y-8 lg:mt-[56px]">
        <Link href="/">
          <HomeIcon />
        </Link>
        <Link href="/movie">
          <MovieIcon />
        </Link>

        <Link href="/tv">
          <TvIcon />
        </Link>

        <Link href="/bookmarks">
          <BookmarkIcon />
        </Link>
      </div>
      <div className="lg:mt-auto">
        {session ? (
          <div onClick={() => signOut()} className="cursor-pointer">
            <img
              src={session?.user?.image}
              alt={session?.user?.name}
              className="w-8 h-8 lg:w-9 lg:h-9 rounded-full"
            />
          </div>
        ) : (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#5A6A90"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke=""
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

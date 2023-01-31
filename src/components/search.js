import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import SearchIcon from "./icons/SearchIcon";

function Search() {
  const [query, setquery] = useState("");
  const router = useRouter();

  return (
    <form className="pt-3 pb-4">
      <div className="flex items-center">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search for Movies or TV series"
          value={query}
          onChange={(e) => setquery(e.target.value)}
          className="flex-1  text-[16px] md:text-[25px] ml-2 sm:ml-4 bg-transparent outline-0 border-b border-transparent focus:border-b focus:border-[#5A6A90] py-2 text-white"
        />
        <button
          className="text-white bg-[#5A6A90] ml-2 px-2 py-2 rounded-[8px] text-[14px]"
          onClick={(e) => {
            e.preventDefault();
            if (!query) return;
            router.push(`/search?q=${query}&page=${1}`);
            setquery("");
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;

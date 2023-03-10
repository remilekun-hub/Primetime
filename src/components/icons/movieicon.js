import React from "react";
import { useRouter } from "next/router";
import Tooltip from "rc-tooltip";

function MovieIcon() {
  const router = useRouter();

  return (
    <Tooltip
      placement="bottom"
      trigger={["hover"]}
      overlay={<span className="text-md  tracking-[1px]">Movies</span>}
    >
      <svg
        className={` hover:text-[#FC4747] transition-bg duration-300 ${
          router.pathname == "/movies" ? "text-white" : "text-[#5A6A90]"
        }`}
        fill="currentColor"
        width="1.1rem"
        height="1.1rem"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z" />
      </svg>
    </Tooltip>
  );
}

export default MovieIcon;

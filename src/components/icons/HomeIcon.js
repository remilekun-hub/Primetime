import React from "react";
import { useRouter } from "next/router";
import Tooltip from "rc-tooltip";

function HomeIcon() {
  const router = useRouter();
  return (
    <Tooltip
      placement="bottom"
      trigger={["hover"]}
      overlay={<span className="text-md  tracking-[1px]">Home</span>}
    >
      <svg
        className={` hover:text-[#FC4747] transition-bg duration-300 ${
          router.pathname == "/" ? "text-white" : "text-[#5A6A90]"
        }`}
        fill="currentColor"
        width="1.1rem"
        height="1.1rem"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z" />
      </svg>
    </Tooltip>
  );
}

export default HomeIcon;

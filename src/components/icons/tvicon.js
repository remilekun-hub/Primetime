import React from "react";
import { useRouter } from "next/router";
import Tooltip from "rc-tooltip";

function TvIcon() {
  const router = useRouter();
  return (
    <Tooltip
      placement="bottom"
      trigger={["hover"]}
      overlay={<span className="text-md  tracking-[1px]">Tv</span>}
    >
      <svg
        className={` hover:text-[#FC4747] transition-bg duration-300 ${
          router.pathname == "/tv" ? "text-white" : "text-[#5A6A90]"
        }`}
        fill="currentColor"
        width="1.1rem"
        height="1.1rem"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z" />
      </svg>
    </Tooltip>
  );
}

export default TvIcon;

import React from "react";
import { useRouter } from "next/router";

function Card({ data }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/movie/${data.id}}`);
      }}
      className="text-white"
    >
      <h4 className="text-white md:text-[19px] lg:text-[21px] font-semibold  max-w-[88%] truncate tracking-[.6px]">
        {/* {data.title || data.original_name} */}
        {data.title}
      </h4>
    </div>
  );
}

export default Card;

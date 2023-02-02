import React from "react";
import Link from "next/link";

function Genre({ name, href }) {
  return (
    <Link
      href={href}
      className="text-white bg-[#171e31] font-semibold py-12 text-[18px] tracking-[1px] text-center capitalize rounded-md"
    >
      {name}
    </Link>
  );
}

export default Genre;

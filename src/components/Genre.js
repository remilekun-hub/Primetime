import React from "react";
import Link from "next/link";

function Genre({ name, href }) {
  return (
    <Link href={href} className="text-white text-center capitalize">
      {name}
    </Link>
  );
}

export default Genre;

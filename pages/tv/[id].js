import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

function Tv({ data }) {
  return (
    <div className="text-white">
      <Head>
        <title>{`${data.original_name} - PrimeTime`}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      {data?.original_name}
    </div>
  );
}

export default Tv;

export const getServerSideProps = async (ctx) => {
  const {
    params: { id },
  } = ctx;
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const movie = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=a74c9d362a96073b0bc4b10675a3ab80`
  );
  const data = await movie.json();
  return {
    props: {
      data,
    },
  };
};

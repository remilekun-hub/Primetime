import React, { useState } from "react";
import Head from "next/head";
import Page from "../../../src/components/Page";
import { getSession } from "next-auth/react";

function Genre({ id, name }) {
  const [pageIndex, setPageIndex] = useState(1);
  return (
    <div className="text-white">
      <Head>
        <title>{`${name} | PrimeTime`}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <p className="mb-5 text-white text-[18px] sm:text-[20px] md:text-[26px] lg:text-[35px] capitalize">
        {name}
      </p>
      <Page index={pageIndex} id={id} />
      <div className="hidden">
        <Page index={pageIndex + 1} id={id} />
      </div>
      <div className="text-white text-[16px] mt-4 flex items-center justify-center">
        <span
          onClick={() => {
            if (pageIndex == 1) return;
            setPageIndex((pageIndex) => pageIndex - 1);
          }}
        >
          Previous
        </span>
        <span onClick={() => setPageIndex((pageIndex) => pageIndex + 1)}>
          Next
        </span>
      </div>
    </div>
  );
}

export default Genre;

export const getServerSideProps = async (ctx) => {
  const {
    params: { id },
    query: { name },
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

  return {
    props: {
      id,
      name,
    },
  };
};

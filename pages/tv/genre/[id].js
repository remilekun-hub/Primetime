import Head from "next/head";
import React, { useState } from "react";
import PageTv from "../../../src/components/PageTv";
import { getSession } from "next-auth/react";

function Genre({ id, name }) {
  const [pageIndex, setPageIndex] = useState(1);
  return (
    <div>
      <Head>
        <title>{`PrimeTime - ${name}`}</title>
      </Head>
      <p className="mb-5 text-white text-[18px] sm:text-[20px] md:text-[26px] lg:text-[35px] capitalize">
        {name}
      </p>
      <PageTv index={pageIndex} id={id} />

      <div className="hidden">
        <PageTv index={pageIndex + 1} id={id} />
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

export const getServerSideProps = async ({
  params: { id },
  query: { name },
}) => {
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

import React from "react";
import { getProviders, getSession, signIn } from "next-auth/react";
import Head from "next/head";

function auth({ providers }) {
  return (
    <div className=" ">
      <Head>
        <title>Sign In - Primetime</title>
      </Head>
      <p className="text-[23px] text-white mt-[15px]">You are not signed in</p>
      <div className="text-white flex justify-center items-center py-[120px]">
        <div>
          {Object.values(providers).map((auth) => (
            <button
              onClick={() => signIn(auth.id, { callbackUrl: "/" })}
              className="border p-3 text-[18px] outline-none transition font-semibold hover:bg-[#5A6A90] hover:border-[#5A6A90]"
            >
              Sign in with {auth.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default auth;
export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const provider = await getProviders();
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanet: false,
      },
    };
  }

  return {
    props: {
      providers: provider,
    },
  };
};

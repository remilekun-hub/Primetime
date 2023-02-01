import Head from "next/head";
import React from "react";
import Genre from "../src/components/Genre";
import { getSession } from "next-auth/react";

function tv() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 ms:grid-cols-3 lg:grid-cols-4">
      <Head>
        <title> Tv | Primetime </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Genre name="action & Adventure" href={"tv/genre/10759?name=Action"} />
      <Genre name="animation" href={"tv/genre/16?name=Animation"} />
      <Genre name="comedy" href={"tv/genre/35?name=Comedy"} />
      <Genre name="crime" href={"tv/genre/80?name=Crime"} />
      <Genre name="documentary" href={"tv/genre/99?name=Documentary"} />
      <Genre name="drama" href={"tv/genre/18?name=Drama"} />
      <Genre name="family" href={"tv/genre/10751?name=Family"} />
      <Genre name="kids" href={"tv/genre/10762?name=Kids"} />
      <Genre name="mystery" href={"tv/genre/9648?name=Mystery"} />
      <Genre name="news" href={"tv/genre/10763?name=News"} />
      <Genre name="reality" href={"tv/genre/10764?name=Reality"} />
      <Genre
        name="sci-Fi & fantasy"
        href={"tv/genre/10765?name=Sci-Fi & Fantasy"}
      />
      <Genre name="soap" href={"tv/genre/10766?name=Soap"} />
      <Genre name="talk" href={"tv/genre/10767?name=Talk"} />
      <Genre
        name="War & Politics"
        href={"tv/genre/10768?name=War & Politics"}
      />
      <Genre name="western" href={"tv/genre/37?name=Western"} />
    </div>
  );
}

export default tv;

export const getServerSideProps = async (ctx) => {
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
    props: {},
  };
};

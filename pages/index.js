import Head from "next/head";
import Row from "../src/components/Row";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home | PrimeTime</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Row title="Trending Movies" route="/api/movie/trending" />
      <Row title="Crime Movies" route="/api/movie/crime" grid movie />
      <Row title="Mystery Movies" route="/api/movie/mystery" grid movie />
      <Row title="Trending Tv" route="/api/tv/trending" />
      <Row title="Comedy Tv" route="/api/tv/comedy" grid tv />
      <Row title="Sci-Fi Tv" route="/api/tv/scifi" grid tv />
    </div>
  );
}

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

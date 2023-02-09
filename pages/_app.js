import { SessionProvider } from "next-auth/react";
import Layout from "../src/components/Layout";
import "../styles/globals.css";
import "@fontsource/outfit/200.css";
import "@fontsource/outfit/300.css";
import { store, persistor } from "../src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Router from "next/router";
import Nprogress from "nprogress";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  Nprogress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", () => {
    Nprogress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    Nprogress.done();
  });

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;

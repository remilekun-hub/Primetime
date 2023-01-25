import { SessionProvider } from "next-auth/react";
import Layout from "../src/components/Layout";
import "../styles/globals.css";
import "@fontsource/outfit/200.css";
import "@fontsource/outfit/300.css";
import { store, persistor } from "../src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;

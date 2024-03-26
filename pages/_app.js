import Layout from "./layout";
import "../styles/global.css";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>
  );
}

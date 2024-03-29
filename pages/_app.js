import { useRouter } from "next/router";
import Layout from "./layout";
import "../styles/global.css";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Layout>
      <SessionProvider>
        <Component {...pageProps} key={router.asPath} />
      </SessionProvider>
    </Layout>
  );
}

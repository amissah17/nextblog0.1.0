import "@/styles/globals.css";
import Layout from "../Components/Layout";
import Nav from "../Components/Nav";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

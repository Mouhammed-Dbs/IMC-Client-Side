import HomeLayout from "@/layouts/HomeLayout";
import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  if (router.asPath == "/login") {
    return (
      <main>
        <Component {...pageProps} />
      </main>
    );
  } else if (router.asPath.includes("account")) {
    return (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    );
  } else {
    return (
      <HomeLayout>
        <Component {...pageProps} />
      </HomeLayout>
    );
  }
}

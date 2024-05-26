import MainNavbarNavbar from "@/components/MainNavbar";
import { Spinner } from "@nextui-org/react";
import { createContext, useEffect, useState } from "react";
import { isUserLogged } from "../../public/global_functions/auth";
import { useRouter } from "next/router";
export const MainContext = createContext();
export default function MainLayout(props) {
  const router = useRouter();
  const [mount, setMount] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setMount(true);
    isUserLogged()
      .then((result) => {
        if (result.error) {
          router.replace("/login");
        } else {
          setUserInfo(result.data.user);
          setMount(true);
          setPageLoading(false);
        }
      })
      .catch(async (err) => {
        await router.replace("/login");
        setPageLoading(false);
      });
  }, []);

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner />
      </div>
    );
  }
  if (!mount)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center py-5">
        <p className="text-2xl">الرجاء الإنتظار..</p>
        <Spinner />
      </div>
    );

  return (
    <div className="w-screen fixed">
      <MainNavbarNavbar name={userInfo?.name} />
      <main className="w-full h-full" style={{ direction: "rtl" }}>
        <MainContext.Provider value={{ userInfo, setUserInfo }}>
          {props.children}
        </MainContext.Provider>
      </main>
    </div>
  );
}

import MainNavbarNavbar from "@/components/MainNavbar";
import { Spinner } from "@nextui-org/react";
import { createContext, useEffect, useState } from "react";
import { isUserLogged } from "../../public/global_functions/auth";
import { useRouter } from "next/router";
export const MainContext = createContext();
export default function MainLayout(props) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    isUserLogged()
      .then((result) => {
        if (result.error) {
          router.replace("/login");
        } else {
          setUserInfo(result.data.user);
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

  return (
    <div className="w-screen fixed">
      <MainNavbarNavbar />
      <main className="w-full h-full">
        <MainContext.Provider value={userInfo}>
          {props.children}
        </MainContext.Provider>
      </main>
    </div>
  );
}

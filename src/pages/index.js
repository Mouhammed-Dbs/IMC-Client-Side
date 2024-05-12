import { Button } from "@nextui-org/react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isUserLogged } from "../../public/global_functions/auth";
import { useRouter } from "next/router";


const monto = Montserrat({ subsets: ["latin"] });
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    isUserLogged()
      .then((result) => {
        if (!result.error) {
          setLogin(true);
        }
        setLoading(false);
      })
      .catch(async (err) => {
        setLogin(true)
        setLoading(false);
      });
  }, []);
  return (
    <div className={`overflow-hidden${monto.className}`}>
      <div className="shadow-md shadow-blue-400 md:flex bg-blue-300 py-10 drop-shadow-lg">
        <div className="w-full bg-white  flex justify-center">
          <Image
            width={1000}
            height={1000}
            src="/image/2.jpg"
            alt="Description of the image"
            className="self-center w-fit md:w-full h-64 md:h-80 "
          />
        </div>
        <div className="h-80 w-full bg-white self-center py-9 text-lg px-7  rounded-x">
          <p style={{ direction: 'rtl' }}>
            مرحبًا بك في موقعنا لتشخيص الأمراض النفسية، نحن هنا لمساعدتك وتقديم
            الدعم
            مرحبًا بك في موقعنا لتشخيص الأمراض النفسية، نحن هنا لمساعدتك وتقديم
            مرحبًا بك في موقعنا لتشخيص الأمراض النفسية، نحن هنا لمساعدتك وتقديم
            مرحبًا بك في موقعنا لتشخيص الأمراض النفسية، نحن هنا لمساعدتك وتقديم
            مرحبًا بك في موقعنا لتشخيص الأمراض النفسية، نحن هنا لمساعدتك وتقديم
            مرحبًا بك في موقعنا لتشخيص الأمراض النفسية، نحن هنا لمساعدتك وتقديم
          </p>
        </div>

      </div>
      <div className="flex flex-col w-full justify-center items-center bg-gradient-to-r from-blue-300 to-white p-2 shadow-lg ">
        {/* <div className=" justify-center items-center h-32 w-1/2 border-2 border-blue-600 bg-white rounded-xl  p-2"> */}
        <p className="text-2xl p-1 ">Welcom in IMC </p>
        <p className="text-medium p-1">Welcome! Please sign up or access your account to get started.</p>
        {!loading && (isLogin ? <Button
          className={`text-slate-700 rounded-lg border-2 bg-white px-2 py-1 mx-1 font-bold`}
          onClick={() => {
            { router.replace("/account") }
          }}
        >
          Go My Account
        </Button> : <Button
          className={`text-slate-700 rounded-lg border-2 bg-white px-2 py-1 mx-1 font-bold`}
          onClick={() => {
            { router.replace("/login") }
          }}
        >
          Signup
        </Button>)}

      </div>
    </div>

    // </div>
  );
}

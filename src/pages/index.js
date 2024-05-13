import { Button } from "@nextui-org/react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isUserLogged } from "../../public/global_functions/auth";
import { useRouter } from "next/router";
import TypingText from "@/components/utils/TypingText";


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
      <div className="shadow-md shadow-blue-400 bg-blue-300 pb-8 drop-shadow-lg">
        <div className="md:flex py-5 bg-white">
          <div className="h-80 w-full self-center py-9 text-lg px-7 rounded-x" style={{ direction: 'rtl' }}>
            <TypingText className="mb-2"
              sentences={
                [{ text: "هل عانيت من أمراض نفسية من قبل وشعرت بالتردد إزاء الذهاب لعيادة نفسية؟", font: 1 },
                { text: "هل شعرت بالخجل من استشارتك لطبيب نفسي سابقا؟", font: 1 },
                { text: "نحن فريق IMC وجدنا لك الحل لكل هذه المشاكل، نحن ندرك أن البحث عن الدعم الصحي النفسي يمكن أن يكون تحديًا، ولذا نسعى لتقديم بيئة آمنة وموثوقة حيث يمكن للأفراد الحصول على المعرفة والإرشاد الذي يحتاجونه من قبل أطباء نفسيين اختصاصيين مهمتنا هي تقديم خدمات مفيدة للمساعدة في تشخيص الامراض النفسية بمساعدة الذكاء الاصطناعي أطباء اختصاصيين لمراجعة حالات التشخيص ووصف خطة علاجية مناسبة", font: 0 }]} />
            <br />
          </div>
          <div className="w-3/5 flex justify-center">
            <Image
              width={1000}
              height={1000}
              src="/image/homeimg.png"
              alt="Description of the image"
              className="self-center w-fit  h-64 md:h-80 "
            />
          </div>
        </div>
      </div>
      <div style={{ direction: 'rtl' }} className="flex flex-col w-full justify-center items-center bg-gradient-to-r from-blue-300 to-white p-10 shadow-lg ">
        {/* <div className=" justify-center items-center h-32 w-1/2 border-2 border-blue-600 bg-white rounded-xl  p-2"> */}
        <p className="text-4xl p-3 "> اهلا وسهلا بك في موقعنا IMC</p>
        {/* <p className="text-2xl p-4 pb-10">{!loading && (isLogin ? "يرجى الانتظار ..." : "رحبا! قم بأنشاء حساب")}</p> */}
        {!loading ? (<Button
          className={`text-slate-700 rounded-lg border-2 bg-white px-4 py-2 mx-1 font-bold mt-5`}
          onClick={() => {
            if (isLogin)
              router.push("/account")
            else
              router.replace("/login")
          }}
        >
          {isLogin ? "ابدأ" : "إنشاء حساب أو تسجيل دخول"}
        </Button>) : <p>الرجاء الانتظار..</p>}

      </div>
    </div>

    // </div>
  );
}

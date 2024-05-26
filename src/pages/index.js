import { Button } from "@nextui-org/react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isUserLogged } from "../../public/global_functions/auth";
import { useRouter } from "next/router";
import TypingText from "@/components/utils/TypingText";
import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";

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
        setLogin(true);
        setLoading(false);
      });
  }, []);
  return (
    <div
      className={`flex flex-col items-center py-14 bg-white md:h-dvh ${monto.className}`}
      style={{ direction: "rtl" }}
    >
      <div className="md:flex w-full px-10 text-xl">
        <div className="w-full md:w-2/5 flex justify-center">
          <Image
            width={1000}
            height={1000}
            src="/image/index_page.jpg"
            alt="Description of the image"
            className="self-center w-fit h-52 md:h-64"
          />
        </div>
        <div className="w-[90%] md:mr-10 mt-8 md:mt-0 pt-0 md:pt-8">
          <p className="font-bold text-blue-800">
            {
              "هل عانيت من أمراض نفسية من قبل وشعرت بالتردد إزاء الذهاب لعيادة نفسية؟"
            }
          </p>
          <p className="font-bold text-blue-800 mt-3">
            {"هل شعرت بالخجل من استشارتك لطبيب نفسي سابقا؟"}
          </p>
          <TypingText
            className="mb-2"
            sentences={[
              {
                text: "نحن فريق IMC وجدنا لك الحل لكل هذه المشاكل، نحن ندرك أن البحث عن الدعم الصحي النفسي يمكن أن يكون تحديًا، ولذا نسعى لتقديم بيئة آمنة وموثوقة حيث يمكن للأفراد الحصول على المعرفة والإرشاد الذي يحتاجونه من قبل أطباء نفسيين اختصاصيين مهمتنا هي تقديم خدمات مفيدة للمساعدة في تشخيص الامراض النفسية بمساعدة الذكاء الاصطناعي أطباء اختصاصيين لمراجعة حالات التشخيص ووصف خطة علاجية مناسبة",
                font: 0,
              },
            ]}
          />
        </div>
      </div>

      {!loading ? (
        <Button
          className={`rounded-lg bg-blue-500 shadow-md py-2 px-4 mx-1  mt-10 text-lg text-white`}
          onClick={() => {
            if (isLogin) router.push("/account");
            else router.replace("/login");
          }}
        >
          {isLogin ? "ابدأ الآن" : "إنشاء حساب أو تسجيل دخول"}
          <HiMiniArrowLeftStartOnRectangle className="h-6 w-6" />
        </Button>
      ) : (
        <p className="mt-10">الرجاء الانتظار..</p>
      )}

    </div>

    // </div>
  );
}

import { Montserrat } from "next/font/google";
import Image from "next/image";


const monto = Montserrat({ subsets: ["latin"] });
export default function Home() {
  return (
    <div className={`overflow-hidden${monto.className}`}>
      <div className="flex flex-col justify-items-center h-full text-center">
        <Image
          width={1000}
          height={1000}
          src="/image/2.jpg"
          alt="Description of the image"
          className="object-fill w-full h-screen pb-1 m-0"
        />

        <h1 className=" absolute text-white text-2xl font-bold bottom-28 right-20 max-w-md h-36   py-6  bg-slate-700 rounded-xl shadow-2xl text-center">
          <p>
            مرحبًا بك في موقعنا لتشخيص الأمراض النفسية، نحن هنا لمساعدتك وتقديم
            الدعم
          </p>
        </h1>
      </div>
    </div>
  );
}

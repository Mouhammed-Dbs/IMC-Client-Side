import { Montserrat } from "next/font/google";
import Image from "next/image";


const monto = Montserrat({ subsets: ["latin"] });
export default function Home() {
  return (
    <div className={`overflow-hidden${monto.className}`}>
      <div className="shadow-sm md:flex bg-slate-100 py-10 px-5">
        <div className="w-full bg-white flex justify-center">
          <Image
            width={1000}
            height={1000}
            src="/image/2.jpg"
            alt="Description of the image"
            className="self-center w-fit md:w-full h-64 md:h-80 rounded-lg rounded-r-none"
          />
        </div>
        <div className="h-80 w-full bg-white self-center py-9 text-lg px-7 md:px-5 rounded-x">
          <p>
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
    </div>
  );
}

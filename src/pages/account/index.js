import DoctorCard from "@/components/DoctorCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { getDoctors } from "../../../public/global_functions/doctor";

export default function Index() {
  const [sessionsUser, setSessionsUser] = useState([]);
  const [loading, setLaoding] = useState(true);
  useEffect(() => {
    getDoctors()
      .then((res) => {
        if (res.error == false) setSessionsUser(res.data);
        setLaoding(false);
      })
      .catch((err) => {
        setLaoding(false);
      });
  }, []);
  return (
    <div className="bg-slate-100 h-screen overflow-y-scroll no-scrollbar pb-24">
      <div className="bg-blue-300/85 md:flex p-10 w-full shadow-md">
        <Image
          width={4000}
          height={3000}
          src="/image/doctors_page.png"
          alt="Description of the image"
          className="self-center  w-fit h-64 md:h-80 pb-1 rounded-lg"
        />
        <div className="h-fit w-full self-center py-9 md:px-10 rounded-xl">
          <p className="text-2xl">
            {"مرحبًا بك في خدمة الدعم النفسي عبر الإنترنت"}
          </p>
          <p className="text-lg">
            {
              "نحن نقدم خدمة الدعم النفسي عبر الإنترنت لتقديم الدعم في اللحظات التي تحتاج فيها إلى الحديث مع شخص مؤهل قبل أن تبدأ في الدردشة مع الشات بوت يتعين عليك اختيار طبيبك المشرف الذي سيكون مسؤولًا عن مراقبة الجلسة"
            }
          </p>
          <br />
          <p className="text-lg">
            <b>كيف تختار طبيبك؟</b>
            <br /> يرجى قراءة معلومات كل طبيب من القائمة أدناه واختر الطبيب
            المشرف المناسب على الجلسة وبمجرد اختيارك للطبيب ستتمكن من بدء الجلسة
            مع شات بوت لمشاركة مشاكلك والحصول على الدعم
          </p>
          <br />
          <p className="text-sm">
            يرجى ملاحظة أن جميع الأطباء المدرجين مؤهلون ومختصون في مجال الدعم
            النفسي، وسيكونون مستعدين لمساعدتك في أي وقت
          </p>
        </div>
      </div>

      {!loading ? (
        <div className="bg-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center pb-10 px-4 md:px-10 py-5 md:gap-5 lg:gap-8">
          {sessionsUser.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              name={doctor.name}
              username={doctor.username}
              gender={doctor.gender}
              des={doctor.description}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center py-5">
          <Spinner />
        </div>
      )}
    </div>
  );
}

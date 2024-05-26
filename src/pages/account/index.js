import DoctorCard from "@/components/DoctorCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { getDoctors } from "../../../public/global_functions/doctor";
import { createSession } from "../../../public/global_functions/session";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLaodingDoctors] = useState(true);
  const [loadingCreateSession, setLoadingCreateSession] = useState(false);
  const [selectedSyrianDialect, setSelectedSyrianDialect] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  useEffect(() => {
    getDoctors()
      .then((res) => {
        if (res.error == false) setDoctors(res.data);
        setLaodingDoctors(false);
      })
      .catch((err) => {
        setLaodingDoctors(false);
      });
  }, []);

  const createNewSession = async () => {
    setLoadingCreateSession(true);
    try {
      const res = await createSession(
        selectedDoctorId,
        selectedSyrianDialect ? "sy" : "ar"
      );
      setLoadingCreateSession(false);
      onClose();
      if (!res.error)
        router.push("/account/chat?sessionId=" + res.data.sessionId);
    } catch (err) {
      setLoadingCreateSession(false);
      onClose();
    }
  };

  return (
    <div className="bg-slate-100 h-screen overflow-y-scroll no-scrollbar pb-24">
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
        style={{ direction: "rtl" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 pr-10">
                إنشاء جلسة
                {loadingCreateSession && <Spinner size="sm" />}
              </ModalHeader>
              <ModalBody>
                <p>
                  يمكنك تفعيل الخيار أدناه ليتمكن المساعد الافتراضي من طرح
                  الأسئلة عليك باللهجة السورية
                </p>
                <div className="flex items-center gap-3">
                  <input
                    checked={selectedSyrianDialect}
                    className="w-4 h-4"
                    type="checkbox"
                    onChange={(e) => {
                      setSelectedSyrianDialect(!selectedSyrianDialect);
                    }}
                  />
                  <label className="font-bold">تفعيل اللهجة السورية</label>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={loadingCreateSession}
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setSelectedDoctorId(null);
                    onClose();
                  }}
                >
                  إلغاء
                </Button>
                <Button
                  isDisabled={loadingCreateSession}
                  color="primary"
                  onPress={createNewSession}
                >
                  إنشاء
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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

      {!loadingDoctors ? (
        <div className="bg-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center pb-10 px-4 md:px-10 py-5 md:gap-5 lg:gap-8">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              name={doctor.name}
              username={doctor.username}
              gender={doctor.gender}
              des={doctor.description}
              onSelect={() => {
                setSelectedDoctorId(doctor._id);
                onOpen();
              }}
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

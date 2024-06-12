import SessionCard from "@/components/SessionCard";
import { MainContext } from "@/layouts/MainLayout";
import { Avatar, Button, Card, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getUserSessions } from "../../../public/global_functions/session";
import { TbCameraPlus } from "react-icons/tb";
import { useRouter } from "next/router";

export default function Profile({ user }) {
  const router = useRouter();
  const ScrollRef = useRef();
  const [widthScreen, setWidthScreen] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userInfo } = useContext(MainContext);
  const [sessions, setSessions] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const handleScroll = (type) => {
    let scrollAmount = 0;
    scrollAmount = widthScreen > 660 ? 665 : 300;
    if (type === "l") {
      scrollAmount = scrollAmount * -1;
    }
    ScrollRef.current.scrollLeft += scrollAmount;
  };
  const getNumOpenedSessions = (ses) => ses.filter(session => session.statusFinished === false);
  const getSessions = async () => {
    try {
      const res = await getUserSessions();
      if (!res.error) {
        setSessions(res.data);
        getNumOpenedSessions(res.data)
      }
      setLoadingPage(false);
    } catch (err) {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    setWidthScreen(document.documentElement.clientWidth);
    window.addEventListener("resize", () => {
      const viewportWidth = document.documentElement.clientWidth;
      setWidthScreen(viewportWidth);
    });
  });

  useEffect(() => {
    getSessions();
  }, []);

  if (loadingPage) return
  <div className="w-screen h-screen flex  justify-center items-center py-5">
    <Spinner />
  </div>;

  return (
    <div className="max-h-screen flex flex-col gap-10 overflow-y-scroll pb-20 bg-slate-200">
      <Modal style={{ direction: "rtl" }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      // placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mr-2">تعديل المعلومات الشخصية </ModalHeader>
              <ModalBody>
                <Input
                  defaultValue={userInfo?.name}
                  autoFocus
                  label="الاسم"
                  type="text"
                  variant="bordered"

                />
                <Input
                  defaultValue={userInfo?.username}
                  autoFocus
                  label="اسم المستخدم "
                  variant="bordered"
                />
                <Input
                  defaultValue={userInfo?.email}
                  autoFocus
                  label="ايميل"
                  variant="bordered"
                />
                <Input

                  label="كلمة السر"
                  type="password"
                  variant="bordered"
                />

              </ModalBody>
              <ModalFooter>

                <Button color="danger" variant="flat" onPress={onClose}>
                  اغلاق
                </Button>
                <Button color="primary" onPress={onClose} className=" hover:text-blue-500 hover:bg-white hover:border-2 hover:border-blue-500 px-8">
                  تعديل
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col m-auto rounded-lg mt-8">
        <Card className="mx-auto px-10 py-5 md:min-w-[800px] rounded-xl shadow-md">
          <div className="md:flex w-full">
            <div className="md:w-3/5 flex flex-col justify-center items-center p-2">
              <div className="relative block m-auto w-24 h-24">
                <Avatar isBordered src="/image/infouser.jpg" className=" block w-20 h-20" radius="full" />
                <Button className="absolute bg-white/90 min-w-unit-0 w-6 h-6 bottom-4 left-3 z-50 px-0 rounded-full" size="sm" ><TbCameraPlus className="text-xl text-blue-500" /></Button>
              </div>

              <div className="mt-4 p-3 text-center">
                <p className="text-2xl">{userInfo?.name}</p>
                <p style={{ direction: "ltr" }} className="text-lg text-gray-600">@{userInfo?.username}</p>
              </div>
            </div>
            <Divider className="md:hidden" />
            <div className="flex w-full flex-col gap-2 md:mr-10 mt-4">
              <p className="flex gap-2 font-bold">
                <label>إيميل:</label>
                <span className="text-gray-600">{userInfo?.email}</span>
              </p>
              <p className="flex gap-2 font-bold">
                <label>الجنس:</label>
                <span className="text-gray-600">{userInfo?.gender}</span>
              </p>
              <p className="flex gap-2 font-bold">
                <label>العمر:</label>
                <span className="text-gray-600">{userInfo?.age}</span>
              </p>
              <div className="flex gap-1 mt-2 mx-auto md:mx-0 md:mr-auto md:mt-auto">
                {sessions.length == 0 && getNumOpenedSessions == 0 &&
                  <Button
                    className="block w-30 text-lg bg-blue-500 text-white hover:text-blue-500 hover:bg-white hover:border-2 hover:border-blue-500 px-8"
                    onClick={() => { router.push("/account") }} >
                    إنشاء جلسة
                  </Button>}
                <Button
                  className="block w-36 text-lg  text-blue-500 bg-white border-2 border-blue-500 hover:text-white hover:bg-blue-500 hover:border-2 hover:border-white px-8"
                  onPress={onOpen} color="primary">
                  تعديل
                </Button>
              </div>

            </div>
          </div>
        </Card>
      </div>
      {sessions.length > 0 && (
        <div className="flex flex-col  m-auto pb-20 max-w-[700px] rounded-lg">
          <h1 class="flex p-3 text-2xl">جلساتك</h1>
          <div className="flex items-center justify-center">
            <Button
              className="w-9 h-9 bg-white hover:bg-blue-500 rounded-full min-w-9 text-lg p-0 mx-2"
              onClick={() => handleScroll("r")}
            >
              <IoIosArrowForward className="text-blue-500 hover:text-white" />
            </Button>
            <div
              class="flex w-[300px] md:w-full gap-4 md:gap-5 overflow-x-scroll scroll-smooth py-2"
              ref={ScrollRef}
            >
              {sessions.map((session) => (
                <SessionCard
                  key={session.id}
                  id={session.id}
                  order={session.order}
                  doctorName={session.doctorName}
                  statusFinished={session.statusFinished}
                  progress={session.progress}
                  creationDate={session.creationDate}
                  finishingDate={session.finishingDate}
                />
              ))}
            </div>
            <Button
              className="w-9 h-9 bg-white hover:bg-blue-500 rounded-full min-w-9 text-lg p-0 mx-2"
              onClick={() => handleScroll("l")}
            >
              <IoIosArrowBack className="text-blue-500 hover:text-white" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

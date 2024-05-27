import SessionCard from "@/components/SessionCard";
import { MainContext } from "@/layouts/MainLayout";
import { Avatar, Button, Card, Divider, Spinner } from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getUserSessions } from "../../../public/global_functions/session";

export default function Profile({ user }) {
  const ScrollRef = useRef();
  const [widthScreen, setWidthScreen] = useState("");
  const handleScroll = (type) => {
    let scrollAmount = 0;
    scrollAmount = widthScreen > 660 ? 665 : 300;
    if (type === "l") {
      scrollAmount = scrollAmount * -1;
    }
    ScrollRef.current.scrollLeft += scrollAmount;
  };
  const { userInfo } = useContext(MainContext);
  const [sessions, setSessions] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);

  const getSessions = async () => {
    try {
      const res = await getUserSessions();
      if (!res.error) setSessions(res.data);
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

  if (loadingPage) return <Spinner />;

  return (
    <div className="max-h-screen flex flex-col gap-10 overflow-y-scroll pb-20 bg-slate-200">
      <div className="flex flex-col m-auto rounded-lg mt-8">
        <Card className="mx-auto px-10 py-5 md:min-w-[800px] rounded-xl shadow-md">
          <div className="md:flex w-full">
            <div className="md:w-3/5 flex flex-col justify-center items-center p-2">
              <Avatar className="block m-auto w-20 h-20" radius="full" />
              <div className="mt-4 p-3 text-center">
                <p className="text-2xl">{userInfo?.name}</p>
                <p className="text-lg text-gray-600">@{userInfo?.username}</p>
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
              <Button
                className="block w-fit mt-2 mx-auto md:mx-0 md:mr-auto md:mt-auto text-lg bg-blue-500 text-white hover:text-blue-500 hover:bg-white hover:border-2 hover:border-blue-500 px-8"
                radius="full"
              >
                تعديل
              </Button>
            </div>
          </div>
        </Card>
      </div>
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
                key={session.order}
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
    </div>
  );
}

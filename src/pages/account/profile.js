import SessionCard from "@/components/SessionCard";
import { MainContext } from "@/layouts/MainLayout";
import { Avatar, Button, Card } from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
  useEffect(() => {
    setWidthScreen(document.documentElement.clientWidth);
    window.addEventListener("resize", () => {
      const viewportWidth = document.documentElement.clientWidth;
      setWidthScreen(viewportWidth);
    });
  });
  return (
    <div
      className="max-h-screen flex flex-col gap-10 overflow-y-scroll pb-20 bg-slate-200"
      style={{ direction: "rtl" }}
    >
      <div className="flex flex-col m-auto rounded-lg mt-8">
        <Card className="mx-auto px-10 py-5 min-w-[700px] rounded-xl shadow-md">
          <div className="flex w-full">
            <div className="w-1/3 p-2">
              <Avatar className="block m-auto w-20 h-20" radius="full" />
            </div>
            <div className="flex flex-col gap-2 mx-10 mt-4">
              <p className="flex gap-2 font-bold">
                <label>البريد الإلكتروني:</label>
                <span className="text-gray-600">{userInfo.email}</span>
              </p>
              <p className="flex gap-2 font-bold">
                <label>الجنس:</label>
                <span className="text-gray-600">{userInfo.gender}</span>
              </p>
              <p className="flex gap-2 font-bold">
                <label>العمر:</label>
                <span className="text-gray-600">{userInfo.age}</span>
              </p>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/3 p-3 text-center">
              <p className="text-2xl">{userInfo.name}</p>
              <p className="text-lg text-gray-600">{userInfo.username}</p>
            </div>
            <Button
              className="block mr-auto mt-auto text-lg bg-slate-700 text-white px-8"
              radius="full"
            >
              Edit
            </Button>
          </div>
        </Card>
      </div>
      <div className="flex flex-col  m-auto pb-10 max-w-[700px] rounded-lg">
        <h1 class="flex p-3 text-2xl">جلساتك</h1>
        <div className="flex items-center justify-center">
          <Button
            className="w-9 h-9 rounded-full min-w-9 text-lg p-0 mx-2"
            onClick={() => handleScroll("l")}
          >
            <IoIosArrowBack />
          </Button>
          <div
            class="flex w-full gap-4 md:gap-5 overflow-x-scroll scroll-smooth py-2"
            ref={ScrollRef}
          >
            <SessionCard
              order={4}
              doctorName={"Gazwan"}
              statusFinished={false}
              progress={"15"}
              creationDate={"1/2/2012"}
              finishingDate={"1/8/2012"}
            />
            <SessionCard
              order={3}
              doctorName={"Gazwan"}
              statusFinished={true}
              progress={"15"}
              creationDate={"1/2/2012"}
              finishingDate={"1/8/2012"}
            />
            <SessionCard
              order={2}
              doctorName={"Gazwan"}
              statusFinished={true}
              progress={"15"}
              creationDate={"1/2/2012"}
              finishingDate={"1/8/2012"}
            />
            <SessionCard
              order={1}
              doctorName={"Gazwan"}
              statusFinished={true}
              progress={"15"}
              creationDate={"1/2/2012"}
              finishingDate={"1/8/2012"}
            />
          </div>
          <Button
            className="w-9 h-9 rounded-full min-w-9 text-lg p-0 mx-2"
            onClick={() => handleScroll("r")}
          >
            <IoIosArrowForward />
          </Button>
        </div>
      </div>
    </div>
  );
}

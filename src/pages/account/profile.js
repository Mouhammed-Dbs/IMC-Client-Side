import SessionCard from "@/components/SessionCard";
import { Avatar, Button, Card } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Profile() {
    const ScrollRef = useRef();
    const [widthScreen, setWidthScreen] = useState('')
    const handleScroll = (type) => {
        let scrollAmount = 0;
        scrollAmount = widthScreen > 660 ? 665 : 300
        if (type === "l") {
            scrollAmount = scrollAmount * -1;
        }
        ScrollRef.current.scrollLeft += scrollAmount;
    };
    useEffect(() => {
        setWidthScreen(document.documentElement.clientWidth);
        window.addEventListener('resize', () => {
            const viewportWidth = document.documentElement.clientWidth;
            setWidthScreen(viewportWidth);
        });
    })
    return (
        <div className="max-h-screen overflow-y-scroll pb-20 bg-slate-200">
            <div className="flex flex-col  m-auto max-w-[700px] rounded-lg">
                <h1 className="flex  mr-auto  text-2xl">
                    Your Information
                </h1>
                <Card className=" grid grid-cols-2 mx-auto px-10 py-5 rounded-xl shadow-md">
                    <div className="p-2">
                        <Avatar className="w-20 h-20 " radius="full" />
                    </div>
                    <div className="mx-10">
                        <p className="font-bold ">Email:<span className="text-gray-400">yossefabras@gmail.com</span></p>
                        <p className="font-bold ">Gender : <span className="text-gray-400">male</span></p>
                        <p className="font-bold ">Old: <span className="text-gray-400">40</span></p>
                    </div>
                    <div className="p-3" >
                        <p className="text-2xl">yossef sfdsgfghgj</p>
                        <p className="text-lg text-gray-400">@yossse</p>
                    </div>
                    <Button
                        className="block m-auto  text-lg bg-slate-700 text-white px-8"
                        radius="full"
                    >
                        Edit
                    </Button>
                </Card>
            </div>
            <div className="flex flex-col  m-auto pb-10 max-w-[700px] rounded-lg">
                <h1 class="flex p-3 mr-auto  text-2xl">
                    Your Session
                </h1>
                <div className="flex items-center justify-center">
                    <Button className="w-9 h-9 rounded-full min-w-9 text-lg p-0 mx-2" onClick={() => handleScroll('l')} ><IoIosArrowBack /></Button>
                    <div class="flex w-full gap-4 md:gap-5 overflow-x-scroll scroll-smooth py-2" ref={ScrollRef}>
                        <SessionCard order={4} doctorName={"Gazwan"} statusFinished={false} progress={"15"} creationDate={"1/2/2012"} finishingDate={"1/8/2012"} />
                        <SessionCard order={3} doctorName={"Gazwan"} statusFinished={true} progress={"15"} creationDate={"1/2/2012"} finishingDate={"1/8/2012"} />
                        <SessionCard order={2} doctorName={"Gazwan"} statusFinished={true} progress={"15"} creationDate={"1/2/2012"} finishingDate={"1/8/2012"} />
                        <SessionCard order={1} doctorName={"Gazwan"} statusFinished={true} progress={"15"} creationDate={"1/2/2012"} finishingDate={"1/8/2012"} />
                    </div>
                    <Button className="w-9 h-9 rounded-full min-w-9 text-lg p-0 mx-2" onClick={() => handleScroll('r')} ><IoIosArrowForward /></Button>
                </div>

            </div>
        </div>)
}
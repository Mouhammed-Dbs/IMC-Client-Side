import SessionCard from "@/components/SessionCard";
import { Avatar, Button, Card, CardBody, CardHeader } from "@nextui-org/react";

export default function Profile() {
    return (
        <div>
            <div className="flex flex-col justify-center">
                <p className="text-2xl m-auto">Your Information</p>
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
            <div class="flex flex-col  m-auto p-auto pb-10 max-w-[700px] rounded-lg">
                <h1
                    class="flex p-3 m-auto  text-2xl"
                >
                    Your Session
                </h1>
                <div class="flex overflow-x-scroll pb-10 hide-scroll-bar" >
                    <div
                        class="flex flex-nowrap gap-4 "
                    >
                        <SessionCard />
                        <SessionCard />
                        <SessionCard />
                        <SessionCard />
                        <SessionCard />
                        <SessionCard />
                    </div>
                </div>



            </div>
        </div>

    )
}
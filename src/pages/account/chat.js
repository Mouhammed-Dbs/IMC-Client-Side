import Sidebar from "@/components/Sidebar";
import Message from "@/components/utils/Message";
import { LuSendHorizonal } from "react-icons/lu";
import { IoSend } from "react-icons/io5";
export default function Chat() {
  return (
    <div className="flex h-full">
      <Sidebar></Sidebar>
      <div class="h-full w-full md:w-3/4 bg-gray-100">
        <div class="bg-blue-500 py-3">
          <h1 className="font-bold text-center text- md:block hidden">Chat App</h1>
          <div className="flex justify-center items-center md:hidden text-gray-800">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-800 flex justify-center items-center p-2"><p>one</p></div>
            <div className="w-10 h-1  bg-white"></div>
            <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-800 flex justify-center items-center p-2 "><p>two</p></div>
            <div className="w-10 h-1 bg-white"></div>
            <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-800  flex justify-center items-center p-2 "><p >three</p></div>
            <div className="w-10 h-1 bg-white"></div>
            <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-800 flex justify-center items-center p-2 "><p>Finish</p></div>
          </div>
        </div>
        <div className="relative w-full h-screen">
          <div className="h-screen overflow-scroll no-scrollbar pb-60 md:pb-44">
            <div class="w-full flex flex-col gap-4 p-4">
              <Message
                type="sender"
                message="ali hii1 iuh uib ui goiu go iug uig uig  gup gp goghuiog up g"
              />
              <Message type="receiver" message="ali hii2" />
              <Message type="sender" message="ali hii3" />
              <Message type="receiver" message="ali hii4" />
              <Message
                type="sender"
                message="ali hii5 goiu go iug uig uig  gup gp"
              />
              <Message type="receiver" message="ali hii6" />
              <Message type="sender" message="ali hii7" />
              <Message type="receiver" message="ali hii" />
              <Message type="sender" message="ali hii" />
              <Message
                type="receiver"
                message="ali goiu go iug uig uig  gup gp hii"
              />
              <Message type="sender" message="ali hii" />
              <Message type="receiver" message="ali hii" />
              <Message type="sender" message="ali hii" />
              <Message
                type="receiver"
                message="goiu go iug uig uig  gup gp ali hii"
              />
              <Message type="sender" message="ali hii" />
              <Message type="receiver" message="ali hii" />
              <Message type="sender" message="ali hii" />
              <Message type="receiver" message="ali hii989" />
            </div>
          </div>

          <div class="absolute w-full flex justify-center items-center py-3 bottom-[185px] md:bottom-[110px]  bg-blue-500">
            <input
              type="text"
              placeholder="Type your message..."
              class="md:w-1/2 w-full  rounded-lg border items-center border-gray-300 px-4 py-2"
            />
            <button class="ml-2 rounded-lg bg-blue-500 px-4 py-2  text-white">


              <IoSend className=" w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

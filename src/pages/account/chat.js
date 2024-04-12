import Sidebar from "@/components/Sidebar";
import Message from "@/components/utils/Message";

export default function Chat() {
  return (
    <div className="flex h-full">
      <Sidebar></Sidebar>
      <div class="h-full w-10/12 md:w-3/4 bg-gray-100">
        <div class="bg-slate-500 py-2">
          <h1 class="text-center text-lg font-bold text-white">Chat App</h1>
        </div>
        <div className="relative w-full h-full">
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

          <div class="absolute w-full flex items-center p-4 bottom-[150px] md:bottom-[100px] bg-slate-500">
            <input
              type="text"
              placeholder="Type your message..."
              class="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
            <button class="ml-2 rounded-lg bg-slate-500 px-4 py-2 text-white">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

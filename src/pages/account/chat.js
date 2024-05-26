import Sidebar from "@/components/Sidebar";
import Message from "@/components/utils/Message";
import { LuSendHorizonal } from "react-icons/lu";
import { IoSend } from "react-icons/io5";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Progress, Spinner } from "@nextui-org/react";
import { progress } from "framer-motion";
import { getUserSession } from "../../../public/global_functions/session";
export default function Chat() {
  const router = useRouter();
  const { query } = router;
  const [inputMessage, setInputMessage] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const [resSession, setResSession] = useState({ error: false, message: "" });
  const [session, setSession] = useState({
    progress: 0,
    finished: false,
    messages: [],
  });
  const [windowHeight, setWindowHeight] = useState(0);

  const addIsTypingForMessages = async (messages) => {
    messages = await messages.map((message) => {
      return { ...message, isTyping: false };
    });
    return messages;
  };

  const getSession = async () => {
    try {
      const res = await getUserSession(query["sessionId"]);
      setLoadingPage(false);
      setResSession({ error: res.error, message: res.message });
      const session = res.data;
      session.messages = await addIsTypingForMessages(session.messages);
      if (!res.error) setSession(session);
    } catch (err) {
      setLoadingPage(false);
      setResSession({ error: true, message: "sessionId is not valid" });
      router.replace("/account");
    }
  };

  //foe calculate height screen
  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    getSession();
  }, []);

  if (loadingPage) return <Spinner />;
  if (resSession.error) return <p>{resSession.message}</p>;

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white flex justify-center items-center w-full h-10 px-3 md:px-20 border-b-2">
        <div className="w-1/2 md:w-2/5 flex justify-start text-sm md:text-base">
          <span className="font-bold">مرحلة التشخيص العام</span>
        </div>
        <div className="w-1/2 md:w-full flex justify-center items-center">
          <span className="pl-2">{session.progress}%</span>
          <Progress
            aria-label="Loading..."
            value={session.progress}
            className="max-w-md"
          />
        </div>
      </div>
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className={`flex flex-col gap-3 md:gap-6 p-4 overflow-y-auto md:px-60`}
          style={{ height: windowHeight - 140 - 40 + "px" }}
        >
          {session.messages.map((message) => (
            <Message
              key={message._id}
              type={message.sender === "ai" ? "receiver" : "sender"}
              message={message.content}
              isTyping={message.isTyping}
            />
          ))}
        </div>
        <div className="flex gap-5 p-4 border-t border-gray-200 md:px-64">
          <button className="ml-2 rounded-full text-white p-2">
            <IoSend className="text-blue-500 hover:text-blue-400 w-7 h-7" />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={setInputMessage}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="اكتب ما تشعر به.."
          />
        </div>
      </div>
    </div>
  );
}

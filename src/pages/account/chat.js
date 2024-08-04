import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { IoSend } from "react-icons/io5";
import { Button, Progress, Spinner } from "@nextui-org/react";
import Message from "@/components/utils/Message";
import {
  addMessage,
  getUserSession,
} from "../../../public/global_functions/session";

export default function Chat() {
  const router = useRouter();
  const { query } = router;
  const [inputMessage, setInputMessage] = useState("");
  const [loadingADD, setLoadingADD] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [resSession, setResSession] = useState({ error: false, message: "" });
  const [session, setSession] = useState({
    progress: 0,
    stage: 1,
    finished: false,
    messages: [],
  });
  const [windowHeight, setWindowHeight] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);

  const dummyRef = useRef(null);

  const addIsTypingForMessages = async (messages, isTyping = false) => {
    return messages.map((message, index) => {
      if (isTyping) {
        if (index === messages.length - 2 && message.sender === "ai") {
          return { ...message, isTyping: true };
        }
        return { ...message, isTyping: index === messages.length - 1 };
      }
      return { ...message, isTyping: false };
    });
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

  const addNewMessage = async () => {
    setLoadingADD(true);
    try {
      const res = await addMessage(query["sessionId"], inputMessage);
      setLoadingADD(false);
      const newSession = res.data;
      newSession.messages = await addIsTypingForMessages(
        newSession.messages,
        true
      );
      if (!res.error) setSession(newSession);
      setTypingIndex(
        newSession.messages.length -
          (newSession.messages.length - session.messages.length - 1)
      );
    } catch (err) {
      setLoadingADD(false);
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    addNewMessage();
    setInputMessage("");
  };

  const handleTypingComplete = () => {
    setTypingIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (dummyRef.current) {
      dummyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [session.messages, typingIndex]);

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

  if (loadingPage)
    return (
      <div className="w-screen h-screen flex justify-center items-center py-5">
        <Spinner />
      </div>
    );

  if (resSession.error) return <p>{resSession.message}</p>;

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white flex justify-center items-center w-full h-10 px-3 md:px-20 border-b-2">
        <div className="w-1/2 md:w-2/5 flex justify-start text-sm md:text-base">
          <span className="font-bold">
            {session.stage === 1 && "مرحلة التشخيص العام"}
            {session.stage === 2 && "مرحلة استخلاص الأعراض النفسية"}
            {session.stage === 3 && "مرحلة استخلاص الأعراض الجسدية"}
            {session.stage === 4 && "مرحلة تأكيد الأعراض"}
          </span>
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
          className="flex flex-col gap-3 md:gap-6 p-4 overflow-y-auto md:px-60"
          style={{ height: windowHeight - 140 - 40 + "px" }}
        >
          {session.messages.map(
            (message, index) =>
              ((index === typingIndex && message.isTyping) ||
                message.isTyping === false) && (
                <Message
                  key={message._id}
                  type={
                    message.sender === "ai" || message.sender === "ai-base"
                      ? "receiver"
                      : "sender"
                  }
                  message={message.content}
                  isTyping={index === typingIndex && message.isTyping}
                  onTypingComplete={() => {
                    message.isTyping = false;
                    handleTypingComplete();
                  }}
                />
              )
          )}
          <div className="mt-2 h-1" ref={dummyRef}></div>
        </div>
        {!session.finished ? (
          <form
            onSubmit={handleSendMessage}
            className="flex gap-5 p-4 border-t-1 border-gray-200 md:px-64"
          >
            <Button
              type="submit"
              isDisabled={loadingADD}
              className="ml-2 rounded-full text-white p-2"
            >
              <IoSend className="text-blue-500 hover:text-blue-400 w-7 h-7" />
            </Button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="اكتب ما تشعر به.."
            />
          </form>
        ) : (
          <p className="flex justify-center p-4 border-t-1 border-gray-200 md:px-64 text-blue-600">
            نحن سعداء لإبلاغك بأن نتائج التقييم تشير إلى أنك لا تعاني من أي
            اضطراب نفسي
          </p>
        )}
      </div>
    </div>
  );
}

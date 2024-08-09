import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { IoSend } from "react-icons/io5";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import {
  Button,
  Progress,
  Spinner,
  Slider,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import Message from "@/components/utils/Message";
import {
  addMessage,
  getUserSession,
  updateAssociationSymptoms,
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
  const [currentIndexSymptom, setCurrentIndexSymptom] = useState(0);
  const [checkedSymptom, setCheckedSymptom] = useState(false);
  const [associationSymptom, setAssociationSymptom] = useState(0);
  const [loadingSAVE, setLoadingSAVE] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenReport,
    onOpen: onOpenRrport,
    onOpenChange: onOpenChangeReport,
    onClose: onCloseReport,
  } = useDisclosure();
  const [windowHeight, setWindowHeight] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);

  const dummyRef = useRef(null);

  const changeProgressInSurveyStage = (session, operation) => {
    session.progress = Math.round(
      session.progress + operation * (25 / session.extractedSymptoms.length)
    );
  };

  const addIsTypingForMessages = async (messages, isTyping = false) => {
    return messages.map((message, index) => {
      if (isTyping) {
        if (index === messages.length - 2 && message.sender === "ai") {
          return { ...message, isTyping: true };
        }
        if (message.sender != "user")
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
      if (session.stage == 4 && session.finished == false)
        changeProgressInSurveyStage(session, 1);
    } catch (err) {
      console.log(err);
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
      console.log(newSession);
      if (newSession.stage == 4) changeProgressInSurveyStage(newSession, 1);
      newSession.messages = await addIsTypingForMessages(
        newSession.messages,
        newSession.messages.length - session.messages.length == 1 ? false : true
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

  const updateAssociationUser = async () => {
    setLoadingSAVE(true);
    const associationSymptom = session.extractedSymptoms.map((symptom) => ({
      label: symptom.label,
      association: symptom.association,
    }));

    try {
      const res = await updateAssociationSymptoms(
        query["sessionId"],
        associationSymptom
      );
      setLoadingSAVE(false);
      if (!res.error) {
        onClose();
        setSession({ ...session, finished: true });
      }
      console.log(res.msg);
    } catch (err) {
      setLoadingSAVE(false);
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
      <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-3 mr-4">
                <p>إنهاء الجلسة</p>
                {loadingSAVE && <Spinner size="sm" />}
              </ModalHeader>
              <ModalBody className="mx-4">
                <p>هل تريد بالتأكيد حفظ الجلسة وإنهائها؟</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={loadingSAVE}
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  إلغاء
                </Button>
                <Button
                  isDisabled={loadingSAVE}
                  color="primary"
                  onClick={updateAssociationUser}
                >
                  حفظ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal dir="rtl" isOpen={isOpenReport} onOpenChange={onOpenChangeReport}>
        <ModalContent>
          {(onCloseReport) => (
            <>
              <ModalHeader className="flex justify-center gap-1">
                نتيجة النشخيص
              </ModalHeader>
              <ModalBody>
                <table className="w-full border-collapse text-center text-sm">
                  <thead>
                    <tr>
                      <th className="p-2 border border-gray-300 bg-gray-100">
                        العرض
                      </th>
                      <th className="p-2 border border-gray-300 bg-gray-100">
                        توقعك
                      </th>
                      <th className="p-2 border border-gray-300 bg-gray-100">
                        الذكاء الاصطناعي
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {session.extractedSymptoms.map((symptom) => (
                      <tr key={symptom.label}>
                        <td className="p-2 border border-gray-300">
                          {symptom.name}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {symptom.association}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {symptom.associationByAI}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        className="p-2 border border-gray-300 bg-gray-200 font-bold"
                        colSpan="3"
                      >
                        الاضطراب المكتشف:{" "}
                        {session.currentDisorder == 1 ? "اكتئاب" : "قلق"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onCloseReport}>
                  إغلاق
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="bg-white flex justify-center items-center w-full h-10 px-3 md:px-20 border-b-2">
        <div className="w-1/2 md:w-2/5 flex justify-start text-sm md:text-base">
          {session.finished ? (
            <span className="flex items-center font-bold">الجلسة منتهية</span>
          ) : currentIndexSymptom == session.extractedSymptoms.length - 1 &&
            session.stage == 4 ? (
            <Button
              onClick={onOpen}
              size="sm"
              className="bg-inherit hover:bg-blue-200 text-blue-700 border-1 border-blue-700 rounded-lg"
            >
              إنهاء وحفظ الجلسة
            </Button>
          ) : (
            <span className="flex items-center font-bold">
              {session.stage === 1 && "مرحلة التشخيص العام"}
              {session.stage === 2 && "مرحلة استخلاص الأعراض النفسية"}
              {session.stage === 3 && "مرحلة استخلاص الأعراض الجسدية"}
              {session.stage === 4 && "مرحلة تأكيد الأعراض"}
            </span>
          )}
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
          style={{ height: windowHeight - 140 - 50 + "px" }}
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
          session.stage != 4 ? (
            <form
              onSubmit={handleSendMessage}
              className="min-h-[86px] flex items-center gap-5 p-4 border-t-1 border-gray-200 md:px-64"
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
            <div className="min-h-[86px] flex items-center border-t-1 border-gray-200 px-2 md:px-24 lg:px-52 py-1">
              <div className="flex flex-col items-center w-full">
                <div className="h-1/4 w-full flex justify-center">
                  <input
                    checked={checkedSymptom}
                    onChange={(event) => {
                      if (event.target.checked) {
                        session.extractedSymptoms[
                          currentIndexSymptom
                        ].selected = 1;

                        setCheckedSymptom(true);
                      } else {
                        session.extractedSymptoms[
                          currentIndexSymptom
                        ].selected = 0;
                        setCheckedSymptom(false);
                      }
                    }}
                    type="checkbox"
                    id="confirmation"
                    className="peer ml-2 bg-inherit rounded-full p-1 accent-orange-400"
                  />
                  <label
                    htmlFor="confirmation"
                    className="ml-2 text-gray-600 peer-checked:text-orange-500 text-sm md:text-base"
                  >
                    {session.extractedSymptoms.length > 0
                      ? session.extractedSymptoms[currentIndexSymptom].name
                      : ""}
                  </label>
                </div>
                <div className="h-3/4 min-h-[52px] w-full flex justify-around items-center">
                  <Button
                    isDisabled={
                      currentIndexSymptom ==
                      session.extractedSymptoms.length - 1
                    }
                    className="border-1 border-blue-600 hover:bg-blue-200 bg-blue-600 text-white hover:text-blue-600 rounded-full min-w-10 p-0 text-lg"
                    onClick={() => {
                      setCurrentIndexSymptom(
                        currentIndexSymptom ==
                          session.extractedSymptoms.length - 1
                          ? currentIndexSymptom
                          : currentIndexSymptom + 1
                      );
                      setCheckedSymptom(
                        session.extractedSymptoms[currentIndexSymptom + 1]
                          .selected == 1
                      );
                      setAssociationSymptom(
                        session.extractedSymptoms[currentIndexSymptom + 1]
                          .association
                      );
                      changeProgressInSurveyStage(session, 1);
                    }}
                  >
                    <MdNavigateNext />
                  </Button>
                  {checkedSymptom ||
                  session.extractedSymptoms[currentIndexSymptom].selected ==
                    1 ? (
                    <Slider
                      label="Association"
                      dir="ltr"
                      size="sm"
                      step={0.01}
                      color="warning"
                      showTooltip={true}
                      formatOptions={{ style: "percent" }}
                      maxValue={1}
                      minValue={0}
                      value={associationSymptom}
                      className="w-[70%] md:w-[40%] mt-2 px-4"
                      onChange={(association) => {
                        session.extractedSymptoms[
                          currentIndexSymptom
                        ].association = association;
                        setAssociationSymptom(association);
                      }}
                      renderValue={
                        session.extractedSymptoms[currentIndexSymptom]
                          .association
                      }
                    />
                  ) : (
                    <span className="w-[70%] md:w-[40%]"></span>
                  )}

                  <Button
                    isDisabled={currentIndexSymptom == 0}
                    className="border-1 border-blue-600 hover:bg-blue-200 bg-blue-600 text-white hover:text-blue-600 rounded-full min-w-10 p-0 text-lg"
                    onClick={() => {
                      setCurrentIndexSymptom(
                        currentIndexSymptom == 0
                          ? currentIndexSymptom
                          : currentIndexSymptom - 1
                      );
                      setCheckedSymptom(
                        session.extractedSymptoms[currentIndexSymptom - 1]
                          .selected == 1
                      );
                      setAssociationSymptom(
                        session.extractedSymptoms[currentIndexSymptom - 1]
                          .association
                      );
                      changeProgressInSurveyStage(session, -1);
                    }}
                  >
                    <MdNavigateBefore />
                  </Button>
                </div>
              </div>
            </div>
          )
        ) : session.currentDisorder == 0 ? (
          <p className="min-h-[86px] flex items-center justify-center p-4 border-t-1 border-gray-200 md:px-64 text-blue-600">
            نحن سعداء لإبلاغك بأن نتائج التقييم تشير إلى أنك لا تعاني من أي
            اضطراب نفسي
          </p>
        ) : (
          <div className="min-h-[86px] flex items-center justify-center p-4 border-t-1 border-gray-200 ">
            <Button
              className="bg-blue-600 text-white rounded-full"
              onClick={onOpenRrport}
            >
              عرض نتائج التشخيص
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

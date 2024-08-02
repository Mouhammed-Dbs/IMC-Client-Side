import { useEffect, useState } from "react";

export default function Message({
  type,
  message,
  isTyping = false,
  onTypingComplete,
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isTyping) {
      // setDisplayedText(""); // Reset the displayed text
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < message.length) {
          setDisplayedText(message.substring(0, i) + message.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          if (onTypingComplete) {
            onTypingComplete();
          }
        }
      }, 50);
      return () => clearInterval(typingInterval);
    } else {
      setDisplayedText(message); // Set the full message if not typing
    }
  }, [isTyping, message, onTypingComplete]);

  if (type === "sender")
    return (
      <div className="flex w-fit max-w-sm md:max-w-md items-center self-start rounded-xl rounded-br bg-blue-500 py-2 px-3 text-white">
        <p>{displayedText}</p>
      </div>
    );
  if (type === "receiver")
    return (
      <div className="flex w-fit items-center self-end rounded-xl rounded-tl bg-gray-300 py-2 px-3">
        <p>{displayedText}</p>
      </div>
    );
  return <span>Unknown</span>;
}

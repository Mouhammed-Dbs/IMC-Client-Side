import TypingText from "./TypingText";

export default function Message({ type, message, isTyping = false }) {
  if (type === "sender")
    return (
      <div class="flex w-fit max-w-sm md:max-w-md items-center self-start rounded-xl rounded-br bg-blue-500 py-2 px-3 text-white">
        <p>{message}</p>
      </div>
    );
  if (type === "receiver")
    return (
      <div class="flex w-fit items-center self-end rounded-xl rounded-tl bg-gray-300 py-2 px-3">
        {isTyping ? (
          <TypingText
            sentences={[
              {
                text: message,
                font: 0,
              },
            ]}
          />
        ) : (
          <p>{message}</p>
        )}
      </div>
    );
  return <span>Unknown</span>;
}

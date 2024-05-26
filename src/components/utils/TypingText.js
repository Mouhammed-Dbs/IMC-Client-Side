import { useEffect, useState } from "react";

export default function TypingText(props) {
  const [typingSent, setTypingSent] = useState(Array(props.sentences.length));
  // هذه الدالة تقوم بتحديث النص بشكل تدريجي
  const typeText = (text, index) => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= text.length) {
        typingSent[index] = {
          text: text.substring(0, i),
          font: props.sentences[index].font,
        };
        const arr = [...typingSent];
        setTypingSent(arr);
        console.log(typingSent);
        i++;
      } else {
        clearInterval(typingInterval);
        if (index + 1 < props.sentences.length)
          typeText(props.sentences[index + 1].text, index + 1);
      }
    }, 50); // تغيير هذا الرقم يؤثر على سرعة كتابة النص
  };

  // ابدأ كتابة النص بمجرد تحميل الصفحة
  useEffect(() => {
    typeText(props.sentences[0].text, 0);
  }, []);

  return (
    <div>
      <span className={props.className}>
        {typingSent.map((sent) => (
          <>
            {sent?.font === 0 && <br />}
            <p
              className={
                sent?.font === 1
                  ? "font-bold text-blue-800 leading-8"
                  : "leading-8"
              }
            >
              {sent?.text}
            </p>
          </>
        ))}
      </span>
    </div>
  );
}

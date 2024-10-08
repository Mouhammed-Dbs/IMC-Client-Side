import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/router";

export default function SessionCard({
  id,
  order,
  doctorName,
  statusFinished,
  stage,
  creationDate,
  finishingDate,
}) {
  const router = useRouter();
  return (
    <div className="relative w-80 h-fit rounded-lg bg-white shadow-md block min-w-72 pb-4">
      <p
        style={{ borderEndStartRadius: "40px", borderStartEndRadius: "8px" }}
        className={`absolute flex justify-end pl-3 pt-2 h-11 w-11 left-0 font-bold text-white ${
          statusFinished ? "bg-blue-700" : "bg-blue-400"
        }`}
      >
        {order}
      </p>
      <div className="flex flex-col gap-2 justify-center py-8 px-4 h-[200px]">
        <div className="flex gap-3">
          <p className="font-bold">اسم الطبيب</p>
          <p className="self-end">{doctorName}</p>
        </div>
        <div className="flex gap-3">
          <p className="font-bold">الحالة</p>
          <p className={`self-end ${statusFinished ? "" : "text-blue-500"}`}>
            {statusFinished ? "منتهية في " + finishingDate : "Opened"}
          </p>
        </div>

        {!statusFinished && (
          <div className="flex gap-3">
            <p className="font-bold">المرحلة الحالية</p>
            <p className="self-end">
              {stage === 1 && "مرحلة التشخيص العام"}
              {stage === 2 && "مرحلة استخلاص الأعراض النفسية"}
              {stage === 3 && "مرحلة استخلاص الأعراض الجسدية"}
              {stage === 4 && "مرحلة تأكيد الأعراض"}
            </p>
          </div>
        )}

        <div className="flex gap-1">
          <p className="font-bold">تاريخ الانشاء</p>
          <p className="self-end">{creationDate}</p>
        </div>
      </div>
      {
        <Button
          onClick={(e) => {
            router.push("/account/chat?sessionId=" + id);
          }}
          className={`block m-auto bg-blue-500 text-white hover:text-blue-500 hover:bg-white hover:border-2 hover:border-blue-500 px-8`}
          radius="full"
          size="sm"
        >
          {statusFinished ? "مراجعة الجلسة" : "دخول"}
        </Button>
      }
    </div>
  );
}

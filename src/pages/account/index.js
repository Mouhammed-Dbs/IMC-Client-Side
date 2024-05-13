import DoctorCard from "@/components/DoctorCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { getDoctors } from "../../../public/global_functions/doctor";

export default function Index() {
  const [sessionsUser, setSessionsUser] = useState([]);
  const [loading, setLaoding] = useState(true);
  useEffect(() => {
    getDoctors()
      .then((res) => {
        if (res.error == false) setSessionsUser(res.data);
        setLaoding(false);
      })
      .catch((err) => {
        setLaoding(false);
      });
  }, []);
  return (
    <div className="bg-slate-100 h-screen overflow-y-scroll no-scrollbar pb-24">
      <div className="bg-slate-200 md:flex p-10 w-full">
        <Image
          width={4000}
          height={3000}
          src="/image/mainimg.png"
          alt="Description of the image"
          className="self-center  w-fit h-64 md:h-80 pb-1 rounded-lg"
        />
        <div className="h-fit w-full self-center py-9 md:px-6 rounded-xl">
          <p className="text-2xl">
            aSD daAD AdRWEW TE TW YERYRWY WY WRY YWRYRWY RY{" "}
          </p>
          <p className="text-lg">
            aSD daAD AdRWEW TE TW YERYRWY WY WRY YWRYRWY RY{" "}
          </p>
        </div>
      </div>

      {!loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center pb-10 px-4 md:px-10 py-5">
          {sessionsUser.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              name={doctor.name}
              username={doctor.username}
              gender={doctor.gender}
              des={doctor.description}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center py-5">
          <Spinner />
        </div>
      )}
    </div>
  );
}

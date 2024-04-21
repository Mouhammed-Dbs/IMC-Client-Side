import DoctorCard from "@/components/DoctorCard";
import Image from "next/image";

export default function Index() {
  return (
    <div className="bg-slate-100 h-screen overflow-y-scroll no-scrollbar pb-24">
      <div className="bg-slate-200 md:flex p-10">
        <Image
          width={4000}
          height={3000}
          src="/image/image.png"
          alt="Description of the image"
          className="self-center object-fill w-fit h-fit md:h-80 pb-1 rounded-lg"
        />
        <div className="h-fit w-full self-center py-9 md:px-6 rounded-xl">
          <p className="text-2xl">aSD daAD AdRWEW TE TW YERYRWY WY WRY YWRYRWY RY </p>
          <p className="text-lg">aSD daAD AdRWEW TE TW YERYRWY WY WRY YWRYRWY RY </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center pb-10 px-4 md:px-10 py-5">
        <DoctorCard name="yossef abras" username="@yossefabras" des=" Frontend developer and UI/UX enthusiast. Join me on this coding adventure!" />
        <DoctorCard name="aaaa" username="@yossefaaabras" des=" Frontend developer and UI/UX enthusiast. Join me on this coding adventure!" />
        <DoctorCard name="yossef abras" username="@yossefabras" des=" Frontend developer and UI/UX enthusiast. Join me on this coding adventure!" />
        <DoctorCard name="yossef abras" username="@yossefabras" des=" Frontend developer and UI/UX enthusiast. Join me on this coding adventure!" />
        <DoctorCard name="yossef abras" username="@yossefabras" des=" Frontend developer and UI/UX enthusiast. Join me on this coding adventure!" />
        <DoctorCard name="aaaa" username="@yossefaaabras" des=" Frontend developer and UI/UX enthusiast. Join me on this coding adventure!" />
        <DoctorCard name="yossef abras" username="@yossefabras" des=" Frontend developer and UI/UX enthusiast. Join me on this coding adventure!" />
        <DoctorCard name="yossef abras" username="@yossefabras" des=" Frontend developer and UI/UX enthusiast. Join me on this coding adventure!" />

      </div>
    </div>


  );
}



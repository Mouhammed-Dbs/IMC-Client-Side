"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";

export default function MainNavbarNavbar({ name }) {
  const router = useRouter();
  return (
    <header className="sticky bg-white text-blue-500 py-3 px-32 flex items-center justify-between w-full border-b-1 border-slate-300 shadow-md">
      <div className="flex ">
        <h1
          className="text-lg md:text-3xl font-bold self-center px-2 min-w-max cursor-pointer"
          onClick={() => router.push("/")}
        >
          IMC
        </h1>
        {/* <Image
          src={"/image/logo/logo.png"}
          width={1200}
          height={1200}
          alt={"IMC logo"}
          className="w-10 h-10 rounded-full"
        /> */}
      </div>
      <Button
        className="flex rounded-full bg-inherit p-0  px-4 w-fit h-10 text-lg text-blue-500 hover:bg-blue-200/90"
        onClick={() => {
          router.push("/account/profile");
        }}
      >
        <CgProfile className="text-4xl" />
        <p className="text-lg">{name}</p>
      </Button>
    </header>
  );
}

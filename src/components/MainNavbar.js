"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";


export default function MainNavbarNavbar() {
  const router = useRouter();
  return (
    <header className="sticky bg-slate-700 text-white py-3 px-4 flex items-center justify-between w-full border-b-1 border-slate-300 shadow-md">
      <div className="flex ">
        <Image src={'/image/logo/logo-192.png'} width={1200} height={1200} alt={'IMC logo'} className="w-10 h-10" />
        <h1 className="text-lg md:text-2xl font-bold self-center px-2 min-w-max">Chat AI</h1>
      </div>

      <Button className="flex rounded-full bg-inherit p-0 px-4 w-fit h-9 text-white text-lg"
        onClick={() => {
          router.push('/account/profile')
        }}
      >
        <CgProfile className="text-3xl" />
        <p className="pb-1">yossef</p>
      </Button>

    </header>
  );
}

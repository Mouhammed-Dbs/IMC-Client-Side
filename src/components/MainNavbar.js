"use client";

import Image from "next/image";

export default function MainNavbarNavbar() {
  return (
    <header className="sticky bg-slate-700 text-white py-3 px-4 flex items-center justify-between w-full border-b-1 border-slate-300 shadow-md">
      <div className="flex ">
        <Image src={'/image/logo/logo-192.png'} width={1200} height={1200} alt={'IMC logo'} className="w-10 h-10" />
        <h1 className="text-lg md:text-2xl font-bold self-center px-2 min-w-max">Chat AI</h1>
      </div>

      <div className="flex w-11 h-11  md:gap-6 rounded-full border-2 items-center p-2">info</div>

    </header>
  );
}

"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function MainNavbarNavbar({ name }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user-token");
    router.push("/login");
  };

  return (
    <header className="sticky bg-white text-blue-500 py-3 md:px-32 px-8 flex items-center justify-between w-full border-b-1 border-slate-300 shadow-md">
      <div className="flex">
        {/* <Image
          src={"/image/logo/logo.png"}
          width={1200}
          height={1200}
          alt={"IMC logo"}
          className="w-10 h-10 rounded-full"
        /> */}
        <h1
          style={{ fontFamily: "cursive" }}
          className="text-lg md:text-4xl font-bold self-center px-2 min-w-max cursor-pointer"
          onClick={() => router.push("/")}
        >
          IMC
        </h1>
      </div>
      {!router.pathname.endsWith("profile") && (
        <Button
          className="flex rounded-full bg-inherit p-0 px-4 w-fit h-10 md:text-lg text-blue-500 hover:bg-blue-200/90"
          onClick={() => {
            router.push("/account/profile");
          }}
        >
          <CgProfile className="text-4xl" />
          <p className="text-lg">{name}</p>
        </Button>
      )}
      {router.pathname.endsWith("profile") && (
        <Button
          onClick={handleLogout}
          className="flex justify-center rounded-full px-3 bg-inherit  text-blue-500 hover:bg-blue-200/90"
        >
          <span className=" self-center text-medium">تسجيل خروج</span>
          <RiLogoutCircleRLine className="text-lg  self-center text-red-500" />
        </Button>
      )}
    </header>
  );
}

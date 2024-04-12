"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header className="bg-slate-700 text-white p-4 flex items-center justify-between sticky w-full top-0">
      <div>
        <h1 className="text-xl md:text-2xl font-bold min-w-max">Chat AI</h1>
      </div>
      <ul className="w-full flex gap-1 md:gap-4 justify-end mr-4 md:mr-10 md:text-lg">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "text-sky-500 font-bold border-b-2 border-sky-500 rounded-b-md"
              : "hover:text-sky-500"
          }
        >
          HOME
        </Link>
        <Link
          href="/about"
          className={
            pathname === "/about"
              ? "text-sky-500 font-bold  border-b-2 border-sky-500 rounded-b-md"
              : "hover:text-sky-500"
          }
        >
          ABOUT US
        </Link>
        <Link
          href="/contacts"
          className={
            pathname === "/contacts"
              ? "text-sky-500 font-bold  border-b-2 border-sky-500 rounded-b-md"
              : "hover:text-sky-500"
          }
        >
          CONTACTS
        </Link>
      </ul>
      <div className="flex gap-2 md:gap-4">
        <Button
          className="text-slate-700 rounded-lg bg-white px-2 py-1 mx-2 font-bold"
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </Button>
      </div>
    </header>
  );
}

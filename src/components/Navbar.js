import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { GrContact } from "react-icons/gr";
import { IoPeopleOutline } from "react-icons/io5";
import Image from "next/image";
export default function MNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];
  return (
    // className = "bg-slate-700 text-white p-4 flex items-center justify-between sticky w-full top-0"
    <Navbar className="bg-white shadow-xs drop-shadow-lg shadow-blue-300">
      <NavbarContent justify="start">
        <NavbarMenuToggle className="md:hidden" />
        {/* <NavbarBrand className="gap-2">
          <p
            className="flex gap-1 text-xl md:text-2xl font-bold min-w-max text-blue-800"
            onClick={() => {
              router.replace("./");
            }}
          >
            IMC
          </p>
        </NavbarBrand> */}
      </NavbarContent>

      <NavbarContent className="hidden md:flex flex-row-reverse gap-1 md:gap-4 justify-end mr-4 md:mr-10 md:text-lg">
        <NavbarItem>
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-sky-500 font-bold border-b-2 border-sky-500 rounded-b-md pb-2"
                : "hover:text-sky-500"
            }
          >
            الصفحة الرئيسية
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/about"
            className={
              pathname === "/about"
                ? "text-sky-500 font-bold  border-b-2 border-sky-500 rounded-b-md pb-2"
                : "hover:text-sky-500"
            }
          >
            حول الموقع
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/contacts"
            className={
              pathname === "/contacts"
                ? "text-sky-500 font-bold  border-b-2 border-sky-500 rounded-b-md pb-2"
                : "hover:text-sky-500"
            }
          >
            تواصل معنا
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="right">
        <Image
          onClick={() => {
            router.replace("./");
          }}
          src={"/image/logo/logo.png"}
          width={1200}
          height={1200}
          alt={"IMC logo"}
          className="w-12 h-12 ml-5"
        />
      </NavbarContent>
      <NavbarMenu className="bg-slate-600 text-white">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              href={item.link}
              size="lg"
              className={
                pathname === item.link
                  ? "text-sky-500 font-bold  border-b-2 border-sky-500 rounded-b-sm flex"
                  : "hover:text-sky-500 flex"
              }
            >
              {item.name === "About Us" ? (
                <IoPeopleOutline className=" self-center " />
              ) : null}
              {item.name === "Contact" ? (
                <GrContact className=" self-center" />
              ) : null}
              {item.name === "Home" ? (
                <IoMdHome className=" self-center" />
              ) : null}
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

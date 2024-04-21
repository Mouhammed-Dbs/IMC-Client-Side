import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import Link from "next/link";
import { IoIosMenu, IoMdHome } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { GrContact } from "react-icons/gr";
import { IoPeopleOutline } from "react-icons/io5";
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
    <Navbar className="bg-slate-700 text-white">
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="flex gap-1 text-xl md:text-2xl font-bold min-w-max" onClick={() => { router.replace("./") }}>Chat AI</p>
        </NavbarBrand>

      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-1 md:gap-4 justify-end mr-4 md:mr-10 md:text-lg">
        <NavbarItem>
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
        </NavbarItem>
        <NavbarItem>
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
        </NavbarItem>
        <NavbarItem>
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
        </NavbarItem>

      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            className="text-slate-700 rounded-lg bg-white px-2 py-1 mx-1 font-bold "
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
        </NavbarItem>
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
              {item.name === "About Us" ? <IoPeopleOutline className=" self-center " /> : null}
              {item.name === "Contact" ? <GrContact className=" self-center" /> : null}
              {item.name === "Home" ? <IoMdHome className=" self-center" /> : null}
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

    </Navbar>

  );
}

"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

import { useOnClickOutside } from "@ttbs/lib/hooks";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const links = [
    {
      name: "thông tin đặt chỗ",
      link: "#",
    },
    {
      name: "Vé",
      link: "#",
      links: [
        {
          name: "Tìm vé",
          link: "#",
        },
        {
          name: "trả vé",
          link: "#",
        },
        {
          name: "kiểm tra vé",
          link: "#",
        },
      ],
    },
    {
      name: "khuyến mãi",
      link: "#",
    },
    {
      name: "các quy định",
      link: "#",
    },
    {
      name: "hướng dẫn",
      link: "#",
    },
    {
      name: "liên hệ",
      link: "#",
    },
  ];
  //handle click outside to close menu, dropdown
  const handleClickOutsideBox = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (open && target.id !== "btn-menu") {
      setOpen(false);
    }
    if (dropdown && target.id !== "dropdown-ticket") {
      setDropdown(false);
    }
  };

  useOnClickOutside(listRef, handleClickOutsideBox);

  //document only be used on client side
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutsideBox);

  // cần có remove ?
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutsideBox);
  //   }
  // });

  return (
    <nav className="text-secondary relative m-3 flex max-w-7xl flex-col items-center bg-white capitalize md:mx-auto md:flex-row md:justify-around md:align-middle md:text-sm">
      <div className=" flex w-full items-center justify-between gap-3 px-2 md:w-auto">
        <a href="#">
          <Image src="/logoipsum.svg" width={200} height={200} alt="logoipsum" />
        </a>
        {/* //link with useRef */}
        <div>
          <button
            // ref={navRef}
            onClick={() => {
              setOpen(!open);
            }}
            id="btn-menu"
            className="bg-accent text-secondary z-10 box-border rounded p-5 transition-all duration-300 hover:cursor-pointer md:hidden">
            MENU
          </button>
        </div>
      </div>
      <ul
        ref={listRef}
        className={` text-primary absolute z-20 mr-5 flex flex-col justify-around gap-2 rounded-md transition-all duration-500 ease-in-out md:static md:flex-1 md:flex-row md:justify-end md:gap-2 md:p-2 ${
          open ? " border-primary right-0 top-24 border-2 bg-white" : "right-[-500px] top-20"
        }`}>
        {/* combine map function with ternary operator */}
        {links.map((link) => {
          return link.name !== "Vé" ? (
            <li key={link.link} className="">
              <div className="">
                <a
                  className="hover:bg-primary box-border block flex-auto px-8 py-3 text-center transition duration-300 ease-in-out hover:cursor-pointer md:p-2 md:px-2 md:py-2 "
                  href={link.link}>
                  {link.name}
                </a>
              </div>
            </li>
          ) : (
            <div className="relative w-full md:max-w-max md:px-5">
              <li
                key={link.link}
                className="hover:bg-primary box-border flex flex-col px-8 py-3 text-center transition duration-300 ease-in-out hover:cursor-pointer md:px-5 md:py-2 lg:px-10"
                onClick={() => {
                  setDropdown(!dropdown);
                }}>
                <div>{link.name}</div>
              </li>
              <div
                id="dropdown-ticket"
                className={`block transition-all duration-300 ease-in-out md:absolute ${
                  dropdown ? "inset-x-0 top-10 min-w-full opacity-100" : "hidden opacity-0"
                }`}>
                <ul className=" border-primary w-full rounded-md bg-white py-2 text-sm md:border-2">
                  <li>
                    <a
                      className=" text-primary md:hover:text-accent hover:bg-primary md:hover:bg-bg-secondary block  py-2 pl-5 text-sm hover:cursor-pointer md:px-5 "
                      href="#">
                      Tìm vé
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary md:hover:text-accent hover:bg-primary  md:hover:bg-bg-secondary block py-2 pl-5 text-sm hover:cursor-pointer md:px-5"
                      href="#">
                      Trả vé
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary md:hover:text-accent hover:bg-primary  md:hover:bg-bg-secondary block py-2 pl-5 text-sm hover:cursor-pointer md:px-5"
                      href="#">
                      Kiểm tra vé
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </ul>
      {/* <div>
        <Image src={"/langs.svg"} width={50} height={50} alt="language" />
      </div> */}
    </nav>
  );
};

export default Header;

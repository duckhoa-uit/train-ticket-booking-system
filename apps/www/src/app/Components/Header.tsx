"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

import { useOnClickOutside } from "@ttbs/lib";

const Header = () => {
  const [flag, setFlag] = useState(0);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navRef = useRef<HTMLButtonElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);
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
    <nav className="text-secondary relative m-3 flex flex-col items-center bg-white capitalize md:flex-row md:justify-between md:align-middle">
      <div className="md: mr-7 flex w-full items-center justify-between md:w-auto">
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
        className={` text-primary absolute z-0 mr-5 flex flex-col justify-around gap-2 rounded-md transition-all duration-500 ease-in-out md:static md:flex-1 md:flex-row md:justify-end md:gap-2 md:p-2 ${
          open ? " border-primary right-0 top-24 border-2 bg-white" : "right-[-500px] top-20"
        }`}>
        {/* combine map function with ternary operator */}
        {links.map((link) => {
          return link.name !== "Vé" ? (
            <li key={link.link} className="">
              <div className="">
                <a
                  className="hover:bg-primary box-border block flex-auto px-8 py-3 text-center transition duration-300 ease-in-out hover:cursor-pointer md:px-9 md:py-3 "
                  href={link.link}>
                  {link.name}
                </a>
              </div>
            </li>
          ) : (
            <li
              ref={itemRef}
              key={link.link}
              className="hover:bg-primary relative box-border  block px-8 py-3 text-center transition duration-300 ease-in-out hover:cursor-pointer md:px-9 md:py-3"
              onClick={() => {
                setDropdown(!dropdown);
              }}>
              <span>{link.name}</span>
              <div
                className={`absolute inset-0 top-10 block transition-all duration-300 ease-in-out ${
                  dropdown ? "top-20 opacity-100" : "hidden opacity-0"
                }`}>
                <ul className=" border-primary rounded-md bg-white py-2 text-sm md:border-2">
                  <li>
                    <a
                      className=" text-primary md:hover:text-accent hover:bg-primary  md:hover:bg-bg-secondary block py-2 text-sm hover:cursor-pointer "
                      href="#">
                      Tìm vé
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary  md:hover:text-accent hover:bg-primary md:hover:bg-bg-secondary block py-2 text-sm hover:cursor-pointer"
                      href="#">
                      Trả vé
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary  md:hover:text-accent hover:bg-primary md:hover:bg-bg-secondary block py-2 text-sm hover:cursor-pointer"
                      href="#">
                      Kiểm tra vé
                    </a>
                  </li>
                </ul>
              </div>
            </li>
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

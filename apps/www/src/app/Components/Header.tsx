"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navref = useRef(null);
  const itemref = useRef(null);
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
  const handleClickOutsideBox = (event) => {
    if (navref.current == null || itemref.current == null) return;
    if (itemref.current.contains(event.target)) return;
    if (open && !navref.current.contains(event.target)) {
      setOpen(false);
      setDropdown(false);
    }
  };
  //document only be used on client side
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideBox);
  });
  return (
    <nav className="bg-secondary text-secondary relative flex flex-col items-center gap-3 p-5 capitalize md:flex-row md:justify-between">
      <div className="flex w-full items-center justify-between md:w-auto">
        <a href="#">
          {" "}
          <Image src={"/logoipsum.svg"} width={200} height={200} alt="logoipsum" />
        </a>
        {/* //link with useRef */}
        <div>
          <button
            ref={navref}
            className="bg-accent text-secondary z-10 box-border rounded p-5 transition-all duration-300 hover:cursor-pointer md:hidden"
            onClick={() => {
              setOpen(!open);
            }}>
            MENU
          </button>
        </div>
      </div>
      <ul
        className={` text-primary absolute z-0 mr-5 flex flex-col justify-around gap-2 rounded-md transition-all duration-500 ease-in-out md:static md:flex-1 md:flex-row md:justify-around md:p-2 ${
          open ? " border-primary right-0 top-24 border-2 bg-white" : "right-[-500px] top-20"
        }`}>
        {/* combine map function with ternary operator */}
        {links.map((link) => {
          return link.name !== "Vé" ? (
            <li
              key={link.link}
              className="hover:bg-primary box-border block w-full px-3 py-5 text-center transition duration-300 ease-in-out hover:cursor-pointer">
              <div className="">
                <a className="z-10" href={link.link}>
                  {link.name}
                </a>
              </div>
            </li>
          ) : (
            <li
              ref={itemref}
              key={link.link}
              className="hover:bg-primary relative box-border block w-full px-3 py-5 text-center text-center transition duration-300 ease-in-out hover:cursor-pointer"
              onClick={() => {
                setDropdown(!dropdown);
              }}>
              <span className="w-2 transition duration-300 ease-in-out hover:cursor-pointer hover:border-b-2 hover:border-blue-600">
                {link.name}
              </span>
              <div className={`w-22 absolute inset-0 top-20 block h-auto ${dropdown ? "block" : "hidden"}`}>
                <ul className="w-22 rounded-md bg-white py-2 text-sm">
                  <li>
                    <a
                      className="text-primary hover:bg-primary block py-2 text-sm hover:cursor-pointer hover:text-black"
                      href="#">
                      Tìm vé
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary hover:bg-primary block py-2 text-sm hover:cursor-pointer hover:text-black"
                      href="#">
                      Trả vé
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary hover:bg-primary block py-2 text-sm hover:cursor-pointer hover:text-black"
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

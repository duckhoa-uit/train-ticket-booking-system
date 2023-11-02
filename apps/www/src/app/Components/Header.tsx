"use client";

import Image from "next/image";
import React, { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const links = [
    {
      name: "Tìm vé",
      link: "#",
    },
    {
      name: "thông tin đặt chỗ",
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
  return (
    <nav className="flex flex-col items-center gap-3 p-5 capitalize md:flex-row md:justify-between">
      <div className="flex w-full items-center justify-between md:w-auto">
        <a href="#">
          {" "}
          <Image src={"/logoipsum.svg"} width={200} height={200} alt="logoipsum" />
        </a>
        <button
          className="z-10 rounded bg-blue-600 p-5 text-white transition-all duration-300 hover:cursor-pointer hover:bg-blue-500 lg:hidden"
          onClick={() => {
            setOpen(!open);
          }}>
          MENU
        </button>
      </div>
      <ul
        className={`absolute mr-5 flex  flex-col transition-all duration-500 ease-in-out lg:static lg:flex-row ${
          open ? "right-10 top-20 z-0 w-1/5 bg-transparent bg-white" : ""
        }`}>
        {links.map((link) => {
          return (
            <li key={link.link} className="p-4">
              <div className="box-content w-full text-center transition duration-300 ease-in-out hover:cursor-pointer hover:border-b-2 hover:border-blue-600">
                <a className="z-10" href={link.link}>
                  {link.name}
                </a>
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

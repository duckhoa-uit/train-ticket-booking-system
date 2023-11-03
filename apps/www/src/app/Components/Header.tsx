"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef(null);
  const ticket_links = [
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
  ];
  const links = [
    // {
    //   name: "Tìm vé",
    //   link: "#",
    // },
    {
      name: "thông tin đặt chỗ",
      link: "#",
    },
    // {
    //   name: "trả vé",
    //   link: "#",
    // },
    // {
    //   name: "kiểm tra vé",
    //   link: "#",
    // },
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
  // document.addEventListener("click", function handleClickOutsideBox(e) {
  //   alert(ref.current.contains(e.target));
  // });
  return (
    <nav className="flex flex-col items-center gap-3 p-5 capitalize md:flex-row md:justify-between">
      <div className="flex w-full items-center justify-between md:w-auto">
        <a href="#">
          {" "}
          <Image src={"/logoipsum.svg"} width={200} height={200} alt="logoipsum" />
        </a>
        <button
          className="z-10 rounded bg-blue-600 p-5 text-white transition-all duration-300 hover:cursor-pointer hover:bg-blue-500 md:hidden"
          onClick={() => {
            setOpen(!open);
          }}>
          MENU
        </button>
      </div>
      <ul
        className={`absolute mr-5 flex flex-col transition-all duration-500 ease-in-out md:static md:flex-row ${
          open ? "right-10 top-20 z-0 w-1/5 bg-transparent bg-white" : "right-[-500px] top-[-100px]"
        }`}>
        {/* combine map function with ternary operator */}
        {links.map((link) => {
          return link.name !== "Vé" ? (
            <li key={link.link} className="p-8">
              <div className="box-content block w-full text-center transition duration-300 ease-in-out hover:cursor-pointer hover:border-b-2 hover:border-blue-600">
                <a className="z-10" href={link.link}>
                  {link.name}
                </a>
              </div>
            </li>
          ) : (
            <li
              key={link.link}
              className="relative p-8 text-center"
              onClick={() => {
                setDropdown(!dropdown);
              }}>
              <span className="w-2 transition duration-300 ease-in-out hover:cursor-pointer hover:border-b-2 hover:border-blue-600">
                {link.name}
              </span>
              <div
                className={`w-22 absolute inset-0 top-20 inline-block h-auto ${
                  dropdown ? "block" : "hidden"
                }`}>
                <ul className="w-22 test-sm rounded-md bg-blue-300 py-2 text-gray-800">
                  <li>
                    <a
                      className="block py-2 text-sm hover:cursor-pointer hover:bg-blue-500 hover:text-black"
                      href="#">
                      Tìm vé
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 text-sm hover:cursor-pointer hover:bg-blue-500 hover:text-black"
                      href="#">
                      Trả vé
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 text-sm hover:cursor-pointer hover:bg-blue-500 hover:text-black"
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

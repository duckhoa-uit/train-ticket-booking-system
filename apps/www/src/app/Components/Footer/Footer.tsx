import Image from "next/image";
import React from "react";

import { about, support } from "./item";

const Footer = () => {
  const aboutArray = about.links;
  const supportArray = support.links;
  return (
    <section className="bg-secondary text-secondary h-auto p-5">
      <div className="text-center lg:flex lg:justify-around">
        <div className="m-5 box-content">
          <h3 className="f mb-3 font-bold">{about.title}</h3>
          <ul className=" leading-10">
            {aboutArray.map((item) => {
              return (
                <li key={item.link} className="hover:cursor-pointer hover:text-gray-50">
                  <a href={item.link}>{item.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="m-5">
          <h3 className="mb-3 font-bold">{support.title}</h3>
          <ul className="text- leading-10">
            {supportArray.map((item) => {
              return (
                <li key={item.link} className="hover:cursor-pointer hover:text-gray-50">
                  <a href={item.link}>{item.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="m-5">
          <h3 className="mb-3 font-bold">Tải ứng dụng</h3>
          <div className=" m-auto w-full text-gray-400">
            <Image
              className="mx-auto my-2 hover:cursor-pointer"
              src="/appstore.png"
              width={200}
              height={200}
              alt="download-from-appstore"
            />
            <Image
              className="mx-auto hover:cursor-pointer"
              src="/playstore.png"
              width={200}
              height={200}
              alt="download-from-playstore"
            />
          </div>
        </div>
      </div>
      <hr className="m-3 mx-auto w-4/5 border-gray-500 lg:w-full" />
      <div className="text-center lg:text-left">
        <p className="text-gray-300">@2023 Your Company, Inc. All rights reserved.</p>
      </div>
      {/* <ItemsContainer /> */}
    </section>
  );
};

export default Footer;

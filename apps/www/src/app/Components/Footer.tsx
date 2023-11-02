import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <section className="h-auto bg-gray-900 p-5 text-white">
      <div className="text-center lg:flex lg:justify-around">
        <div className="m-5 box-content">
          <h3 className="f mb-3 font-bold">Về chúng tôi</h3>
          <ul className=" leading-10 text-gray-400">
            <li className="hover:cursor-pointer hover:text-gray-50">Giới thiệu</li>
            <li className="hover:cursor-pointer hover:text-gray-50">Sự nghiệp</li>
            <li className="hover:cursor-pointer hover:text-gray-50">Blog</li>
            <li className="hover:cursor-pointer hover:text-gray-50">Liên hệ</li>
          </ul>
        </div>
        <div className="m-5">
          <h3 className="mb-3 font-bold">Hỗ trợ</h3>
          <ul className=" leading-10 text-gray-400">
            <li className="hover:cursor-pointer hover:text-gray-50">Điều khoản & Điều kiện</li>
            <li className="hover:cursor-pointer hover:text-gray-50">Hướng dẫn thanh toán</li>
            <li className="hover:cursor-pointer hover:text-gray-50">Chính sách thanh toán</li>
            <li className="hover:cursor-pointer hover:text-gray-50">Chính sách hoàn trả</li>
            <li className="hover:cursor-pointer hover:text-gray-50">Chính sách mua hàng</li>
            <li className="hover:cursor-pointer hover:text-gray-50">Chính sách bảo mật thông tin</li>
          </ul>
        </div>
        <div className="m-5">
          <h3 className="mb-3 font-bold">Tải ứng dụng</h3>
          <div className=" m-auto w-full text-gray-400">
            <Image
              className="mx-auto my-2 hover:cursor-pointer"
              src={"/appstore.png"}
              width={200}
              height={200}
              alt="download-from-appstore"
            />
            <Image
              className="mx-auto hover:cursor-pointer"
              src={"/playstore.png"}
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

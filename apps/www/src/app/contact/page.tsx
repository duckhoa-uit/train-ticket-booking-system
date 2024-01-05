import React from "react";

const contact = () => {
  return (
    <div className="md:text-normal mx-auto mb-5 mt-5 min-h-[50vh] w-full max-w-7xl rounded-md bg-white p-5 text-sm md:mt-10 md:text-center">
      <h1 className="text-attention text-xl font-medium uppercase md:text-2xl">Thông tin liên hệ</h1>
      <div className="md:flex md:gap-20 md:text-left">
        <div className="md:flex-1">
          <h3 className="text-attention mb-3 mt-5 text-base font-semibold md:text-xl">
            Tổng công ty đường sắt Việt Nam
          </h3>
          <div className="md:text-base">
            <p>Số 118 Lê Duẩn, Hoàn Kiếm, Hà Nội.</p>
            <br />
            <p>
              Giấy chứng nhận ĐKKD số 113642 theo QĐ thành lập số 973/QĐ-TTg ngày 25/06/2010 của Thủ tướng
              Chính phủ.
            </p>
            <br />
            <p>
              Mã số doanh nghiệp: 0100105052, đăng ký lần đầu ngày 26/07/2010, đăng ký thay đổi lần 4 ngày
              27/06/2014 tại Sở KHĐT Thành phố Hà Nội.
            </p>
          </div>
        </div>
        <div className="md:flex-1">
          <h3 className="text-attention mb-3 mt-5 text-base font-semibold md:text-xl">Thông tin vé mua</h3>
          <div className="md:text-base">
            <p>
              <span className="font-medium">Điện thoại: </span>19006469
            </p>
            <br />
            <div className="md:flex md:gap-2">
              <p>
                <span className="font-medium">Email:</span>
              </p>
              <div>
                <p>support1@easy-boarding.vn</p>
                <p>support1@easy-boarding.vn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contact;

import React from "react";

import { Button, Input, Label } from "@ttbs/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ttbs/ui/components/table/TableNew";

interface CheckoutInputObj {
  key: string;
  label: string;
}

type TableHeadItem = {
  key: number;
  title: string;
};

type CartInformation = {
  username: string;
  seatInfo: string;
  price: number;
  discountForPerson: number;
  promotion: string;
  insurance: number;
  total: number;
};

const TABLE_HEAD_ITEMS: TableHeadItem[] = [
  {
    key: 0,
    title: "Họ tên",
  },
  {
    key: 1,
    title: "Thông tin chỗ",
  },
  {
    key: 2,
    title: "Giá vé",
  },
  {
    key: 3,
    title: "Giảm đối tượng",
  },
  {
    key: 4,
    title: "Khuyến mại",
  },
  {
    key: 5,
    title: "Bảo hiểm",
  },
  {
    key: 6,
    title: "Thành tiền",
  },
  {
    key: 7,
    title: "",
  },
];

const TABLE_ROW_ITEMS: CartInformation[] = [
  {
    username: "Vũ Quang Huy",
    seatInfo: "SE8 Sài Gòn - Hà Nội, 04/01/2024 06:00, Toa 2 chỗ 49, Ngồi mềm điều hòa",
    price: 800000,
    discountForPerson: 0,
    promotion: "Không có khuyến mại cho vé này",
    insurance: 1000,
    total: 895000,
  },
  {
    username: "Vũ Quang Huy",
    seatInfo: "SE8 Sài Gòn - Hà Nội, 04/01/2024 06:00, Toa 2 chỗ 49, Ngồi mềm điều hòa",
    price: 800000,
    discountForPerson: 0,
    promotion: "Không có khuyến mại cho vé này",
    insurance: 1000,
    total: 895000,
  },
  {
    username: "Vũ Quang Huy",
    seatInfo: "SE8 Sài Gòn - Hà Nội, 04/01/2024 06:00, Toa 2 chỗ 49, Ngồi mềm điều hòa",
    price: 800000,
    discountForPerson: 0,
    promotion: "Không có khuyến mại cho vé này",
    insurance: 1000,
    total: 895000,
  },
];

const INPUT: CheckoutInputObj[] = [
  {
    key: "username",
    label: "Họ và tên",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "phone",
    label: "Số điện thoại",
  },
  {
    key: "citizenID",
    label: "Số CMND / Hộ chiếu",
  },
  {
    key: "confirm-email",
    label: "Xác nhận email",
  },
];

const INPUT_LEFT: CheckoutInputObj[] = [
  {
    key: "username",
    label: "Họ và tên",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "confirm-email",
    label: "Xác nhận email",
  },
];

const INPUT_RIGHT: CheckoutInputObj[] = [
  {
    key: "phone",
    label: "Số điện thoại",
  },
  {
    key: "citizenID",
    label: "Số CMND / Hộ chiếu",
  },
];

const renderCheckoutInput = (type: string) => {
  if (type === "large-screen") {
    return (
      <div className="flex justify-center gap-10">
        <div className="flex-1">
          {INPUT_LEFT.map((item: CheckoutInputObj) => (
            <div key={item.key} className="w-full flex-1 md:flex md:justify-between lg:mx-0">
              <Label className="ml-5" htmlFor={item.key}>
                {item.label}
              </Label>
              <Input id={item.key} className="w-3/4 md:mx-0" />
            </div>
          ))}
        </div>
        <div className="flex-1">
          {INPUT_RIGHT.map((item: CheckoutInputObj) => (
            <div key={item.key} className="w-full flex-1 md:flex md:justify-between lg:mx-0">
              <Label className="ml-5" htmlFor={item.key}>
                {item.label}
              </Label>
              <Input id={item.key} className="mx-auto w-3/4 md:mx-0" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return INPUT.map((item: CheckoutInputObj) => (
    <div key={item.key} className="w-full flex-1 md:ml-5 md:flex md:justify-between">
      <Label className="ml-5" htmlFor={item.key}>
        {item.label}
      </Label>
      <Input id={item.key} className="mx-auto w-3/4 md:mx-0" />
    </div>
  ));
};

const CheckoutInput = () => {
  return (
    <div className="mx-auto flex min-h-screen min-w-[320px] max-w-7xl flex-col bg-white px-5">
      <div className="mx-auto my-5 md:overflow-x-auto">
        <h3 className="text-attention my-5 ml-5 font-medium uppercase">Thông tin giỏ vé</h3>
        <Table className="mx-auto w-full">
          <TableHeader className="">
            <TableRow className=" text-center text-white">
              {TABLE_HEAD_ITEMS.map((item) => (
                <TableHead className="min-w-28 text-center" key={item.key}>
                  {item.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {TABLE_ROW_ITEMS.map((item: CartInformation) => (
              <TableRow key={item.username}>
                <TableCell className="text-center">{item.username}</TableCell>
                <TableCell className="text-center">{item.seatInfo}</TableCell>
                <TableCell className="text-center">{item.price}</TableCell>
                <TableCell className="text-center">{item.discountForPerson}</TableCell>
                <TableCell className="text-center">{item.promotion}</TableCell>
                <TableCell className="text-center">{item.insurance}</TableCell>
                <TableCell className="text-center">{item.total}</TableCell>
                <TableCell className="text-center">
                  <Button variant="button" color="destructive">
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="">
        <h3 className="text-attention my-5 ml-5 font-medium uppercase">Thông tin người đặt vé</h3>
        <p className="mb-5 text-indigo-500">
          Quý khách vui lòng điền đầy đủ và chính xác các thông tin về người mua vé dưới đây. Các thông tin sẽ
          được sử dụng để xác minh người mua vé tại ga trước khi lên tàu theo đúng quy định của Tổng công ty
          Đường sắt Việt Nam
        </p>
        <div className="flex flex-col items-center lg:hidden">{renderCheckoutInput("small-screen")}</div>
        <div className=" hidden w-full lg:inline-block">{renderCheckoutInput("large-screen")}</div>
      </div>
      <div>
        <div className="my-5 flex h-max items-start justify-center gap-5">
          <input className="mt-1" type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">
            Tôi đã đọc kỹ và đồng ý tuân thủ tất cả các
            <span className="text-indigo-500"> quy định mua vé trực tuyến, các chương trình khuyến mại </span>
            của Tổng công ty đường sắt Việt Nam và chịu trách nhiệm về tính xác thực của các thông tin trên
          </label>
        </div>
        <div className="mb-5 flex justify-between">
          <Button variant="button" color="primary">
            Quay lại
          </Button>
          <Button variant="button" color="primary">
            Tiếp theo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutInput;

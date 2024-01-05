/* eslint-disable no-restricted-imports */
import { useMutation } from "@tanstack/react-query";
import noop from "lodash/noop";
import type { FormEventHandler } from "react";
import React from "react";
import { toast } from "sonner";

import { env } from "@ttbs/env";
import { HttpError } from "@ttbs/lib/http-error";
import type { Order } from "@ttbs/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@ttbs/ui/components/table/TableNew";

import type { ResponseError } from "@/types/base";
import { currencyFormatter } from "@/utils/currency";

import { SelectedSeatText } from "../cart/cart-item";
import { useCart } from "../cart/context";
import { post } from "../lib/fetch";
import type { OrderFormValues } from "./order-form";

const TABLE_HEAD_ITEMS = [
  {
    key: 0,
    title: "STT",
  },
  {
    key: 1,
    title: "Thông tin vé mua",
  },
  {
    key: 2,
    title: "Giá vé",
  },
] as const;

const ConfirmOrderInformation = (
  props: { onSubmit: () => void; onSuccess?: (order: Order) => void } & Omit<
    JSX.IntrinsicElements["form"],
    "onSubmit" | "ref"
  >
) => {
  const { onSubmit, onSuccess = noop, ...rest } = props;
  const { lineItems, buyer } = useCart();

  const mutation = useMutation({
    mutationFn: async (values: Omit<OrderFormValues, "agreeRule">) => {
      const totalAmount = values.tickets.reduce((p, a) => p + a.amount, 0);

      const res = await post(`${env.NEXT_PUBLIC_API_BASE_URI}/api/orders`, {
        ...values,
        amount: totalAmount,
      });
      console.log("🚀 ~ file: order-form.tsx:114 ~ mutationFn: ~ res:", res);

      if (res.error) {
        const respError = res.error as ResponseError;

        toast.error(respError.message);
      } else {
        onSuccess(res.data as Order);
      }
    },
    onError(err) {
      if (err instanceof HttpError) {
        const message = `${err.statusCode}: ${err.message}`;
        toast.error(message);
      }
    },
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    onSubmit();

    const formValues: Omit<OrderFormValues, "agreeRule"> = {
      tickets: lineItems.map(({ id, ...rest }) => ({
        seatId: id,
        ...rest,
      })),
      buyerEmail: buyer.email,
      buyerIdentification: buyer.identification,
      buyerName: buyer.name,
      buyerPhone: buyer.phone,
    };
    mutation.mutate(formValues);
  };

  return (
    <form onSubmit={handleSubmit} {...rest}>
      <div>
        <h3 className="text-attention text-lg font-medium">Thông tin người mua vé</h3>
        <div>
          <p> - họ và tên: {buyer.name ?? ""}</p>
          <p> - số CMND/Hộ chiếu: {buyer.identification ?? ""}</p>
          <p> - Số di động: {buyer.phone}</p>
          <p> - Email: {buyer.email}</p>
        </div>

        <h3 className="text-attention mb-3 mt-5 text-lg font-medium">Thông tin vé mua</h3>
        <div className="md:overflow-x-auto">
          <Table className="border md:w-full">
            <TableHeader>
              <TableRow className=" text-center text-white">
                {TABLE_HEAD_ITEMS.map((item) => (
                  <TableHead className="min-w-28 text-center" key={item.key}>
                    {item.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {lineItems.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{idx + 1}</TableCell>
                  <TableCell className="text-left">
                    <div className="mx-2 flex flex-col">
                      <div className="flex justify-between">
                        <p>Họ tên: {item.userName}</p>
                        <p>Số giấy tờ: {item.userIdentification}</p>
                      </div>
                      <div>
                        <p>
                          Hành trình:
                          <SelectedSeatText seat={item} />
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{currencyFormatter.format(item.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="border-subtle border-t">
              <TableRow>
                <TableCell className="text-right font-semibold" colSpan={2}>
                  Tổng tiền
                </TableCell>
                <TableCell colSpan={1} className="text-center font-semibold">
                  {currencyFormatter.format(lineItems.reduce((p, a) => p + a.amount, 0))}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        <p className="text-subtle mt-6">
          Quý khách vui lòng kiểm tra kỹ và xác nhận các thông tin đã nhập trước khi thực hiện giao dịch mua
          vé. Sau khi thực hiện giao dịch thanh toán ở trang tiếp theo quý khách sẽ không thể thay đổi được
          thông tin mua vé ở trên
        </p>
      </div>
    </form>
  );
};

export default ConfirmOrderInformation;

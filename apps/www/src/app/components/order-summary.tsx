/* eslint-disable no-restricted-imports */
import { useQuery } from "@tanstack/react-query";
import { noop } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";

import { env } from "@ttbs/env";
import type { Seat, Order, SeatType, Ticket, Train, Station, TripTimeline, Carriage } from "@ttbs/prisma";
import { Form, SkeletonText } from "@ttbs/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@ttbs/ui/components/table/TableNew";

import { currencyFormatter } from "@/utils/currency";

import type { OrderFormValues } from "../checkout/order-form";
import dayjs from "../lib/dayjs";
import { get } from "../lib/fetch";

const TABLE_HEAD_ITEMS = [
  {
    key: 0,
    title: "Họ tên",
  },
  {
    key: 1,
    title: "Số CCCD/CMND/Hộ chiếu",
  },
  {
    key: 2,
    title: "Loại chỗ",
  },
  {
    key: 3,
    title: "Thông tin vé",
  },
  {
    key: 4,
    title: "Giá vé",
  },
] as const;

const OrderSummary = (
  props: { onSubmit?: () => void; orderId?: number } & Omit<JSX.IntrinsicElements["form"], "onSubmit" | "ref">
) => {
  const { onSubmit = noop, orderId, ...rest } = props;

  const { data: order } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/orders/${orderId}`);

      const order = res.data as Order & {
        tickets: Array<
          Ticket & {
            seatType: SeatType;
            seat: Seat;
            fromTineline: TripTimeline;
            fromStation: Station;
            toStation: Station;
            train: Train;
            carriage: Carriage;
          }
        >;
      };

      return order;
    },
    enabled: !!orderId,
  });

  const formMethods = useForm<Omit<OrderFormValues, "tickets" | "agreeRule">>({
    defaultValues: {
      buyerName: order?.buyerName ?? "",
      buyerIdentification: order?.buyerName ?? "",
      buyerPhone: order?.buyerName ?? "",
      buyerEmail: order?.buyerName ?? "",
    },
  });

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Form form={formMethods} handleSubmit={handleSubmit} {...rest}>
      <div className="flex flex-col">
        <div>
          <h3 className="text-attention mb-2 text-lg font-medium">Thông tin người đặt vé</h3>
          <div>
            <p> - họ và tên: {order ? order.buyerName : <SkeletonText className="h-4 w-20" />}</p>
            <p>
              - số CMND/Hộ chiếu: {order ? order.buyerIdentification : <SkeletonText className="h-4 w-20" />}
            </p>
            <p> - Số di động: {order ? order.buyerPhone : <SkeletonText className="h-4 w-20" />}</p>
            <p> - Email: {order ? order.buyerEmail : <SkeletonText className="h-4 w-20" />}</p>
          </div>
        </div>

        <div className="mt-5 md:overflow-x-auto">
          <Table className="border md:w-full">
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
              {order
                ? order.tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="text-center">{ticket.userName}</TableCell>
                      <TableCell className="text-center">{ticket.userIdentification}</TableCell>
                      <TableCell className="text-center">{ticket.seatType.name}</TableCell>
                      <TableCell className="text-left">
                        <p>
                          {ticket.train.name} - {ticket.train.code}
                        </p>
                        <p>{dayjs(ticket.fromTineline.departDate).format("L HH:mm")}</p>
                        <p>
                          Toa: {ticket.carriage.order} Chỗ số: {ticket.seat.order}
                        </p>
                      </TableCell>
                      <TableCell className="text-center">{currencyFormatter.format(ticket.amount)}</TableCell>
                    </TableRow>
                  ))
                : Array.from({ length: 3 }).map((_, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-center">
                        <SkeletonText className="h-5 w-20" />
                      </TableCell>
                      <TableCell className="text-center">
                        <SkeletonText className="h-5 w-20" />
                      </TableCell>
                      <TableCell className="text-center">
                        <SkeletonText className="h-5 w-20" />
                      </TableCell>
                      <TableCell className="text-center">
                        <SkeletonText className="h-5 w-20" />
                      </TableCell>
                      <TableCell className="text-center">
                        <SkeletonText className="h-5 w-20" />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
            <TableFooter className="border-subtle border-t">
              <TableRow>
                <TableCell className="text-right font-semibold" colSpan={4}>
                  Tổng tiền
                </TableCell>
                <TableCell colSpan={1} className="text-center font-semibold">
                  {order ? (
                    currencyFormatter.format(order.tickets.reduce((p, a) => p + a.amount, 0))
                  ) : (
                    <SkeletonText className="h-5 w-20" />
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </Form>
  );
};

export default OrderSummary;

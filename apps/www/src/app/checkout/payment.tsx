/* eslint-disable no-restricted-imports */
import { useQuery } from "@tanstack/react-query";
import noop from "lodash/noop";
import Image from "next/image";
import type { FormEventHandler } from "react";
import React, { useState } from "react";
import { toast } from "sonner";

import { env } from "@ttbs/env";
import { useTypedQuery } from "@ttbs/lib";
import type { Order, PaymentStatus } from "@ttbs/prisma";
import { SkeletonText } from "@ttbs/ui";

import { currencyFormatter } from "@/utils/currency";

import { CopyButton } from "../components/copy-button";
import { get } from "../lib/fetch";
import { generateVietQrUrl } from "../lib/helpers";
import { orderCheckoutQuerySchema } from "./query-schema";

const OrderPayment = (
  props: {
    onSubmit: () => void;
    onSuccess?: () => void;
    onError?: () => void;
  } & Omit<JSX.IntrinsicElements["form"], "onSubmit" | "ref">,
) => {
  const {
    data: { orderId },
  } = useTypedQuery(orderCheckoutQuerySchema);
  const { onSubmit, onSuccess = noop, onError = noop, ...rest } = props;

  const [fetchedStatus, setFetchedStatus] = useState(false);

  const { data: order } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      const res = await get(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/orders/${orderId}`,
      );

      const order = res.data as Order;
      // if (order.paymentStatus === "PAID") onSuccess();

      return order;
    },
  });

  useQuery({
    queryKey: ["orders-payment-status", orderId],
    queryFn: async () => {
      const res = await get(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/orders/${orderId}/payment-status`,
      );

      const status = res.data as PaymentStatus;

      if (status === "PENDING") {
        throw new Error("Chua nhan duoc payment :(");
      }
      if (status === "PAID") {
        toast.dismiss();
        onSuccess();
      }

      return status;
    },
    retry(failureCount) {
      if (failureCount > 4) {
        toast.dismiss();
        setFetchedStatus(false);
        toast.error(
          "Hệ thống chưa nhận được chuyển khoản, vui lòng thử lại sau",
        );
        onError();

        return false;
      }
      return true;
    },
    retryDelay(failureCount) {
      return Math.min(
        failureCount > 1 ? 2 ** failureCount * 1000 : 1000,
        30 * 1000,
      );
    },
    enabled: fetchedStatus,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    onSubmit();
    toast.loading("Đang kiểm tra tình trạng thanh toán", {
      duration: 100000,
    });

    setFetchedStatus(true);
  };

  return (
    <form onSubmit={handleSubmit} {...rest}>
      <div>
        <h3 className="text-attention mb-3 text-lg font-medium">
          Thông tin chuyển khoản
        </h3>
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <div className="relative aspect-[54/64] w-full min-w-[250px] max-w-[540px]">
            {order ? (
              <Image
                src={generateVietQrUrl(order)}
                alt=""
                fill
                className="relative"
              />
            ) : (
              <div>lmao</div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-4 flex items-center space-x-2">
              <div className="relative">
                <Image
                  src="/img/mbbank-logo.jpeg"
                  alt="MB Bank logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <div>
                <div className="text-subtle text-sm">Ngân hàng</div>
                <div className="font-semibold">Ngân hàng TMCP Quân đội</div>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-subtle text-sm ">Chủ tài khoản:</div>
                <div className="font-semibold uppercase">Easy Boarding</div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-subtle text-sm">Số tài khoản:</div>
                    <div className="text-sm font-semibold">0855269237</div>
                  </div>
                  <CopyButton text="0855269237" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-subtle text-sm">Số tiền:</div>
                    {order ? (
                      <div className="text-sm font-semibold">
                        {currencyFormatter.format(order.amount)}
                      </div>
                    ) : (
                      <SkeletonText className="h-6 w-10" />
                    )}
                  </div>
                  <CopyButton text={`${order?.amount}`} disabled={!order} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-subtle text-sm">Nội dung:</div>
                    {order ? (
                      <div className="text-sm font-semibold">{`EB ${order.id}`}</div>
                    ) : (
                      <SkeletonText className="h-6 w-10" />
                    )}
                  </div>
                  <CopyButton text={`EB ${order?.id}`} disabled={!order} />
                </div>
              </div>
            </div>

            <div className="text-subtle mt-4 text-sm md:mt-10">
              Lưu ý: Nhập chính xác số tiền{" "}
              {order ? (
                <span>{order.amount}</span>
              ) : (
                <SkeletonText className="h-5 w-6" />
              )}{" "}
              khi chuyển khoản
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OrderPayment;

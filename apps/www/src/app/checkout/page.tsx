"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { useCompatSearchParams, useTypedQuery } from "@ttbs/lib";
import { WizardForm } from "@ttbs/ui";
import { Card, CardContent } from "@ttbs/ui";

import OrderSummary from "../components/order-summary";
import ConfirmOrderInformation from "./confirm-order-information";
import OrderForm from "./order-form";
import OrderPayment from "./payment";
import { orderCheckoutQuerySchema } from "./query-schema";
import { useSetStep } from "./use-set-step";

const Checkout = () => {
  const searchParams = useCompatSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setStep = useSetStep();

  const {
    data: { orderId },
  } = useTypedQuery(orderCheckoutQuerySchema);

  const steps: React.ComponentProps<typeof WizardForm>["steps"] = [
    {
      title: "Thông tin đặt vé",
      description: "Nhập thông tin hành khách",
      content: (setIsLoading) => (
        <OrderForm
          id="wizard-step-1"
          name="wizard-step-1"
          onSubmit={() => {
            setIsLoading(true);
            setStep(2);
          }}
        />
      ),
    },
    {
      title: "Xác nhận thông tin",
      description: "Kiểm tra thông tin trước khi thanh toán",
      content: (setIsLoading) => {
        return (
          <ConfirmOrderInformation
            id="wizard-step-2"
            name="wizard-step-2"
            onSubmit={() => {
              setIsLoading(true);
            }}
            onSuccess={(order) => {
              const _searchParams = new URLSearchParams(searchParams ?? undefined);
              _searchParams.set("orderId", order.id.toString());
              _searchParams.set("step", "3");

              router.replace(`${pathname}?${_searchParams.toString()}`);
            }}
          />
        );
      },
    },
    {
      title: "Thanh toán",
      description: "Mở App Ngân hàng bất kỳ để quét mã QR hoặc chuyển khoản chính xác nội dung bên dưới",
      hidePrev: true,
      content: (setIsLoading) => {
        return (
          <OrderPayment
            id="wizard-step-3"
            name="wizard-step-3"
            onSubmit={() => {
              setIsLoading(true);
            }}
            onSuccess={() => {
              setStep(4);
            }}
            onError={() => {
              setIsLoading(false);
            }}
          />
        );
      },
    },
    {
      title: "Hoàn tất",
      description: "Giao dịch hoàn tất",
      hidePrev: true,
      content: (setIsLoading) => {
        return (
          <OrderSummary
            id="wizard-step-4"
            name="wizard-step-4"
            orderId={orderId}
            onSubmit={() => {
              setIsLoading(true);
              router.replace("/");
            }}
          />
        );
      },
    },
  ];

  return (
    <div className="md:text-normal mx-auto mt-5 min-h-[100vh] w-full max-w-7xl p-5 text-sm md:mt-10">
      <Card className="bg-default block w-full">
        <CardContent className="px-0 md:px-6">
          <WizardForm
            href="/checkout"
            steps={steps}
            nextLabel="Tiếp theo"
            finishLabel="Hoàn tất"
            prevLabel="Quay lại"
            stepLabel={(currentStep, maxSteps) => `Bước ${currentStep}/${maxSteps}`}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;

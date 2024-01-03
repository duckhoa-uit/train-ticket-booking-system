"use client";

import React from "react";

import { WizardForm } from "@ttbs/ui";
import { Card, CardContent } from "@ttbs/ui";

import OrderForm from "./order-form";
import { useSetStep } from "./use-set-step";

const Checkout = () => {
  const setStep = useSetStep();

  const steps: React.ComponentProps<typeof WizardForm>["steps"] = [
    {
      title: "Thông tin đơn hàng",
      description: "Nhập thông tin hành khách cho từng vé và người mua ",
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
          <OrderForm
            id="wizard-step-2"
            name="wizard-step-2"
            onSubmit={() => {
              setIsLoading(true);
              setStep(3);
            }}
          />
        );
      },
    },
    {
      title: "Thanh toán",
      description: "Thanh toán đơn hàng bằng cách chuyển khoản hoặc trả sau",
      content: (setIsLoading) => {
        return (
          <OrderForm
            id="wizard-step-3"
            name="wizard-step-3"
            onSubmit={() => {
              setIsLoading(true);
              setStep(4);
            }}
          />
        );
      },
    },
    {
      title: "Hoàn tất",
      description: "",
      content: (setIsLoading) => {
        return (
          <OrderForm
            id="wizard-step-4"
            name="wizard-step-4"
            onSubmit={() => {
              setIsLoading(true);
              setStep(5);
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

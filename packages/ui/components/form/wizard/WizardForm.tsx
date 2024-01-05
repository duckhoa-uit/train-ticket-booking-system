/* eslint-disable no-restricted-imports */
// eslint-disable-next-line no-restricted-imports
"use client";

import { noop } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { cn } from "@ttbs/lib/cn";

import { Button, Steps } from "../../..";

/* eslint-disable no-restricted-imports */
// eslint-disable-next-line no-restricted-imports

/* eslint-disable no-restricted-imports */
// eslint-disable-next-line no-restricted-imports

/* eslint-disable no-restricted-imports */
// eslint-disable-next-line no-restricted-imports

/* eslint-disable no-restricted-imports */
// eslint-disable-next-line no-restricted-imports

/* eslint-disable no-restricted-imports */
// eslint-disable-next-line no-restricted-imports

type DefaultStep = {
  title: string;
  containerClassname?: string;
  contentClassname?: string;
  description: string;
  content?: ((setIsLoading: Dispatch<SetStateAction<boolean>>) => JSX.Element) | JSX.Element;
  isEnabled?: boolean;
  isLoading?: boolean;
  hidePrev?: boolean;
};

function WizardForm<T extends DefaultStep>(props: {
  href: string;
  steps: T[];
  disableNavigation?: boolean;
  containerClassname?: string;
  prevLabel?: string;
  nextLabel?: string;
  finishLabel?: string;
  stepLabel?: React.ComponentProps<typeof Steps>["stepLabel"];
}) {
  const searchParams = useSearchParams();
  const { href, steps, nextLabel = "Next", finishLabel = "Finish", prevLabel = "Back", stepLabel } = props;
  const router = useRouter();
  const step = parseInt((searchParams?.get("step") as string) || "1");
  const currentStep = steps[step - 1];
  const setStep = (newStep: number) => {
    router.replace(`${href}?step=${newStep || 1}`);
  };
  const [currentStepIsLoading, setCurrentStepIsLoading] = useState(false);

  useEffect(() => {
    setCurrentStepIsLoading(false);
  }, [currentStep]);

  return (
    <div className="mx-auto mt-4 print:w-full" data-testid="wizard-form">
      <div className={cn("overflow-hidden md:mb-2", props.containerClassname)}>
        <div className="px-6 py-5">
          <h1 className="font-cal text-emphasis text-xl font-medium" data-testid="step-title">
            {currentStep.title}
          </h1>
          <p className="text-subtle text-sm" data-testid="step-description">
            {currentStep.description}
          </p>
          {!props.disableNavigation && (
            <Steps
              maxSteps={steps.length}
              currentStep={step}
              navigateToStep={noop}
              stepLabel={stepLabel}
              data-testid="wizard-step-component"
            />
          )}
        </div>
      </div>
      <div className={cn("mb-8 overflow-hidden", props.containerClassname)}>
        <div className={cn("print:p-none px-8 py-5 sm:p-6", currentStep.contentClassname)}>
          {typeof currentStep.content === "function"
            ? currentStep.content(setCurrentStepIsLoading)
            : currentStep.content}
        </div>
        {!props.disableNavigation && (
          <div className="flex justify-end px-4 py-4 print:hidden sm:px-6">
            {step > 1 && !currentStep.hidePrev && (
              <Button
                color="secondary"
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                {prevLabel}
              </Button>
            )}

            <Button
              tabIndex={0}
              loading={currentStepIsLoading}
              type="submit"
              color="primary"
              form={`wizard-step-${step}`}
              disabled={currentStep.isEnabled === false}
              className="relative ml-2"
            >
              {step < steps.length ? nextLabel : finishLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WizardForm;

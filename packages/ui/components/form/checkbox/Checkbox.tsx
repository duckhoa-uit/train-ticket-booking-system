"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { useId } from "@radix-ui/react-id";
import { Check } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import React, { forwardRef } from "react";

import { cn } from "@ttbs/lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  description: string;
  descriptionAsLabel?: boolean;
  informationIconText?: string;
  error?: boolean;
  className?: string;
  descriptionClassName?: string;
  /**
   * Accepts this special property instead of allowing description itself to be accidentally used in dangerous way.
   */
  descriptionAsSafeHtml?: string;
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "border-default data-[state=checked]:bg-brand-default data-[state=checked]:text-brand peer h-4 w-4 shrink-0 rounded-[4px] border ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const CheckboxField = forwardRef<HTMLInputElement, Props>(
  ({ label, description, error, disabled, descriptionAsSafeHtml, ...rest }, ref) => {
    const descriptionAsLabel = !label || rest.descriptionAsLabel;
    const id = useId();
    return (
      <div className="block items-center sm:flex">
        {label && (
          <div className="mb-4 min-w-48 sm:mb-0">
            {React.createElement(
              descriptionAsLabel ? "div" : "label",
              {
                className: cn("flex text-sm font-medium text-emphasis"),
                ...(!descriptionAsLabel
                  ? {
                      htmlFor: rest.id ? rest.id : id,
                    }
                  : {}),
              },
              label
            )}
          </div>
        )}
        <div className="w-full">
          <div className="relative flex items-center">
            {React.createElement(
              descriptionAsLabel ? "label" : "div",
              {
                className: cn(
                  "relative flex items-start",
                  !error && descriptionAsLabel ? "text-default" : "text-emphasis",
                  error && "text-error"
                ),
              },
              <>
                <div className="flex h-5 items-center">
                  <input
                    {...rest}
                    ref={ref}
                    type="checkbox"
                    disabled={disabled}
                    id={rest.id ? rest.id : id}
                    className={cn(
                      "text-emphasis focus:ring-emphasis border-default bg-default focus:bg-default active:bg-default h-4 w-4 rounded focus:outline-none focus:ring-0 ltr:mr-2 rtl:ml-2",
                      !error && disabled
                        ? "cursor-not-allowed bg-gray-300 checked:bg-gray-300 hover:bg-gray-300 hover:checked:bg-gray-300"
                        : "hover:checked:bg-brand-emphasis hover:border-emphasis checked:bg-brand-default",
                      error &&
                        "border-error hover:bg-error hover:border-error checked:bg-darkerror checked:hover:border-error checked:hover:bg-darkerror",
                      rest.className
                    )}
                  />
                </div>
                {descriptionAsSafeHtml ? (
                  <span
                    className={cn("ms-2 text-sm", rest.descriptionClassName)}
                    dangerouslySetInnerHTML={{
                      __html: descriptionAsSafeHtml,
                    }}
                  />
                ) : (
                  <span className={cn("ms-2 text-sm", rest.descriptionClassName)}>{description}</span>
                )}
              </>
            )}
            {/* {informationIconText && <InfoBadge content={informationIconText}></InfoBadge>} */}
          </div>
        </div>
      </div>
    );
  }
);

CheckboxField.displayName = "CheckboxField";

export { Checkbox, CheckboxField };

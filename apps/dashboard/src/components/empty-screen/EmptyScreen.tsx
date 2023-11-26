import type { ReactNode } from "react";
import React from "react";

import { cn } from "@ttbs/lib/cn";
import type { SVGComponent } from "@ttbs/types/SVGComponent";
import { Button } from "@ttbs/ui";
import type { LucideIcon as IconType } from "@ttbs/ui/components/icons";

export function EmptyScreen({
  Icon,
  avatar,
  headline,
  description,
  buttonText,
  buttonOnClick,
  buttonRaw,
  border = true,
  dashedBorder = true,
  className,
}: {
  Icon?: SVGComponent | IconType;
  avatar?: React.ReactElement;
  headline: string | React.ReactElement;
  description?: string | React.ReactElement;
  buttonText?: string;
  buttonOnClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  buttonRaw?: ReactNode; // Used incase you want to provide your own button.
  border?: boolean;
  dashedBorder?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div
        data-testid="empty-screen"
        className={cn(
          "flex w-full select-none flex-col items-center justify-center rounded-lg p-7 lg:p-20",
          border && "border-subtle border",
          dashedBorder && "border-dashed",
          className
        )}
      >
        {!avatar ? null : (
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full">{avatar}</div>
        )}
        {!Icon ? null : (
          <div className="bg-emphasis flex h-[72px] w-[72px] items-center justify-center rounded-full ">
            <Icon className="text-default inline-block h-10 w-10 stroke-[1.3px]" />
          </div>
        )}
        <div className="flex max-w-[420px] flex-col items-center">
          <h2 className={cn("text-semibold font-cal text-emphasis text-center text-xl", Icon && "mt-6")}>
            {headline}
          </h2>
          {description && (
            <div className="text-default mb-8 mt-3 text-center text-sm font-normal leading-6">
              {description}
            </div>
          )}
          {buttonOnClick && buttonText && <Button onClick={(e) => buttonOnClick(e)}>{buttonText}</Button>}
          {buttonRaw}
        </div>
      </div>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { toast } from "sonner";

import { useCopyToClipboard } from "@ttbs/lib";
import { Button, Tooltip } from "@ttbs/ui";

export function CopyButton({ text, disabled = false }: { text: string; disabled?: boolean }) {
  const [_, copy] = useCopyToClipboard();

  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Tooltip content="Sao chép">
      <Button
        disabled={disabled}
        color="secondary"
        variant="icon"
        onClick={() => {
          setCopied(true);
          copy(text);
          toast.success(`Đã sao chép ${text} vào clipboard`);
        }}
      >
        <div
          style={{
            position: "relative",
            height: 16,
            width: 16,
          }}
        >
          <Clippy
            style={{
              // color: colors.gray[8],
              position: "absolute",
              top: 0,
              left: 0,
              strokeDasharray: 50,
              strokeDashoffset: copied ? -50 : 0,
              transition: "all 300ms ease-in-out",
            }}
          />
          <Check
            style={{
              // color: colors.green[5],
              position: "absolute",
              top: 0,
              left: 0,
              strokeDasharray: 50,
              strokeDashoffset: copied ? 0 : -50,
              transition: "all 300ms ease-in-out",
            }}
          />
        </div>
      </Button>
    </Tooltip>
  );
}

function Clippy(props: any) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5.75 4.75H10.25V1.75H5.75V4.75Z" />
      <path d="M3.25 2.88379C2.9511 3.05669 2.75 3.37987 2.75 3.75001V13.25C2.75 13.8023 3.19772 14.25 3.75 14.25H12.25C12.8023 14.25 13.25 13.8023 13.25 13.25V3.75001C13.25 3.37987 13.0489 3.05669 12.75 2.88379" />
    </svg>
  );
}

function Check(props: any) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M13.25 4.75L6 12L2.75 8.75" />
    </svg>
  );
}

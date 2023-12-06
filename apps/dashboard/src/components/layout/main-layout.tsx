import type { ComponentProps } from "react";
import React from "react";

import type { Layout } from "./common";
import Shell from "./common";

export default function MainLayout({
  children,
  ...rest
}: { children: React.ReactNode } & ComponentProps<typeof Layout>) {
  return (
    <Shell withoutMain={true} {...rest}>
      {children}
    </Shell>
  );
}

import type { ComponentProps } from "react";
import React from "react";

import { KBarWrapper } from "../kbar/wrapper";
import { Layout } from "./common";

export default function MainLayout({
  children,
  ...rest
}: { children: React.ReactNode } & ComponentProps<typeof Layout>) {
  return (
    <KBarWrapper withKBar>
      <Layout withoutMain {...rest}>
        {children}
      </Layout>
    </KBarWrapper>
  );
}

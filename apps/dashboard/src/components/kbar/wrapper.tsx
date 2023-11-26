"use client";

import { KBarContent, KBarRoot } from "@/components/kbar/Kbar";

export const KBarWrapper = ({
  children,
  withKBar = false,
}: {
  withKBar: boolean;
  children: React.ReactNode;
}) =>
  withKBar ? (
    <KBarRoot>
      {children}
      <KBarContent />
    </KBarRoot>
  ) : (
    <>{children}</>
  );

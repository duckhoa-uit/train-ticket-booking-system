"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

import { LangProvider } from "@ttbs/i18n";
import { TailwindIndicator } from "@ttbs/ui";

import CartProvider from "./cart/context";

export default function Providers({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <LangProvider lang={lang}>
          <TooltipProvider>
            {children}
            <Toaster richColors />
            <TailwindIndicator />
          </TooltipProvider>
        </LangProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

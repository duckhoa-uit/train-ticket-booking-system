"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

import { LangProvider } from "@ttbs/i18n";

export default function Providers({ children, lang }: { children: React.ReactNode; lang: string }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      //disableTransitionOnChange
      storageKey="DARK_MODE_STORAGE_KEY"
      attribute="class">
      <QueryClientProvider client={queryClient}>
        <LangProvider lang={lang}>
          <TooltipProvider>{children}</TooltipProvider>
        </LangProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

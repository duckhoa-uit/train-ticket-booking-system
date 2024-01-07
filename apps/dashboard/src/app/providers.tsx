"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { Toaster } from "sonner";

import { LangProvider } from "@ttbs/i18n";

export default function Providers({ children, lang }: { children: React.ReactNode; lang: string }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      //disableTransitionOnChange
      storageKey="DARK_MODE_STORAGE_KEY"
      attribute="class"
      defaultTheme="light"
    >
      <QueryClientProvider client={queryClient}>
        <LangProvider lang={lang}>
          <TooltipProvider>
            <SessionProvider>
              <Toaster richColors />
              {children}
            </SessionProvider>
          </TooltipProvider>
        </LangProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

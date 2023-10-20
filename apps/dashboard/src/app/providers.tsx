'use client';

import { ThemeProvider } from 'next-themes';
import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LangProvider } from '@/lang/provider';
import { TooltipProvider } from '@radix-ui/react-tooltip';

export default function Providers({ children, lang }: { children: React.ReactNode; lang: string }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      //disableTransitionOnChange
      storageKey={'DARK_MODE_STORAGE_KEY'}
      attribute="class"
    >
      <QueryClientProvider client={queryClient}>
        <LangProvider lang={lang}>
          <TooltipProvider>{children}</TooltipProvider>
        </LangProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

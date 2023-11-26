import MainLayout from "@/components/layout/main-layout";

import { ReactQueryProvider } from "./react-query-provider";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <ReactQueryProvider>
      <MainLayout>{children}</MainLayout>
    </ReactQueryProvider>
  );
}

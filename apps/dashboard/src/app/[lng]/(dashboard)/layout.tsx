import { ReactQueryProvider } from "./react-query-provider";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}

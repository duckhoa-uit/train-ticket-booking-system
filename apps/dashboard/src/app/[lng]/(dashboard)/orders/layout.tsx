import { useServerTranslation } from "@ttbs/i18n";

import { ShellMain } from "@/components/layout/common";
import MainLayout from "@/components/layout/main-layout";

export default async function SeatTypesLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  const { t } = await useServerTranslation(lng);

  return (
    <MainLayout>
      <ShellMain
        withoutSeo
        hideHeadingOnMobile
        heading={t("orders_page_title")}
      >
        {children}
      </ShellMain>
    </MainLayout>
  );
}

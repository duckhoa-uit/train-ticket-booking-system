import { useServerTranslation } from "@ttbs/i18n";

import { ShellMain } from "@/components/layout/common";
import MainLayout from "@/components/layout/main-layout";

import { NewSeatTypeButton } from "./_components/new-seat-type-button";

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
        heading={t("seat_types_page_title")}
        hideHeadingOnMobile
        subtitle={t("seat_types_page_subtitle")}
        CTA={<NewSeatTypeButton />}
      >
        {children}
      </ShellMain>
    </MainLayout>
  );
}

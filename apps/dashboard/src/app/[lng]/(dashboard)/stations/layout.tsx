import { useServerTranslation } from "@ttbs/i18n";

import { ShellMain } from "@/components/layout/common";
import MainLayout from "@/components/layout/main-layout";

import { NewStationButton } from "./_components/new-station-button";

export default async function StationsLayout({
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
        heading={t("stations_page_title")}
        hideHeadingOnMobile
        subtitle={t("stations_page_subtitle")}
        CTA={<NewStationButton />}
      >
        {children}
      </ShellMain>
    </MainLayout>
  );
}

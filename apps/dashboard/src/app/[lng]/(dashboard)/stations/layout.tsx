import { useServerTranslation } from "@ttbs/i18n";

import { ShellMain } from "@/components/layout/common";
import { NewStationButton } from "@/components/stations/new-station-button";

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
    <ShellMain
      withoutSeo
      heading={t("stations_page_title")}
      hideHeadingOnMobile
      subtitle={t("stations_page_subtitle")}
      CTA={<NewStationButton />}
    >
      {children}
    </ShellMain>
  );
}

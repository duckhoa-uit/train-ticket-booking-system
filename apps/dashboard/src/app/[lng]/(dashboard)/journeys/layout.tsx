import { useServerTranslation } from "@ttbs/i18n";

import { ShellMain } from "@/components/layout/common";

import { NewJourneyButton } from "./_components/new-journey-button";

export default async function JourneysLayout({
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
    <ShellMain withoutSeo heading={t("journeys_page_title")} hideHeadingOnMobile CTA={<NewJourneyButton />}>
      {children}
    </ShellMain>
  );
}

"use client";

import { useClientTranslation } from "@ttbs/i18n";

import { ShellMain } from "@/components/layout/common";
import MainLayout from "@/components/layout/main-layout";

import { Filters } from "./_components/filters";
import { OrderStatusLineChart } from "./_components/order-status-line-chart";
import { SummaryCards } from "./_components/summary-cards";
import { FiltersProvider } from "./filter-provider";

export default function Dashboard() {
  const { t } = useClientTranslation();

  return (
    <MainLayout>
      <ShellMain
        withoutSeo
        heading={t("dashboard_page_title")}
        hideHeadingOnMobile
      >
        <FiltersProvider>
          <Filters />

          <div className="mb-4 mt-4 space-y-4">
            <SummaryCards />

            <OrderStatusLineChart />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* <PopularJourneysTable /> */}

              {/* <AverageEventDurationChart /> */}
            </div>
          </div>
        </FiltersProvider>
      </ShellMain>
    </MainLayout>
  );
}

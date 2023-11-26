import { env } from "@ttbs/env";
import { useServerTranslation } from "@ttbs/i18n";

import AuthContainer from "@/components/ui/auth-container";
import { get } from "@/lib/common/fetch";
import type { I18nRouteParam } from "@/types";

import { ResetPasswordForm } from "./form";

type Props = {
  params: I18nRouteParam["params"] & { id: string };
};

export default async function Page({ params: { lng, id: requestId } }: Props) {
  const { t } = await useServerTranslation(lng);

  const isRequestExpiredReq = await get(
    `${env.NEXT_PUBLIC_API_BASE_URI}/api/auth/reset-password/check?requestId=${requestId}`
  );

  return (
    <AuthContainer
      showLogo
      title={t("reset_password")}
      description={t("change_your_password")}
      heading={t("reset_password")}
    >
      <ResetPasswordForm isRequestExpired={!isRequestExpiredReq.data} requestId={requestId} />
    </AuthContainer>
  );
}

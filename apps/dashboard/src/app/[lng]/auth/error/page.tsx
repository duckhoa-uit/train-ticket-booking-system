"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import z from "zod";

import { useClientTranslation } from "@ttbs/i18n";
import { Button } from "@ttbs/ui";
import { X } from "@ttbs/ui/components/icons";

import AuthContainer from "@/components/ui/auth-container";
import type { I18nRouteParam } from "@/types";

const querySchema = z.object({
  error: z.string().optional(),
});

export default function Error({ params: { lng } }: I18nRouteParam) {
  const { t } = useClientTranslation(lng);
  const searchParams = useSearchParams();
  const { error } = querySchema.parse(searchParams);
  const isTokenVerificationError = error?.toLowerCase() === "verification";
  const errorMsg = isTokenVerificationError ? t("token_invalid_expired") : t("error_during_login");

  return (
    <AuthContainer title="" description="">
      <div>
        <div className="bg-error mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <X className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-emphasis text-lg font-medium leading-6" id="modal-title">
            {error}
          </h3>
          <div className="mt-2">
            <p className="text-subtle text-sm">{errorMsg}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <Link href="/auth/login" passHref legacyBehavior>
          <Button className="flex w-full justify-center">{t("go_back_login")}</Button>
        </Link>
      </div>
    </AuthContainer>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useClientTranslation } from "@ttbs/i18n";
import { cn } from "@ttbs/lib/cn";
import { ErrorCode, WEBAPP_URL } from "@ttbs/lib/constants";
import { getSafeRedirectUrl } from "@ttbs/lib/get-safe-redirect-url";
import { Alert, Button, EmailField, PasswordField } from "@ttbs/ui";

import AuthContainer from "@/components/ui/auth-container";
import type { I18nRouteParam } from "@/types";

interface LoginValues {
  email: string;
  password: string;
}

export default function Login({ params: { lng } }: I18nRouteParam) {
  const router = useRouter();

  const { t } = useClientTranslation(lng);

  const errorMessages: { [key: string]: string } = {
    // Don't leak information about whether an email is registered or not
    [ErrorCode.UserNotFound]: t("no_account_exists"),
    [ErrorCode.IncorrectEmailPassword]: t("incorrect_email_password"),
    [ErrorCode.InternalServerError]: `${t("something_went_wrong")} ${t("please_try_again_and_contact_us")}`,
    [ErrorCode.ThirdPartyIdentityProviderEnabled]: t("account_created_with_identity_provider"),
  };

  const searchParams = useSearchParams();
  // const router = useRouter();
  const formSchema = z
    .object({
      email: z
        .string()
        .min(1, `${t("error_required_field")}`)
        .email(`${t("enter_valid_email")}`),
      password: z.string().min(1, `${t("error_required_field")}`),
    })
    // Passthrough other fields like totpCode
    .passthrough();
  const methods = useForm<LoginValues>({ resolver: zodResolver(formSchema) });
  const { register, formState } = methods;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  let callbackUrl = searchParams.get("callbackUrl") || "";

  if (/"\//.test(callbackUrl)) callbackUrl = callbackUrl.substring(1);

  // If not absolute URL, make it absolute
  if (!/^https?:\/\//.test(callbackUrl)) {
    callbackUrl = `${WEBAPP_URL}/${callbackUrl}`;
  }

  const safeCallbackUrl = getSafeRedirectUrl(callbackUrl);

  callbackUrl = safeCallbackUrl || "";

  const onSubmit = async (values: LoginValues) => {
    setErrorMessage(null);
    // telemetry.event(telemetryEventTypes.login, collectPageParameters());

    const res = await signIn<"credentials">("credentials", {
      ...values,
      callbackUrl,
      redirect: false,
    });

    if (!res) setErrorMessage(errorMessages[ErrorCode.InternalServerError]);
    // we're logged in! let's do a hard refresh to the desired url
    else if (!res.error) router.push(callbackUrl);
    // fallback if error not found
    else setErrorMessage(errorMessages[res.error] || t("something_went_wrong"));
  };

  return (
    <AuthContainer title={t("login")} description={t("login")} showLogo heading={t("welcome_back")}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate data-testid="login-form">
          <div className="space-y-6">
            <div className={cn("space-y-6")}>
              <EmailField
                id="email"
                label={t("email_address")}
                defaultValue={searchParams?.get("email") as string}
                placeholder="john.doe@example.comm"
                required
                {...register("email")}
              />
              <div className="relative">
                <PasswordField
                  id="password"
                  label={t("password")}
                  autoComplete="off"
                  required
                  className="mb-0"
                  {...register("password")}
                />
                <div className="absolute -top-[2px] ltr:right-0 rtl:left-0">
                  <Link
                    href="/auth/forgot-password"
                    tabIndex={-1}
                    className="text-default text-sm font-medium"
                  >
                    {t("forgot")}
                  </Link>
                </div>
              </div>
            </div>

            {errorMessage && <Alert severity="error" title={errorMessage} />}
            <Button
              type="submit"
              color="primary"
              disabled={formState.isSubmitting}
              className="w-full justify-center dark:bg-white dark:text-black"
            >
              {t("sign_in")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </AuthContainer>
  );
}

// Login.PageWrapper = PageWrapper;

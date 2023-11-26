"use client";

// eslint-disable-next-line no-restricted-imports
import { debounce } from "lodash";
import Link from "next/link";
import type { CSSProperties, SyntheticEvent } from "react";
import React from "react";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";
import { Button, EmailField } from "@ttbs/ui";

import AuthContainer from "@/components/ui/auth-container";
import { post } from "@/lib/common/fetch";

export default function ForgotPassword() {
  const { t } = useClientTranslation();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<{ message: string } | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as typeof e.target & { value: string };
    setEmail(target.value);
  };

  const submitForgotPasswordRequest = async ({ email }: { email: string }) => {
    try {
      const res = await post(`${env.NEXT_PUBLIC_API_BASE_URI}/api/auth/forgot-password`, { email });
      console.log("🚀 ~ file: page.tsx:30 ~ submitForgotPasswordRequest ~ res:", res);

      if (res.error) {
        setError({ message: res.error.message });
      } else if (res.status === "success") {
        setSuccess(true);
      }

      return res;
    } catch (reason) {
      setError({ message: t("unexpected_error_try_again") });
    } finally {
      setLoading(false);
    }
  };

  const debouncedHandleSubmitPasswordRequest = debounce(submitForgotPasswordRequest, 250);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    await debouncedHandleSubmitPasswordRequest({ email });
  };

  const Success = () => {
    return (
      <div className="space-y-6 text-sm leading-normal ">
        <p className="">{t("password_reset_email", { email })}</p>
        <p className="">{t("password_reset_leading")}</p>
        {error && <p className="text-center text-red-600">{error.message}</p>}
        <Button color="secondary" className="w-full justify-center" href="/auth/login">
          {t("back_to_signin")}
        </Button>
      </div>
    );
  };

  return (
    <AuthContainer
      showLogo
      title={!success ? t("forgot_password") : t("reset_link_sent")}
      heading={!success ? t("forgot_password") : t("reset_link_sent")}
      description={t("request_password_reset")}
      footerText={
        !success && (
          <>
            <Link href="/auth/login" className="text-emphasis font-medium">
              {t("back_to_signin")}
            </Link>
          </>
        )
      }
    >
      {success && <Success />}
      {!success && (
        <>
          <div className="space-y-6">{error && <p className="text-red-600">{error.message}</p>}</div>
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            action="#"
            style={
              {
                "--ttbs-brand": "#111827",
                "--ttbs-brand-emphasis": "#101010",
                "--ttbs-brand-text": "white",
                "--ttbs-brand-subtle": "#9CA3AF",
              } as CSSProperties
            }
          >
            <EmailField
              onChange={handleChange}
              id="email"
              name="email"
              label={t("email_address")}
              placeholder="john.doe@example.com"
              required
            />
            <div className="space-y-2">
              <Button
                className="w-full justify-center dark:bg-white dark:text-black"
                type="submit"
                color="primary"
                disabled={loading}
                aria-label={t("request_password_reset")}
                loading={loading}
              >
                {t("request_password_reset")}
              </Button>
            </div>
          </form>
        </>
      )}
    </AuthContainer>
  );
}

"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { useClientTranslation } from "@ttbs/i18n";
import { Button, PasswordField, Form } from "@ttbs/ui";

import { post } from "@/lib/common/fetch";

export const ResetPasswordForm = ({
  isRequestExpired,
  requestId,
}: {
  isRequestExpired: boolean;
  requestId: string;
}) => {
  const { t } = useClientTranslation();

  const formMethods = useForm<{ new_password: string }>();
  const success = formMethods.formState.isSubmitSuccessful;
  const loading = formMethods.formState.isSubmitting;
  const passwordValue = formMethods.watch("new_password");
  const isEmpty = passwordValue?.length === 0;

  const submitChangePassword = async ({ password, requestId }: { password: string; requestId: string }) => {
    const res = await post("http://localhost:8081/api/auth/reset-password", { requestId, password });

    if (res.error)
      return formMethods.setError("new_password", { type: "server", message: res.error.message });
  };

  const Success = () => {
    return (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="font-cal text-emphasis mt-6 text-center text-3xl font-extrabold">
              {t("password_updated")}
            </h2>
          </div>
          <Button href="/auth/login" className="w-full justify-center">
            {t("login")}
          </Button>
        </div>
      </>
    );
  };

  const Expired = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-cal text-emphasis mt-6 text-center text-3xl font-extrabold">{t("whoops")}</h2>
          <h2 className="text-emphasis text-center text-3xl font-extrabold">{t("request_is_expired")}</h2>
        </div>
        <p>{t("request_is_expired_instructions")}</p>
        <Link href="/auth/forgot-password" passHref legacyBehavior>
          <button
            type="button"
            className="flex w-full justify-center px-4 py-2 text-sm font-medium text-blue-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            {t("try_again")}
          </button>
        </Link>
      </div>
    );
  };
  return (
    <>
      {isRequestExpired && <Expired />}
      {!isRequestExpired && !success && (
        <Form
          className="space-y-6"
          form={formMethods}
          handleSubmit={async (values) => {
            await submitChangePassword({
              password: values.new_password,
              requestId,
            });
          }}
        >
          {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} hidden /> */}
          <div className="mt-1">
            <PasswordField
              {...formMethods.register("new_password", {
                minLength: {
                  message: t("password_hint_min"),
                  value: 7, // We don't have user here so we can't check if they are admin or not
                },
                pattern: {
                  message: "Should contain a number, uppercase and lowercase letters",
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).*$/gm,
                },
              })}
              label={t("new_password")}
            />
          </div>

          <div>
            <Button
              loading={loading}
              color="primary"
              type="submit"
              disabled={loading || isEmpty}
              className="w-full justify-center"
            >
              {t("reset_password")}
            </Button>
          </div>
        </Form>
      )}
      {!isRequestExpired && success && <Success />}
    </>
  );
};

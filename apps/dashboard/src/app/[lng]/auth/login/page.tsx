'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@ttbs/ui';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { WEBAPP_URL } from '@ttbs/lib/constants';
import { getSafeRedirectUrl } from '@ttbs/lib/get-safe-redirect-url';
import { useClientTranslation } from '@ttbs/i18n';
import { collectPageParameters, telemetryEventTypes, useTelemetry } from '@ttbs/lib/telemetry';
import { Alert, Button, EmailField, PasswordField } from '@ttbs/ui';
import { ArrowLeft, Lock } from '@ttbs/ui/components/icons';

// import PageWrapper from '@/components/PageWrapper';
import AuthContainer from '@/components/ui/auth-container';
import { I18nRouteParam } from '@/types';

interface LoginValues {
  email: string;
  password: string;
  totpCode: string;
}

// TODO: chwa kip move =)))
enum ErrorCode {
  IncorrectEmailPassword = 'incorrect-email-password',
  UserNotFound = 'user-not-found',
  IncorrectPassword = 'incorrect-password',
  UserMissingPassword = 'missing-password',
  IncorrectEmailVerificationCode = 'incorrect_email_verification_code',
  InternalServerError = 'internal-server-error',
  NewPasswordMatchesOld = 'new-password-matches-old',
  ThirdPartyIdentityProviderEnabled = 'third-party-identity-provider-enabled',
  RateLimitExceeded = 'rate-limit-exceeded',
  SocialIdentityProviderRequired = 'social-identity-provider-required',
}

export default function Login({
  totpEmail,
  params: { lng },
}: { totpEmail?: string } & I18nRouteParam) {
  const { t } = useClientTranslation(lng);

  const searchParams = useSearchParams();
  const router = useRouter();
  const formSchema = z
    .object({
      email: z
        .string()
        .min(1, `${t('error_required_field')}`)
        .email(`${t('enter_valid_email')}`),
      password: !!totpEmail ? z.literal('') : z.string().min(1, `${t('error_required_field')}`),
    })
    // Passthrough other fields like totpCode
    .passthrough();
  const methods = useForm<LoginValues>({ resolver: zodResolver(formSchema) });
  const { register, formState } = methods;
  const [twoFactorRequired, setTwoFactorRequired] = useState(!!totpEmail || false);
  const [twoFactorLostAccess, setTwoFactorLostAccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const errorMessages: { [key: string]: string } = {
    // Don't leak information about whether an email is registered or not
    [ErrorCode.IncorrectEmailPassword]: t('incorrect_email_password'),
    [ErrorCode.InternalServerError]: `${t('something_went_wrong')} ${t(
      'please_try_again_and_contact_us'
    )}`,
    [ErrorCode.ThirdPartyIdentityProviderEnabled]: t('account_created_with_identity_provider'),
  };

  const telemetry = useTelemetry();

  let callbackUrl = searchParams.get('callbackUrl') || '';

  if (/"\//.test(callbackUrl)) callbackUrl = callbackUrl.substring(1);

  // If not absolute URL, make it absolute
  if (!/^https?:\/\//.test(callbackUrl)) {
    callbackUrl = `${WEBAPP_URL}/${callbackUrl}`;
  }

  const safeCallbackUrl = getSafeRedirectUrl(callbackUrl);

  callbackUrl = safeCallbackUrl || '';

  const LoginFooter = (
    <a href={`${WEBAPP_URL}/signup`} className="text-brand-500 font-medium">
      {t('dont_have_an_account')}
    </a>
  );

  const TwoFactorFooter = (
    <>
      <Button
        onClick={() => {
          setTwoFactorRequired(false);
          methods.setValue('totpCode', '');

          setErrorMessage(null);
        }}
        StartIcon={ArrowLeft}
        color="minimal"
      >
        {t('go_back')}
      </Button>
      {!twoFactorLostAccess ? (
        <Button
          onClick={() => {
            setTwoFactorLostAccess(true);
            setErrorMessage(null);
            methods.setValue('totpCode', '');
          }}
          StartIcon={Lock}
          color="minimal"
        >
          {t('lost_access')}
        </Button>
      ) : null}
    </>
  );

  const ExternalTotpFooter = (
    <Button
      onClick={() => {
        window.location.replace('/');
      }}
      color="minimal"
    >
      {t('cancel')}
    </Button>
  );

  const onSubmit = async (values: LoginValues) => {
    console.log('🚀 ~ file: page.tsx:122 ~ onSubmit ~ values:', values);
    setErrorMessage(null);
    telemetry.event(telemetryEventTypes.login, collectPageParameters());
    return;

    // const res = await signIn<'credentials'>('credentials', {
    //   ...values,
    //   callbackUrl,
    //   redirect: false,
    // });
    // if (!res) setErrorMessage(errorMessages[ErrorCode.InternalServerError]);
    // // we're logged in! let's do a hard refresh to the desired url
    // else if (!res.error) router.push(callbackUrl);
    // // fallback if error not found
    // else setErrorMessage(errorMessages[res.error] || t('something_went_wrong'));
  };

  return (
    <div>
      <AuthContainer
        title={t('login')}
        description={t('login')}
        showLogo
        heading={t('welcome_back')}
        footerText={
          twoFactorRequired
            ? !totpEmail
              ? TwoFactorFooter
              : ExternalTotpFooter
            : process.env.NEXT_PUBLIC_DISABLE_SIGNUP !== 'true'
            ? LoginFooter
            : null
        }
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate data-testid="login-form">
            <div className="space-y-6">
              <div className={cn('space-y-6')}>
                <EmailField
                  id="email"
                  label={t('email_address')}
                  defaultValue={totpEmail || (searchParams?.get('email') as string)}
                  placeholder="john.doe@example.comm"
                  required
                  {...register('email')}
                />
                <div className="relative">
                  <PasswordField
                    id="password"
                    autoComplete="off"
                    required={!totpEmail}
                    className="mb-0"
                    {...register('password')}
                  />
                  <div className="absolute -top-[2px] ltr:right-0 rtl:left-0">
                    <Link
                      href="/auth/forgot-password"
                      tabIndex={-1}
                      className="text-default text-sm font-medium"
                    >
                      Forgot
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
                Sign In
              </Button>
            </div>
          </form>
        </FormProvider>
      </AuthContainer>
    </div>
  );
}

// Login.PageWrapper = PageWrapper;

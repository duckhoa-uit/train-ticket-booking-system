/* eslint-disable no-empty-pattern */
import crypto from "crypto";

import { WEBAPP_URL } from "@ttbs/lib/constants";
import dayjs from "@ttbs/lib/dayjs";
import { hashPassword } from "@ttbs/lib/password";
import { IdentityProvider, Prisma, User } from "@ttbs/prisma";
import prisma from "@ttbs/prisma";

import { LoginCallbackInput } from "@/schemas/auth.schema";
import { UserCreateInput } from "@/schemas/user.schema";
import AppError from "@/utils/app-error";
import { forgotPasswordEmail, sendEmail } from "@/utils/email";
import { mapIdentityProvider } from "@/utils/identify-provider";

import { linkAccount } from "./auth.service";

const generateVerificationToken = async function (userId: string, email: string) {
  const user = await findUniqueUser({ id: userId });
  if (!user) throw new AppError(404, "Can't find user");

  // const _email: string | undefined | null = email;
  // TODO: update this after init schema

  // if (!email) {
  //   const emailRecord = (user.emails || []).find((e) => !e.verified)
  //   _email = (emailRecord || {}).address

  //   if (!_email) {
  //     throw new AppError(400, 'That user has no unverified email addresses.')
  //   }
  // }

  // make sure we have a valid email
  // TODO: update this after init schema
  // if (!_email || !pluckAddresses(user.emails).includes(email)) {
  //   throw new AppError(404, 'No such email for user.')
  // }

  // TODO: update this after init schema
  const token = "Random.secret()";

  await prisma.user.update({
    where: { id: user.id },
    data: {
      // TODO: update this after init schema
      // services: {
      //   ...user.services,
      //   email: {
      //     verificationTokens: [...(user.services.email?.verificationTokens || []), tokenRecord],
      //   },
      // },
    },
  });

  return { email, user, token };
};

export const PASSWORD_RESET_EXPIRY_HOURS = 6;

const generatePasswordResetLink = async function (email: string) {
  const expiry = dayjs().add(PASSWORD_RESET_EXPIRY_HOURS, "hours").toDate();
  const createdResetPasswordRequest = await prisma.resetPasswordRequest.create({
    data: {
      email,
      expires: expiry,
    },
  });

  return `${WEBAPP_URL}/auth/forgot-password/${createdResetPasswordRequest.id}`;
};

export const sendVerificationEmail = async function (userId: string, email: string) {
  const {} = await generateVerificationToken(userId, email);

  // TODO: update this after init schema
  // sendEmail(
  //   verifyEmail({
  //     name: user.profile?.fullName ?? 'User',
  //     email: email,
  //     token: token,
  //   })
  // )
};

export const sendForgotPasswordEmail = async function (user: User) {
  const link = await generatePasswordResetLink(user.email);

  await sendEmail(
    forgotPasswordEmail({
      name: user.name ?? "User",
      email: user.email,
      url: link,
    })
  );
};
export async function expireResetPasswordRequest(rawRequestId: string) {
  await prisma.resetPasswordRequest.update({
    where: {
      id: rawRequestId,
    },
    data: {
      // We set the expiry to now to invalidate the request
      expires: new Date(),
    },
  });
}

export const createUser = async (input: UserCreateInput) => {
  const hashedPassword = await hashPassword(input.password);

  const verifyCode = crypto.randomBytes(32).toString("hex");
  const verificationCode = crypto.createHash("sha256").update(verifyCode).digest("hex");

  const _newUser = {
    email: input.email.toLowerCase(),
    name: input.name,
    username: input.username,
    password: hashedPassword,
    verificationCode,
  };

  return (await prisma.user.create({
    data: _newUser,
  })) as User;
};

export async function updateUser(id: string, payload: Prisma.UserUpdateInput) {
  return await prisma.user.update({
    where: { id },
    data: payload,
  });
}

export async function resetPassword(rawRequestId: string, rawPassword: string) {
  const maybeRequest = await prisma.resetPasswordRequest.findFirstOrThrow({
    where: {
      id: rawRequestId,
      expires: {
        gt: new Date(),
      },
    },
    select: {
      email: true,
    },
  });

  const hashedPassword = await hashPassword(rawPassword);
  // this can fail if a password request has been made for an email that has since changed or-
  // never existed within Cal. In this case we do not want to disclose the email's existence.
  // instead, we just return 404
  return await prisma.user.update({
    where: {
      email: maybeRequest.email,
    },
    data: {
      password: hashedPassword,
    },
  });
}

export async function checkResetPasswordRequest(requestId: string) {
  let resetPasswordRequest = await prisma.resetPasswordRequest.findFirst({
    where: {
      id: requestId,
      expires: {
        gt: new Date(),
      },
    },
    select: {
      email: true,
    },
  });
  try {
    resetPasswordRequest &&
      (await prisma.user.findUniqueOrThrow({ where: { email: resetPasswordRequest.email } }));
  } catch (e) {
    resetPasswordRequest = null;
  }
  return resetPasswordRequest;
}

export const findUniqueUser = async (where: Prisma.UserWhereInput, select?: Prisma.UserSelect) => {
  return (await prisma.user.findFirst({
    where,
    select,
  })) as User;
};

export const userFindFirst = async ({
  where,
  select,
  include,
}: {
  where: Prisma.UserWhereInput;
  select?: Prisma.UserSelect;
  include?: Prisma.UserInclude;
}) => {
  type UserWithRelations = Prisma.UserGetPayload<{
    include: {
      accounts: true;
    };
  }>;

  return (await prisma.user.findFirst({
    where,
    select,
    include,
  })) as UserWithRelations;
};

export const getMe = async (id: string) => {
  return (await prisma.user.findFirst({
    where: { id },
  })) as User;
};

export const updateUserLoginCallback = async ({ user, profile, account }: LoginCallbackInput) => {
  if (account?.provider === "email") {
    return true;
  }

  // In this case we've already verified the credentials in the authorize
  // callback so we can sign the user in.
  // Only if provider is not saml-idp
  if (account?.type === "credentials") {
    return true;
  }

  if (account?.type !== "oauth") {
    return false;
  }

  if (!user.email) {
    return false;
  }

  if (!user.name) {
    return false;
  }

  if (account?.provider) {
    const idP: IdentityProvider = mapIdentityProvider(account.provider);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-error TODO validate email_verified key on profile
    user.email_verified = user.email_verified || !!user.emailVerified || profile.email_verified;

    if (!user.email_verified) {
      return "/auth/error?error=unverified-email";
    }

    let existingUser = await userFindFirst({
      include: {
        accounts: {
          where: {
            provider: account.provider,
          },
        },
      },
      where: {
        identityProvider: idP,
        identityProviderId: account.providerAccountId,
      },
    });

    /* --- START FIX LEGACY ISSUE WHERE 'identityProviderId' was accidentally set to userId --- */
    if (!existingUser) {
      existingUser = await userFindFirst({
        include: {
          accounts: {
            where: {
              provider: account.provider,
            },
          },
        },
        where: {
          identityProvider: idP,
          identityProviderId: String(user.id),
        },
      });
      if (existingUser) {
        await updateUser(existingUser?.id, {
          identityProviderId: account.providerAccountId,
        });
      }
    }
    /* --- END FIXES LEGACY ISSUE WHERE 'identityProviderId' was accidentally set to userId --- */

    if (existingUser) {
      // In this case there's an existing user and their email address
      // hasn't changed since they last logged in.
      if (existingUser.email === user.email) {
        try {
          // If old user without Account entry we link their google account
          if (existingUser.accounts.length === 0) {
            const linkAccountWithUserData = { ...account, userId: existingUser.id };
            await linkAccount(linkAccountWithUserData);
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error while linking account of already existing user");
          }
        }

        return true;
      }

      // If the email address doesn't match, check if an account already exists
      // with the new email address. If it does, for now we return an error. If
      // not, update the email of their account and log them in.
      const userWithNewEmail = await findUniqueUser({ email: user.email });

      if (!userWithNewEmail) {
        await updateUser(existingUser.id, { email: user.email });

        return true;
      } else {
        return "/auth/error?error=new-email-conflict";
      }
    }

    // If there's no existing user for this identity provider and id, create
    // a new account. If an account already exists with the incoming email
    // address return an error for now.
    const existingUserWithEmail = await findUniqueUser({
      email: {
        equals: user.email,
        mode: "insensitive",
      },
    });

    if (existingUserWithEmail) {
      // if self-hosted then we can allow auto-merge of identity providers if email is verified
      if (
        existingUserWithEmail.emailVerified &&
        existingUserWithEmail.identityProvider !== IdentityProvider.INTERNAL
      ) {
        return true;
      }

      // User signs up with email/password and then tries to login with Google/SAML using the same email
      if (
        existingUserWithEmail.identityProvider === IdentityProvider.INTERNAL &&
        idP === IdentityProvider.GOOGLE
        // (idP === IdentityProvider.GOOGLE || idP === IdentityProvider.SAML)
      ) {
        await updateUser(existingUserWithEmail.email, {
          password: null,
          email: user.email,
          identityProvider: idP,
          identityProviderId: account.providerAccountId,
        });

        return true;
      } else if (existingUserWithEmail.identityProvider === IdentityProvider.INTERNAL) {
        return "/auth/error?error=use-password-login";
      }

      return "/auth/error?error=use-identity-login";
    }

    return true;
  }

  return false;
};

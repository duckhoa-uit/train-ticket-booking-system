import { hashPassword } from "@ttbs/lib/password";
import { Prisma, User } from "@ttbs/prisma";
// import { forgotPasswordEmail, pluckAddresses, sendEmail, verifyEmail } from '@/utils/email'
import prisma from "@ttbs/prisma";

import { UserCreateInput } from "@/schemas/user.schema";
import AppError from "@/utils/app-error";

const generateVerificationToken = async function (
  userId: string,
  email: string,
  extraTokenData?: Record<any, any>
) {
  const user = await findUniqueUser({ id: userId });
  if (!user) throw new AppError(404, "Can't find user");

  const _email: string | undefined | null = email;
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
  const tokenRecord = {
    token,
    // TODO(Meteor): This should probably be renamed to "email" to match reset token record.
    address: email,
    when: new Date(),
  };

  if (extraTokenData) {
    Object.assign(tokenRecord, extraTokenData);
  }

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

const generateResetToken = async function (user: User, email: string, extraTokenData?: Record<any, any>) {
  const _email: string | undefined | null = email;
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

  const token = "Random.secret()";
  const tokenRecord = {
    token,
    email: email,
    when: new Date(),
  };

  if (extraTokenData) {
    Object.assign(tokenRecord, extraTokenData);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      // TODO: update this after init schema
      // services: {
      //   ...user.services,
      //   password: {
      //     ...user.services.password,
      //     reset: tokenRecord,
      //   },
      // },
    },
  });

  return { email, user, token };
};

export const sendVerificationEmail = async function (
  userId: string,
  email: string,
  extraTokenData?: Record<string, any>
) {
  const { token, user } = await generateVerificationToken(userId, email, extraTokenData);

  // TODO: update this after init schema
  // sendEmail(
  //   verifyEmail({
  //     name: user.profile?.fullName ?? 'User',
  //     email: email,
  //     token: token,
  //   })
  // )
};

export const sendForgotPasswordEmail = async function (
  user: User,
  email: string,
  extraTokenData?: Record<string, any>
) {
  const { token } = await generateResetToken(user, email, extraTokenData);

  // TODO: update this after init schema
  // sendEmail(
  //   forgotPasswordEmail({
  //     name: user.profile?.fullName ?? 'User',
  //     email: email,
  //     token: token,
  //   })
  // )
};

export const createUser = async (input: UserCreateInput) => {
  const hashedPassword = await hashPassword(input.password);

  // TODO: update this function
  const newUser = {
    profile: {
      fullName: input.name,
      appSettings: {
        showOnboarding: true,
        showProfileAlert: true,
      },
    },
    ...(input.role ? { roles: [input.role] } : {}),
    emails: [
      {
        address: input.email.toLowerCase(),
        verified: true, //FIXME: change to false after implementing verification email
      },
    ],
    services: {
      password: {
        bcrypt: hashedPassword,
      },
      email: {
        verificationTokens: [],
      },
      resume: {
        loginTokens: [],
      },
    },
    username: input.username,
  };

  return (await prisma.user.create({
    data: {
      email: input.email,
    },
  })) as User;
};

export async function updateUser(id: string, payload: Prisma.UserUpdateInput) {
  return await prisma.user.update({
    where: { id },
    data: payload,
  });
}
export async function resetPassword(_token: string, password: string) {
  if (_token == null || _token == "") {
    throw new Error(`Token ${_token} isn't valid.`);
  }

  // TODO: update after define schema

  // If no error, set new password.
  const newPassword = await hashPassword(password);
  return prisma.user.update({
    where: { id: "user._id" },
    data: {
      // TODO: update this after init schema
      // services: {
      //   ...user.services,
      //   password: {
      //     bcrypt: newPassword,
      //   },
      // },
    },
  });
}

export const findUniqueUser = async (where: Prisma.UserWhereInput, select?: Prisma.UserSelect) => {
  return (await prisma.user.findFirst({
    where,
    select,
  })) as User;
};

export const getMe = async (id: string) => {
  return (await prisma.user.findFirst({
    where: { id },
  })) as User;
};

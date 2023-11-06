import { hashPassword } from "@ttbs/lib/password";

import prisma from ".";
import type { UserRole } from "./enums";

export async function createUser({
  user,
}: {
  user: {
    email: string;
    password: string;
    username: string;
    name: string;
    completedOnboarding?: boolean;
    timeZone?: string;
    role?: UserRole;
    theme?: "dark" | "light";
  };
}) {
  const userData = {
    ...user,
    password: await hashPassword(user.password),
    emailVerified: new Date(),
    completedOnboarding: user.completedOnboarding ?? true,
    locale: "en",
  };

  const theUser = await prisma.user.upsert({
    where: { email_username: { email: user.email, username: user.username } },
    update: userData,
    create: userData,
  });

  console.log(`👤 Upserted '${user.username}' with email "${user.email}" & password "${user.password}".`);

  return theUser;
}

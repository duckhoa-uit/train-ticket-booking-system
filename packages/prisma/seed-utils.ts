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
    role?: UserRole;
  };
}) {
  const userData = {
    ...user,
    password: await hashPassword(user.password),
    emailVerified: new Date(),
  };

  const theUser = await prisma.user.upsert({
    where: { email: user.email },
    update: userData,
    create: userData,
  });

  console.log(`👤 Upserted '${user.username}' with email "${user.email}" & password "${user.password}".`);

  return theUser;
}

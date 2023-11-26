"use client";

import { signOut } from "next-auth/react";

import { Button } from "@ttbs/ui";

export const SignOutButton = () => {
  return <Button onClick={() => signOut()}>Sign out</Button>;
};

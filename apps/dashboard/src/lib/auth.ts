import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { AuthOptions, Session } from "next-auth";
import NextAuth, {
  getServerSession as originalGetServerSession,
} from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers/index";
import { cookies, headers } from "next/headers";

import { env } from "@ttbs/env";
import { ErrorCode, WEBAPP_URL } from "@ttbs/lib/constants";
import type { UserRole } from "@ttbs/prisma/enums";

import { post } from "@/lib/common/fetch";

const providers: Provider[] = [
  CredentialsProvider({
    id: "credentials",
    name: "Train Ticket Booking System",
    type: "credentials",
    credentials: {
      email: {
        label: "Email Address",
        type: "email",
        placeholder: "john.doe@example.com",
      },
      password: {
        label: "Password",
        type: "password",
        placeholder: "Your super secure password",
      },
    },
    async authorize(credentials) {
      if (!credentials) {
        console.error(`For some reason credentials are missing`);
        throw new Error(ErrorCode.InternalServerError);
      }
      const response = await post(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/auth/login`,
        credentials,
      );

      if (response.error) {
        if (response.error.code === 404)
          throw new Error(ErrorCode.UserNotFound);
        if (response.error.code === 401)
          throw new Error(ErrorCode.IncorrectEmailPassword);
      }

      return { ...response.data.user, accessToken: response.data.access_token };
    },
  }),
];

export const AUTH_OPTIONS: AuthOptions = {
  providers,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          locale: session?.locale ?? token.locale ?? "en",
          name: session?.name ?? token.name,
          username: session?.username ?? token.username,
          email: session?.email ?? token.email,
          accessToken: session?.accessToken ?? token.accessToken,
        };
      }

      if (!account) {
        return token;
      }

      if (account.type === "credentials") {
        // any other credentials, add user info
        return {
          ...token,
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
          locale: user?.locale,
          accessToken: user.accessToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      const sessionWithUser: Session = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          name: token.name,
          username: token.username as string,
          role: token.role as UserRole,
          locale: token.locale,
        },
        accessToken: token.accessToken,
      };
      return sessionWithUser;
    },
    async signIn(params) {
      const { user, account, profile } = params;
      const response = await post(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/auth/login/callback`,
        {
          user,
          account,
          profile,
        },
      );

      if (response.error) {
        if (response.error.code === 404)
          throw new Error(ErrorCode.UserNotFound);
        if (response.error.code === 401)
          throw new Error(ErrorCode.IncorrectEmailPassword);
      }

      return response.data;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same domain
      else if (new URL(url).hostname === new URL(WEBAPP_URL).hostname)
        return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify",
  },
};

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return originalGetServerSession(...args, AUTH_OPTIONS);
}

export const getServerSession = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value]),
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - The type used in next-auth for the req object doesn't match, but it still works
  const session = await originalGetServerSession(req, res, AUTH_OPTIONS);
  return session;
};

export const handler = NextAuth(AUTH_OPTIONS);

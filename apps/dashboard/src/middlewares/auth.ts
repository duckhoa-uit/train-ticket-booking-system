import { getToken } from "next-auth/jwt";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

import { getUserLanguage } from "@ttbs/i18n";

import type { CustomMiddleware } from "./chain";

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const path = req.nextUrl.pathname;
    const lng = getUserLanguage(req);

    const token = await getToken({
      req,
    });
    // console.log("🚀 ~ file: auth.ts:16 ~ return ~ token:", token);

    // const s = await getServerSession(req, response, AUTH_OPTIONS);
    // console.log("🚀 ~ file: auth.ts:24 ~ return ~ s:", s);

    if (!token && path === `/${lng}`) {
      response = NextResponse.redirect(new URL(`/${lng}/auth/login`, req.url));
    } else if (token && (path === `/${lng}/auth/login` || path === `/${lng}/auth/register`)) {
      response = NextResponse.redirect(new URL(`/${lng}/dashboard`, req.url));
    }

    // Call the next middleware and pass the req and response
    return middleware(req, event, response);
  };
}

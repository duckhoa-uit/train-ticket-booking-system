import acceptLanguage from "accept-language";
import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";

import { fallbackLng, languages } from "./settings";

acceptLanguage.languages(languages);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = "i18next";

function getUserLanguage(req: NextRequest) {
  if (req.cookies.has(cookieName)) {
    const cookie = req.cookies.get(cookieName)!.value;
    if (languages.includes(cookie)) {
      return cookie;
    }
  }
  return acceptLanguage.get(req.headers.get("Accept-Language")) || fallbackLng;
}

// function getPathLanguage(pathname: string) {
//   const [, pathLanguage] = pathname.match(/\/(\w+)\/?/) ?? [];
//   if (pathLanguage && languages.includes(pathLanguage)) {
//     return pathLanguage;
//   }
//   return null;
// }

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.indexOf("icon") > -1 || req.nextUrl.pathname.indexOf("chrome") > -1)
    return NextResponse.next();

  const lng = getUserLanguage(req);
  // const pathLanguage = getPathLanguage(req.nextUrl.pathname);

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer")!);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}

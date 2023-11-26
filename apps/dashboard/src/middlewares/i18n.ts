import { type NextFetchEvent, type NextRequest } from "next/server";

import { middleware as i18nMiddleware } from "@ttbs/i18n";

import type { CustomMiddleware } from "./chain";

export function withI18nMiddleware(middleware: CustomMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const response = i18nMiddleware(req);

    // Call the next middleware and pass the req and response
    return middleware(req, event, response);
  };
}

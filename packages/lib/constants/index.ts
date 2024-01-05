export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Train Ticket Booking System";

const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "";
const RAILWAY_STATIC_URL = process.env.RAILWAY_STATIC_URL ? `https://${process.env.RAILWAY_STATIC_URL}` : "";
const HEROKU_URL = process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : "";
const RENDER_URL = process.env.RENDER_EXTERNAL_URL ? `https://${process.env.RENDER_EXTERNAL_URL}` : "";

export const WEBAPP_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL ||
  VERCEL_URL ||
  RAILWAY_STATIC_URL ||
  HEROKU_URL ||
  RENDER_URL ||
  "http://localhost:3000";

export const CONSOLE_URL =
  // new URL(WEBAPP_URL).hostname.endsWith('.cal.dev') ||
  // new URL(WEBAPP_URL).hostname.endsWith('.cal.qa') ||
  // new URL(WEBAPP_URL).hostname.endsWith('.cal-staging.com') ||
  process.env.NODE_ENV !== "production" ? `https://console.cal.dev` : `https://console.cal.com`;

export const AVATAR_FALLBACK = "/avatar.svg";

export { provinces } from "./provinces";
export type { Province } from "./provinces";

export { CONVERT_PARAMS_TO_VN } from "./provinces";
export { ErrorCode } from "./error-code";

export { INITIAL_STATIONS } from "./stations";

export {
  timeRangeRegex,
  identificationRegex,
  vietnamesePhoneNumberRegex,
  transactionMessageRegex,
} from "./regex";

export { booleanParamSchema } from "./zod";

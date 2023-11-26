import config from "config";
import fs from "fs";
import handlebars from "handlebars";
import { Resend } from "resend";
import { CreateEmailOptions } from "resend/build/src/emails/interfaces";

import { WEBAPP_URL } from "@ttbs/lib/constants";

const EMAIL_TEMPLATE_BASE = config.get<string>("email.templatePath");
const EMAIL_FROM_SUPPORT = config.get<string>("email.fromSupport");

/**
 * load template file & inject data => return content with injected data.
 * */
const template = (fileName: string, data: Record<string, unknown>) => {
  const content = fs.readFileSync(EMAIL_TEMPLATE_BASE + fileName).toString();
  const inject = handlebars.compile(content);
  return inject(data);
};

// --------- Email Templates --------- //
export function verifyEmail({
  name,
  email,
  token,
}: {
  name: string;
  email: string;
  token: string;
}): CreateEmailOptions {
  const action_url = `${WEBAPP_URL}?token=${token}`; // To do change RESET_PASSWORD_URL to Verify URL
  return {
    from: EMAIL_FROM_SUPPORT,
    to: [email],
    subject: `Verify your email address.`,
    // text: template('welcome.txt', { name, email }),
    html: template("verify-email.html", { name, action_url }),
  };
}

export function forgotPasswordEmail({
  name,
  email,
  url,
}: {
  name: string;
  email: string;
  url: string;
}): CreateEmailOptions {
  return {
    from: EMAIL_FROM_SUPPORT,
    to: [email],
    subject: `Reset your password`,
    //text: template('forgot-password.txt', { name, email, action_url }),
    html: template("forgot-password.html", { name, email, action_url: url }),
  };
}

// resetPswEmail, forgotPswEmail, etc.
const resend = new Resend("re_123456789");

export async function sendEmail(email: CreateEmailOptions) {
  try {
    const data = await resend.emails.send(email);
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

// Utility for plucking addresses from emails
export const pluckAddresses = (emails: { address: string | null }[]) => emails.map((email) => email.address);

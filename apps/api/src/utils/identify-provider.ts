import { IdentityProvider } from "@ttbs/prisma";

export const mapIdentityProvider = (providerName: string) => {
  switch (providerName) {
    case "saml-idp":
    case "saml":
      return IdentityProvider.INTERNAL;
    default:
      return IdentityProvider.GOOGLE;
  }
};

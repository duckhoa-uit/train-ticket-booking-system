// import type { Metadata } from "next";
// import { env } from "@ttbs/env";
// import { DEFAULT_LOCALE, LOCALES, loadDictionary } from "@ttbs/i18n";
// import { nodes } from "./nodes";

// export function generateMetadata({
//   params: { lang = DEFAULT_LOCALE, name },
// }: {
//   params: { lang: string; name: string };
// }): Metadata {
//   const dict = loadDictionary(lang);
//   const title = name ? decodeURIComponent(name) : "Sanctuary";

//   const node = nodes.find((node) => {
//     const name =
//       (dict.generated as any)[node.type]?.[
//         "termId" in node ? node.termId : node.id
//       ]?.name ?? "";
//     return (name || node.type) === title;
//   });
//   const type = node?.type;

//   let description = dict.meta.description;
//   if (node) {
//     const name =
//       (dict.generated as any)[node.type]?.[
//         "termId" in node ? node.termId : node.id
//       ]?.name ?? "";

//     description = name;
//     if (type) {
//       description += ` (${dict.nodes[type]})`;
//     }
//     if ("description" in node) {
//       const nodeDescription =
//         (dict.generated as any)[node.type]?.[
//           "termId" in node ? node.termId : node.id
//         ]?.description ?? "";

//       description += `. ${nodeDescription?.replace(/<\/?[^>]+(>|$)/g, "")}`;
//     }
//   }

//   let canonical = env.NEXT_PUBLIC_API_BASE_URI + (lang === DEFAULT_LOCALE ? "" : `/${lang}`);
//   if (name) {
//     canonical += `/nodes/${name}`;
//   }
//   const alternativeLanguages = LOCALES.reduce((acc, locale) => {
//     acc[locale] = env.NEXT_PUBLIC_API_BASE_URI + `/${locale}`;
//     if (name) {
//       acc[locale] += `/nodes/${name}`;
//     }
//     return acc;
//   }, {} as Record<string, string>);

//   return {
//     metadataBase: new URL(canonical),
//     title: `${title} | ${dict.meta.subtitle} | duckhoa.dev`,
//     description: description,
//     creator: "Vo Hoang Duc KHoa",
//     alternates: {
//       canonical: canonical,
//       languages: alternativeLanguages,
//     },
//     twitter: {
//       card: "summary_large_image",
//     },
//     openGraph: {
//       title: `Train Ticket Booking System | ${dict.meta.subtitle} | duckhoa.dev`,
//       description: description,
//       type: name ? "article" : "website",
//       url: "https://duckhoa.dev",
//     },
//   };
// }

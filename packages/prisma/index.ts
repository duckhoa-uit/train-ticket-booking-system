/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient as PrismaClientWithoutExtension } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaWithoutClientExtensions = new PrismaClientWithoutExtension(
  !!process.env.NEXT_PUBLIC_DEBUG ? { log: ["query", "error", "warn"] } : { log: [] }
);

// If any changed on middleware server restart is required
// TODO: Migrate it to $extends
// exampleMiddleware(prismaWithoutClientExtensions);

// FIXME: Due to some reason, there are types failing in certain places due to the $extends. Fix it and then enable it
// Specifically we get errors like `Type 'string | Date | null | undefined' is not assignable to type 'Exact<string | Date | null | undefined, string | Date | null | undefined>'`
const prismaWithClientExtensions = prismaWithoutClientExtensions
  //
  .$extends(withAccelerate());
// .$extends({
//   query: {
//     $allModels: {
//       async $allOperations({ model, operation, args, query }) {
//         const start = performance.now();
//         /* your custom logic here */
//         const res = await query(args);
//         const end = performance.now();
//         logger.debug("Query Perf: ", `${model}.${operation} took ${(end - start).toFixed(2)}ms\n`);
//         return res;
//       },
//     },
//   },
// });

export const prisma =
  ((globalThis as any).prisma as typeof prismaWithClientExtensions) || prismaWithClientExtensions;

if (process.env.NODE_ENV !== "production") {
  (globalThis as any).prisma = prisma;
}

export type PrismaClient = typeof prismaWithClientExtensions;
export default prisma;

export * from "@prisma/client";
export * from "./selects";

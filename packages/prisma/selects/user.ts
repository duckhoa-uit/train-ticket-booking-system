import { Prisma } from "../client";

export const baseUserSelect = Prisma.validator<Prisma.UserSelect>()({});

// export const userSelect = Prisma.validator<Prisma.UserArgs>()({
//   select: {
//     name: true,
//     allowDynamicBooking: true,
//     destinationCalendar: true,
//     locale: true,
//     hideBranding: true,
//     theme: true,
//     brandColor: true,
//     darkBrandColor: true,
//     metadata: true,
//     organizationId: true,
//   },
// });

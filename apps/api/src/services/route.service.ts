// import { RouteCreateInput, RouteGetAllInput } from "@/schemas/route.schema"
// import prisma, { Prisma, Route } from "@ttbs/prisma";
// import AppError from "@/utils/app-error";

// export const createRoute = async (input: RouteCreateInput) => {
//     return (await prisma.route.create({
//         data: {
//             depart_station: input.depart_station,
//             arrive_station: input.arrive_station,
//             depart_time: input.depart_time,
//             arrive_time: input.arrive_time,
//             depart_day: input.depart_day
//         }
//     })) as Route;
// };

// export const getAllRoute = async () => {
//     return (await prisma.route.findMany());
// };

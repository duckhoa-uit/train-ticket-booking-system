import prisma from "@ttbs/prisma";

import { JourneyCreateInput } from "@/schemas/journey.schema";

export const createJourney = async (input: JourneyCreateInput) => {
  return await prisma.journey.create({
    data: {
      name: input.name,
      journeyStations: {
        createMany: {
          data: input.journeyStations.map((_) => ({
            stationId: _.stationId,
            order: _.order,
          })),
        },
      },
    },
  });
};
// export const updateJourney = async (id:number, input: JourneyUpdateInput) => {
//   return (await prisma.journey.update({
//     where:{id},
//     data:{

//       journeyStations: {

//         }
//     }
//   }));
// };

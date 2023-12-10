import { Router } from "express";

import { authRouter } from "./auth.router";
import { carriageRouter } from "./carriages.router";
import { journeyRouter } from "./journey.route";
import { routeRouter } from "./route.router";
import { seatRouter } from "./seat.router";
import { seatTypeRouter } from "./seatType.router";
import { stationRouter } from "./station.route";
import { trainRouter } from "./train.router";
import { userRouter } from "./user.router";

export const indexRouter = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/stations", stationRouter);
indexRouter.use("/train", trainRouter);
indexRouter.use("/journeys", journeyRouter);
indexRouter.use("/route", routeRouter);
indexRouter.use("/carriage", carriageRouter);
indexRouter.use("/seat", seatRouter);
indexRouter.use("/seatType", seatTypeRouter);

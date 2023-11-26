import { Router } from "express";

import { authRouter } from "./auth.router";
import { journeyRouter } from "./journey.route";
import { routeRouter } from "./route.router";
import { stationRouter } from "./station.route";
import { userRouter } from "./user.router";

export const indexRouter = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/stations", stationRouter);
indexRouter.use("/journeys", journeyRouter);

indexRouter.use("/route", routeRouter);

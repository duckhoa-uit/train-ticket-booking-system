import { Router } from "express";

import { authRouter } from "./auth.router";
import { carriageRouter } from "./carriages.router";
import { journeyRouter } from "./journey.route";
import { orderRouter } from "./order.router";
import { routeRouter } from "./route.router";
import { searchRouter } from "./search.router";
import { seatRouter } from "./seat.router";
import { seatTypeRouter } from "./seatType.router";
import { stationRouter } from "./station.route";
import { trainRouter } from "./train.router";
import { tripRouter } from "./trip.router";
import { tripTimelineRouter } from "./tripTimeline.router";
import { userRouter } from "./user.router";
import { webhookRouter } from "./webhook.router";

export const indexRouter = Router();

indexRouter.use("/users", userRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/stations", stationRouter);
indexRouter.use("/trains", trainRouter);
indexRouter.use("/journeys", journeyRouter);
indexRouter.use("/routes", routeRouter);
indexRouter.use("/carriages", carriageRouter);
indexRouter.use("/seats", seatRouter);
indexRouter.use("/seat-types", seatTypeRouter);
indexRouter.use("/trips", tripRouter);
indexRouter.use("/trip-timelines", tripTimelineRouter);
indexRouter.use("/search", searchRouter);
indexRouter.use("/orders", orderRouter);
indexRouter.use("/webhooks", webhookRouter);

import { Router } from "express";

import routeController from "@/controllers/route.controller";

export const routeRouter = Router();

routeRouter.post("/add-route", routeController.addRoute);

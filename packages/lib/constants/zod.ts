import { z } from "zod";

export const booleanParamSchema = z.enum(["true", "false"]).transform((value) => value === "true");

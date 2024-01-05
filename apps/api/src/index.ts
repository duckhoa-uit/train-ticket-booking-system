import config from "config";

import { env } from "@ttbs/env";

import { app } from "./app";

const port = env.API_PORT;

app.listen(port, async () => {
  console.log(
    `${
      env.NODE_ENV
    } is running on ${port}, token expire in: ${config.get<number>(
      "auth.accessTokenExpiresIn",
    )}m`,
  );
});

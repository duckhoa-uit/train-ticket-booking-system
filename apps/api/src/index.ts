import { env } from "@ttbs/env";

import { app } from "./app";

const port = env.API_PORT;

// start server on { port }
app.listen(port, () => {
  console.log(`${env.NODE_ENV} is running on ${port}`);
});

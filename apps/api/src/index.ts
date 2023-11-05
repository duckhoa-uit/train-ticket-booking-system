import { app } from "./app";
import { env } from "./env";

const port = env.PORT;

// start server on { port }
app.listen(port, () => {
  console.log(`${env.NODE_ENV} is running on ${port}`);
});

import { env } from "./config/env";

import { ConnectDatabase } from "./services/conncet-database";

import { app } from "./app";

const start = async () => {
  await ConnectDatabase();
  app.listen(env.port, () => {
    console.log(`listening on port ${env.port}..`);
  });
};
start();

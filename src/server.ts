/* eslint-disable no-console */
import config from "config";
import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./utils/dataSource";
import validateEnv from './utils/validateEnv'

async function init() {
  // Get Port
  const port = config.get<number>("port") || 8080;

  // Start App
  AppDataSource.initialize()
    .then(async () => {
      // VALIDATE ENV
      validateEnv()
      
      // SERVE SERVER
      const server = app.listen(port, () => {
        console.log(`Server started on port: ${port}`);
      });

      process.on("SIGTERM", () => {
        console.info("SIGTERM signal received.");
        console.log("Closing http server.");
        server.close(async () => {
          console.log("Http server closed.");
          await AppDataSource.destroy();
        });
      });
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));
}

init();

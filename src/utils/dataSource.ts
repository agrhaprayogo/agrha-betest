const config = require('config');
import { DataSource } from "typeorm";
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from "typeorm-transactional";

const mongoConfig = config.get('mongoConfig');

export const AppDataSource = new DataSource({
  ...mongoConfig,
  type: "mongodb",
  synchronize: true,
  logging: false,
  entities: [__dirname + `/../entities/**/*.entity{.ts,.js}`],
});

// TypeORM Transaction Annotation Init
initializeTransactionalContext();
addTransactionalDataSource(AppDataSource);

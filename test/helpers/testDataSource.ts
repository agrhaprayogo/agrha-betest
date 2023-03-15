import config from 'config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'

const { database, ...postgresConfig } = config.get<{
  host: string
  port: number
  username: string
  password: string
  database: string
}>('postgresConfig')

export const TestDataSource = new DataSource({
  ...postgresConfig,
  database: `${database}-test`,
  type: 'postgres',
  logger: 'simple-console',
  entities: [__dirname + `/../../src/entities/**/*.entity{.ts,.js}`],
  migrations: [__dirname + `/../../src/migrations/**/*{.ts,.js}`],
  factories: [__dirname + `/../../test/factory/**/*.factory{.ts,.js}`],
} as DataSourceOptions & SeederOptions)

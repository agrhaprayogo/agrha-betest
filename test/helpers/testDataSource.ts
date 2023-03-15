import config from 'config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'

const { database, ...mongoConfig } = config.get<{
  host: string
  port: number
  user: string
  password: string
  database: string
}>('mongoConfig')

export const TestDataSource = new DataSource({
  ...mongoConfig,
  database: `${database}-test`,
  type: 'mongodb',
  logger: 'simple-console',
  entities: [__dirname + `/../../src/entities/**/*.entity{.ts,.js}`],
  factories: [__dirname + `/../../test/factory/**/*.factory{.ts,.js}`],
} as DataSourceOptions & SeederOptions)

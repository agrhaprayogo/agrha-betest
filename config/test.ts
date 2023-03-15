export default {
  port: 3000,
  origin: '*',
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  redisCacheExpiresIn: 60,
  postgresConfig: {
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
  },
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

export default {
  port: 3000,
  origin: '*',
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  redisCacheExpiresIn: 60,
}

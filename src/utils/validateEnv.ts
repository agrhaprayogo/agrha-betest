import { cleanEnv, port, str } from 'envalid'

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_HOST: str(),
    MONGO_PORT: port(),
    MONGO_DB: str(),
    TOKENKEY: str(),
  })
}

export default validateEnv

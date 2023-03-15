import User from '@entities/user.entity'
import uuid from '@utils/uuid'
import { setSeederFactory } from 'typeorm-extension'

export default setSeederFactory(User, (faker) => {
  const user = new User()
  user.fullName = faker.name.fullName()
  user.email = faker.internet.email(user.fullName)
  user.username = faker.internet.userName()
  user.firebaseId = uuid()

  return user
})

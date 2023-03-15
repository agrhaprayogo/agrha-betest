import User from '@entities/user.entity'
import uuid from '@utils/uuid'
import { setSeederFactory } from 'typeorm-extension'

export default setSeederFactory(User, (faker) => {
  const user = new User()
  user.fullName = faker.name.fullName()
  user.emailAddress = faker.internet.email(user.fullName)
  user.accountNumber = faker.random.numeric(8)
  user.registrationNumber = faker.random.numeric(8)
  user.userId = uuid()

  return user
})

import User from '@entities/user.entity'
import { UserServices } from '@services/user.services'
import {
  dbConnectionContext,
  dbTransactionContext,
} from '@test-helpers/dbContext'
import { TestDataSource } from '@test-helpers/testDataSource'
import { useSeederFactory } from 'typeorm-extension'

dbConnectionContext()

describe('User Services', () => {
  const userServices = new UserServices(TestDataSource)
  dbTransactionContext()

  describe('createUser', () => {
    const userToCreate = {
      email: 'test@test.com',
      firebaseId: 'test',
      username: 'test_username',
    }
    it('Should return an created user', async () => {
      const spy = jest.spyOn(userServices, 'createUser')
      const result = await userServices.createUser(userToCreate)
      expect(result).toBeInstanceOf(User)
      expect(spy).toBeCalledWith(userToCreate)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('findUsers', () => {
    it('Should return an array of users', async () => {
      const createdUsers = await useSeederFactory(User).saveMany(10)
      const spy = jest.spyOn(userServices, 'findUsers')
      const result = await userServices.findUsers()
      expect(result).toStrictEqual(createdUsers)
      expect(result).toHaveLength(10)
      expect(spy).toBeCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})

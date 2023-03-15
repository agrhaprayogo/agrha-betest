import User from '@entities/user.entity'
import { UserServices } from '@services/user.services'
import {
  dbConnectionContext,
  dbTransactionContext,
} from '@test-helpers/dbContext'
import { TestDataSource } from '@test-helpers/testDataSource'
import { useSeederFactory } from 'typeorm-extension'
import uuid from "@utils/uuid";

dbConnectionContext()

describe('User Services', () => {
  const userServices = new UserServices(TestDataSource)
  dbTransactionContext()

  describe('createUserAndAccount', () => {
    const newUuid = uuid();
    const userToCreate = {
      fullName:"agrha ganteng5",
      accountNumber:"5",
      emailAddress:"agrhakartz4@gmail.com",
      registrationNumber:"5",
      userId:newUuid
    }
    it('Should return an created user', async () => {
      const spy = jest.spyOn(userServices, 'createUser')
      const result = await userServices.createUser(userToCreate)
      expect(result).toBeInstanceOf(User)
      expect(spy).toBeCalledWith(userToCreate)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('findAllUsers', () => {
    it('Should return an array of users', async () => {
      const createdUsers = await useSeederFactory(User).saveMany(10)
      const spy = jest.spyOn(userServices, 'findAllUsers')
      const result = await userServices.findAllUsers()
      expect(result).toStrictEqual(createdUsers)
      expect(result).toHaveLength(10)
      expect(spy).toBeCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})

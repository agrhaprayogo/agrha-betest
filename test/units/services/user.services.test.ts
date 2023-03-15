import User from '@entities/user.entity'
import { UserServices } from '@services/user.services'

describe('User Services', () => {
  let userServices: UserServices
  const usersResult = [
    {
      id: '1',
      username: 'Jeki',
      fullName: 'Jeki Shanks',
      bio: 'This Bio',
      firebaseId: 'Firebase Id',
    },
    {
      id: '2',
      username: 'Test',
      fullName: 'Test Account',
      bio: 'Test Bio',
      firebaseId: 'Test Firebase Id',
    },
  ] as User[]

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    userServices = new UserServices()
  })

  describe('findUsers', () => {
    it('Should return an array of users', async () => {
      jest.spyOn(userServices, 'findUsers').mockResolvedValue(usersResult)

      const result = await userServices.findUsers()
      expect(result).toBe(usersResult)
      expect(result).toHaveLength(2)
      expect(userServices.findUsers).toBeCalledWith()
      expect(userServices.findUsers).toHaveBeenCalledTimes(1)
    })
  })

  describe('findUser', () => {
    it('Should return 1 user', async () => {
      jest.spyOn(userServices, 'findUser').mockResolvedValue(usersResult[1])

      const userCondition = {
        where: {
          username: 'Jeki',
        },
      }
      const result = await userServices.findUser(userCondition)
      expect(result).toBe(usersResult[1])
      expect(userServices.findUser).toBeCalledWith(userCondition)
      expect(userServices.findUser).toHaveBeenCalledTimes(1)
    })
  })
})

import userFactory from '@test-factory/user.factory'
import {
  setDataSource,
  setSeederFactory,
  unsetDataSource,
} from 'typeorm-extension'
import { TransactionalTestContext } from 'typeorm-transactional-tests'
import { TestDataSource } from './testDataSource'

export function dbTransactionContext(): void {
  const transactionalContext = new TransactionalTestContext(TestDataSource)
  beforeEach(async () => await transactionalContext.start())
  afterEach(async () => await transactionalContext.finish())
}

export function dbConnectionContext() {
  setSeederFactory(userFactory.entity, userFactory.factoryFn)

  beforeAll(async () => {
    await TestDataSource.initialize()
    setDataSource(TestDataSource)
  })
  afterAll(async () => {
    await TestDataSource.destroy()
    unsetDataSource()
  })
}

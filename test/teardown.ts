/* eslint-disable no-console */
import { dropDatabase } from 'typeorm-extension'
import { TestDataSource } from './helpers/testDataSource'

// Testing teardown
async function teardown() {
  // Drop the test database with specification of the Test DataSource options
  console.log('\nDropping Testing Database...')
  await dropDatabase({
    options: TestDataSource.options,
    initialDatabase: 'mongodb',
  })
  console.log('\nTesting Database has Dropped')
}

export default teardown

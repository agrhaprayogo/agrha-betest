/* eslint-disable no-console */
import { createDatabase } from 'typeorm-extension'
import { TestDataSource } from './helpers/testDataSource'

// Testing setup
async function setup() {
  // Create the test database with specification of the Test DataSource options
  console.log('\nInitiating Testing Database...')
  await createDatabase({
    options: TestDataSource.options,
    initialDatabase: 'mongodb',
  })
  console.log('\nTesting Database has Initiated')
}

export default setup

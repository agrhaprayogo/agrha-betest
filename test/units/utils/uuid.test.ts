import uuid from '@utils/uuid'

describe('uuid', () => {
  test('generate uuid', () => {
    expect(uuid()).toBeTruthy()
  })
})

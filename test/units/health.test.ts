import request from 'supertest'
import app from '../../src/app'

describe('Test Health check Route/Controller', () => {
  describe('GET /', () => {
    it('should succeed', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, response) => {
          expect(response.body).toEqual({
            status: 'success',
            message: 'Ok',
          })
          done(err)
        })
    })
  })

  describe('GET /api/health-checker', () => {
    it('should succeed', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, response) => {
          expect(response.body).toEqual({
            status: 'success',
            message: 'Ok',
          })
          done(err)
        })
    })
  })
})

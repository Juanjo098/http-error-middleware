import request from 'supertest'
import http from 'http'

import app from '@/server'
import { ClientErrorCodes } from '@/enums/StatusCode'

const server = http.createServer(app(false)).listen(3000)
const server2 = http.createServer(app(true)).listen(3001)

describe('GET', () => {
  test('try to get a bad request response', async () => {
    const response = await request(server).get('/bad-request').send()
    expect(response.status).toBe(ClientErrorCodes.badRequest)
    expect(response.body.message).toBe('Bad Request')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a unauthorized response', async () => {
    const response = await request(server).get('/unauthorized').send()
    expect(response.status).toBe(ClientErrorCodes.unauthorized)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a payment required response', async () => {
    const response = await request(server).get('/payment-required').send()
    expect(response.status).toBe(ClientErrorCodes.paymentRequired)
    expect(response.body.message).toBe('Payment required')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a not forbidden response', async () => {
    const response = await request(server).get('/forbidden').send()
    expect(response.status).toBe(ClientErrorCodes.forbidden)
    expect(response.body.message).toBe('Forbidden')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a not not found response', async () => {
    const response = await request(server).get('/not-found').send()
    expect(response.status).toBe(ClientErrorCodes.notFound)
    expect(response.body.message).toBe('Not found')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a method not allowed response', async () => {
    const response = await request(server).get('/method-not-allowed').send()
    expect(response.status).toBe(ClientErrorCodes.methodNotAllowed)
    expect(response.body.message).toBe('Method not allowed')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a not acceptable response', async () => {
    const response = await request(server).get('/not-acceptable').send()
    expect(response.status).toBe(ClientErrorCodes.notAcceptable)
    expect(response.body.message).toBe('Not acceptable')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a proxy authentication required response', async () => {
    const response = await request(server).get('/proxy-authentication-requerid').send()
    expect(response.status).toBe(ClientErrorCodes.proxyAuthenticationRequired)
    expect(response.body.message).toBe('Proxy authentication required')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a request timeout response', async () => {
    const response = await request(server).get('/request-timeout').send()
    expect(response.status).toBe(ClientErrorCodes.requestTimeOut)
    expect(response.body.message).toBe('Request timeout')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a conflict response', async () => {
    const response = await request(server).get('/conflict').send()
    expect(response.status).toBe(ClientErrorCodes.conflict)
    expect(response.body.message).toBe('Conflict')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a bad request response using a custom error', async () => {
    const response = await request(server)
      .get('/custom')
      .query({ statusCode: 400 })
      .send()
    expect(response.status).toBe(ClientErrorCodes.badRequest)
    expect(response.body.message).toBe('Custom error')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  afterAll(() => {
    server.close()
  })
})

describe('GET destructure', () => {
  test('try to get a bad request response', async () => {
    const response = await request(server2).get('/bad-request').send()
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Bad Request')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a unauthorized response', async () => {
    const response = await request(server2).get('/unauthorized').send()
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a payment required response', async () => {
    const response = await request(server2).get('/payment-required').send()
    expect(response.status).toBe(402)
    expect(response.body.message).toBe('Payment required')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a not forbidden response', async () => {
    const response = await request(server2).get('/forbidden').send()
    expect(response.status).toBe(403)
    expect(response.body.message).toBe('Forbidden')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a not not found response', async () => {
    const response = await request(server2).get('/not-found').send()
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Not found')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a method not allowed response', async () => {
    const response = await request(server2).get('/method-not-allowed').send()
    expect(response.status).toBe(ClientErrorCodes.methodNotAllowed)
    expect(response.body.message).toBe('Method not allowed')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a not acceptable response', async () => {
    const response = await request(server2).get('/not-acceptable').send()
    expect(response.status).toBe(ClientErrorCodes.notAcceptable)
    expect(response.body.message).toBe('Not acceptable')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a proxy authentication required response', async () => {
    const response = await request(server2).get('/proxy-authentication-requerid').send()
    expect(response.status).toBe(ClientErrorCodes.proxyAuthenticationRequired)
    expect(response.body.message).toBe('Proxy authentication required')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a request timeout response', async () => {
    const response = await request(server2).get('/request-timeout').send()
    expect(response.status).toBe(ClientErrorCodes.requestTimeOut)
    expect(response.body.message).toBe('Request timeout')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a conflict response', async () => {
    const response = await request(server2).get('/conflict').send()
    expect(response.status).toBe(ClientErrorCodes.conflict)
    expect(response.body.message).toBe('Conflict')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a bad request response using a custom error', async () => {
    const response = await request(server2)
      .get('/custom')
      .query({ statusCode: 400 })
      .send()
    expect(response.status).toBe(ClientErrorCodes.badRequest)
    expect(response.body.message).toBe('Custom error')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  afterAll(() => {
    server2.close()
  })
})

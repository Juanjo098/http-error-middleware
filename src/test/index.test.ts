import request from 'supertest'
import http from 'http'

import app from '@/server'
import { ClientErrorCodes, ServerErrorCodes } from '@/enums/StatusCode'

const server = http.createServer(app({ destructure: false, statusCodeOnResponse: false })).listen(3000)
const server2 = http.createServer(app({ destructure: true, statusCodeOnResponse: true })).listen(3001)

describe('GET', () => {
  // Client errors
  test('try to get a bad request response', async () => {
    const response = await request(server).get('/bad-request').send()
    expect(response.status).toBe(ClientErrorCodes.badRequest)
    expect(response.body.statusCode).toBe(undefined)
    expect(response.body.message).toBe('Bad Request')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a unauthorized response', async () => {
    const response = await request(server).get('/unauthorized').send()
    expect(response.status).toBe(ClientErrorCodes.unauthorized)
    expect(response.body.statusCode).toBe(undefined)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a payment required response', async () => {
    const response = await request(server).get('/payment-required').send()
    expect(response.status).toBe(ClientErrorCodes.paymentRequired)
    expect(response.body.statusCode).toBe(undefined)
    expect(response.body.message).toBe('Payment required')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a not forbidden response', async () => {
    const response = await request(server).get('/forbidden').send()
    expect(response.status).toBe(ClientErrorCodes.forbidden)
    expect(response.body.statusCode).toBe(undefined)
    expect(response.body.message).toBe('Forbidden')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a not not found response', async () => {
    const response = await request(server).get('/not-found').send()
    expect(response.body.statusCode).toBe(undefined)
    expect(response.status).toBe(ClientErrorCodes.notFound)
    expect(response.body.message).toBe('Not found')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a method not allowed response', async () => {
    const response = await request(server).get('/method-not-allowed').send()
    expect(response.status).toBe(ClientErrorCodes.methodNotAllowed)
    expect(response.body.statusCode).toBe(undefined)
    expect(response.body.message).toBe('Method not allowed')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a not acceptable response', async () => {
    const response = await request(server).get('/not-acceptable').send()
    expect(response.status).toBe(ClientErrorCodes.notAcceptable)
    expect(response.body.statusCode).toBe(undefined)
    expect(response.body.message).toBe('Not acceptable')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a proxy authentication required response', async () => {
    const response = await request(server).get('/proxy-authentication-requerid').send()
    expect(response.status).toBe(ClientErrorCodes.proxyAuthenticationRequired)
    expect(response.body.statusCode).toBe(undefined)
    expect(response.body.message).toBe('Proxy authentication required')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a request timeout response', async () => {
    const response = await request(server).get('/request-timeout').send()
    expect(response.status).toBe(ClientErrorCodes.requestTimeOut)
    expect(response.body.statusCode).toBe(undefined)
    expect(response.body.message).toBe('Request timeout')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a conflict response', async () => {
    const response = await request(server).get('/conflict').send()
    expect(response.status).toBe(ClientErrorCodes.conflict)
    expect(response.body.statusCode).toBe(undefined)
    expect(response.body.message).toBe('Conflict')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a internal server error response', async () => {
    const response = await request(server).get('/internal-server-error').send()
    expect(response.body.statusCode).toBe(undefined)
    expect(response.status).toBe(ServerErrorCodes.internalServerError)
    expect(response.body.message).toBe('Internal server error')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a not implement response', async () => {
    const response = await request(server).get('/not-implemented').send()
    expect(response.body.statusCode).toBe(undefined)
    expect(response.status).toBe(ServerErrorCodes.notImplemented)
    expect(response.body.message).toBe('Not implemented')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a bat gateway response', async () => {
    const response = await request(server).get('/bad-gateway').send()
    expect(response.body.statusCode).toBe(undefined)
    expect(response.status).toBe(ServerErrorCodes.badGateway)
    expect(response.body.message).toBe('Bad gateway')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a service unavailable response', async () => {
    const response = await request(server).get('/service-unavailable').send()
    expect(response.body.statusCode).toBe(undefined)
    expect(response.status).toBe(ServerErrorCodes.serviceUnavailable)
    expect(response.body.message).toBe('Service unavailable')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a bat gateway response', async () => {
    const response = await request(server).get('/gateway-timeout').send()
    expect(response.body.statusCode).toBe(undefined)
    expect(response.status).toBe(ServerErrorCodes.gatewayTimeout)
    expect(response.body.message).toBe('Gateway Timeout')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a bad request response using a custom error', async () => {
    const response = await request(server)
      .get('/custom')
      .query({ statusCode: 400 })
      .send()
    expect(response.status).toBe(ClientErrorCodes.badRequest)
    expect(response.body.statusCode).toBe(undefined)
    expect(response.body.message).toBe('Custom error')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  afterAll(() => {
    server.close()
  })
})

describe('GET destructure', () => {
  // Client errors
  test('try to get a bad request response', async () => {
    const response = await request(server2).get('/bad-request').send()
    expect(response.status).toBe(ClientErrorCodes.badRequest)
    expect(response.body.statusCode).toBe(ClientErrorCodes.badRequest)
    expect(response.body.message).toBe('Bad Request')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a unauthorized response', async () => {
    const response = await request(server2).get('/unauthorized').send()
    expect(response.status).toBe(ClientErrorCodes.unauthorized)
    expect(response.body.statusCode).toBe(ClientErrorCodes.unauthorized)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a payment required response', async () => {
    const response = await request(server2).get('/payment-required').send()
    expect(response.status).toBe(ClientErrorCodes.paymentRequired)
    expect(response.body.statusCode).toBe(ClientErrorCodes.paymentRequired)
    expect(response.body.message).toBe('Payment required')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a not forbidden response', async () => {
    const response = await request(server2).get('/forbidden').send()
    expect(response.status).toBe(ClientErrorCodes.forbidden)
    expect(response.body.statusCode).toBe(ClientErrorCodes.forbidden)
    expect(response.body.message).toBe('Forbidden')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a not not found response', async () => {
    const response = await request(server2).get('/not-found').send()
    expect(response.status).toBe(ClientErrorCodes.notFound)
    expect(response.body.statusCode).toBe(ClientErrorCodes.notFound)
    expect(response.body.message).toBe('Not found')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a method not allowed response', async () => {
    const response = await request(server2).get('/method-not-allowed').send()
    expect(response.status).toBe(ClientErrorCodes.methodNotAllowed)
    expect(response.body.statusCode).toBe(ClientErrorCodes.methodNotAllowed)
    expect(response.body.message).toBe('Method not allowed')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a not acceptable response', async () => {
    const response = await request(server2).get('/not-acceptable').send()
    expect(response.status).toBe(ClientErrorCodes.notAcceptable)
    expect(response.body.statusCode).toBe(ClientErrorCodes.notAcceptable)
    expect(response.body.message).toBe('Not acceptable')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a proxy authentication required response', async () => {
    const response = await request(server2).get('/proxy-authentication-requerid').send()
    expect(response.status).toBe(ClientErrorCodes.proxyAuthenticationRequired)
    expect(response.body.statusCode).toBe(ClientErrorCodes.proxyAuthenticationRequired)
    expect(response.body.message).toBe('Proxy authentication required')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a request timeout response', async () => {
    const response = await request(server2).get('/request-timeout').send()
    expect(response.status).toBe(ClientErrorCodes.requestTimeOut)
    expect(response.body.statusCode).toBe(ClientErrorCodes.requestTimeOut)
    expect(response.body.message).toBe('Request timeout')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a conflict response', async () => {
    const response = await request(server2).get('/conflict').send()
    expect(response.status).toBe(ClientErrorCodes.conflict)
    expect(response.body.statusCode).toBe(ClientErrorCodes.conflict)
    expect(response.body.message).toBe('Conflict')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a internal server error response', async () => {
    const response = await request(server2).get('/internal-server-error').send()
    expect(response.status).toBe(ServerErrorCodes.internalServerError)
    expect(response.body.statusCode).toBe(ServerErrorCodes.internalServerError)
    expect(response.body.message).toBe('Internal server error')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a not implement response', async () => {
    const response = await request(server2).get('/not-implemented').send()
    expect(response.status).toBe(ServerErrorCodes.notImplemented)
    expect(response.body.statusCode).toBe(ServerErrorCodes.notImplemented)
    expect(response.body.message).toBe('Not implemented')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a bat gateway response', async () => {
    const response = await request(server2).get('/bad-gateway').send()
    expect(response.body.statusCode).toBe(ServerErrorCodes.badGateway)
    expect(response.status).toBe(ServerErrorCodes.badGateway)
    expect(response.body.message).toBe('Bad gateway')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a service unavailable response', async () => {
    const response = await request(server2).get('/service-unavailable').send()
    expect(response.status).toBe(ServerErrorCodes.serviceUnavailable)
    expect(response.body.statusCode).toBe(ServerErrorCodes.serviceUnavailable)
    expect(response.body.message).toBe('Service unavailable')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a bat gateway response', async () => {
    const response = await request(server2).get('/gateway-timeout').send()
    expect(response.status).toBe(ServerErrorCodes.gatewayTimeout)
    expect(response.body.statusCode).toBe(ServerErrorCodes.gatewayTimeout)
    expect(response.body.message).toBe('Gateway Timeout')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  test('try to get a bad request response using a custom error', async () => {
    const response = await request(server2)
      .get('/custom')
      .query({ statusCode: 400 })
      .send()
    expect(response.status).toBe(ClientErrorCodes.badRequest)
    expect(response.body.statusCode).toBe(ClientErrorCodes.badRequest)
    expect(response.body.message).toBe('Custom error')
    expect(response.body.detailsMessage).toBe('This are important details')
  })

  afterAll(() => {
    server2.close()
  })
})

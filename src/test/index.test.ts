import request from 'supertest'
import http from 'http'

import app from '@/server'

const server = http.createServer(app(false)).listen(3000)
const server2 = http.createServer(app(true)).listen(3001)

describe('GET', () => {
  test('try to get a bad request response', async () => {
    const response = await request(server).get('/bad-request').send()
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Bad Request')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a unauthorized response', async () => {
    const response = await request(server).get('/unauthorized').send()
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a payment required response', async () => {
    const response = await request(server).get('/payment-required').send()
    expect(response.status).toBe(402)
    expect(response.body.message).toBe('Payment required')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a not forbidden response', async () => {
    const response = await request(server).get('/forbidden').send()
    expect(response.status).toBe(403)
    expect(response.body.message).toBe('Forbidden')
    expect(response.body.details.detailsMessage).toBe('This are important details')
  })

  test('try to get a not not found response', async () => {
    const response = await request(server).get('/not-found').send()
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Not found')
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

  afterAll(() => {
    server2.close()
  })
})

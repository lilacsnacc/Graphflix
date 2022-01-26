const { it, expect, afterEach } = require('@jest/globals');
const request = require('supertest')
const RestAPI = require('./');

describe('RestAPI test', () => {
  const jsonLocation = '../public/videos/desc';
  const targetEndpoint = '/api/titles';

  let restAPI;

  afterEach(() => restAPI?.close()) // When the test is done, release the server if it was initialized

  it('should throw an error when initialized improperly', async () => {
    const badPath = () => restAPI = new RestAPI(0, targetEndpoint)
    const badEndpoint = () => restAPI = new RestAPI(jsonLocation, 0)
    const badPort = () => restAPI = new RestAPI(jsonLocation, targetEndpoint, 'zero')

    expect(badPath).toThrow(TypeError)
    expect(badEndpoint).toThrow(TypeError)
    expect(badPort).toThrow(TypeError)
  })

  it('should return 200 for valid GET command and endpoint', async () => {
    restAPI = new RestAPI(jsonLocation, targetEndpoint)

    const resp = await request(restAPI.server).get(targetEndpoint)

    expect(resp.statusCode).toBe(200);
  })

  it('should return 404 for non-GET commands and routes from unsupported endpoints', async () => {
    restAPI = new RestAPI(jsonLocation, targetEndpoint)

    let respPromiseArr = [
      request(restAPI.server).post(targetEndpoint),
      request(restAPI.server).put(targetEndpoint),
      request(restAPI.server).delete(targetEndpoint),
      request(restAPI.server).get('/incorrect/endpoint')
    ]

    await Promise.all(respPromiseArr)
      .then(respArr => respArr.forEach(resp => expect(resp.statusCode).toBe(404)))
      .catch(err => { throw err })
  })

  it('should return 500 error when initialized with nonexistent json path', async () => {
    restAPI = new RestAPI('./invalid/location', targetEndpoint)

    const resp = await request(restAPI.server).get(targetEndpoint)

    expect(resp.statusCode).toBe(500);
    expect(resp.body).toBeTruthy();
  })
})
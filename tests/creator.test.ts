import { removeGuardFields } from './../src/utils/guard';
import { CreateCollectibleBody, UpdateCollectibleBody } from './../src/types/collectible';
import { statusCodes } from './httpStatusCode';
import { request } from './supertest';
import { create, close } from './connection';

beforeAll(async () => await create());
afterAll(async () => await close());

const basePath = process.env.npm_package_basePath;
const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MjNiMTM2My00ODg2LTQyODktOGE0Ny0yZjJlZTEyMTA0ZDciLCJhY2NvdW50SWQiOiJmYjJiYjQyMS1mMTE4LTQyOWUtYjI1Yy1lZmI3YTJhMjE1ZWQiLCJwdWJsaWNBZGRyZXNzIjoiMHhDQjJEQmM0NUU0YjE2Njg0YzE1QzY0ZTc3OGVGNTg5RGYwNDYwOGVmIiwiaWF0IjoxNjM2NDQ4MzQyLCJleHAiOjE2MzY1MzQ3NDJ9.w9o3qG7hZYu7CKazmTwfZU01Wc1viGJ-aqBcDyM6qoqBj6tw4Pm_Ti8oVWtfJgoKY8vjRJbXUzwCSKLtWmWgWjf3E80mH48ApmSz9sE2km_sKQHa9T9R_V3SNPUdD0jOwBzouru2dMUe1KKQ2hZkLUIiLnUBcLEHQfFLbGIDDYo`;
let collectible: UpdateCollectibleBody;
const data: CreateCollectibleBody = {
  fileUrl: 'test',
  price: 0,
  title: parseInt(`${Math.random() * 10000000}`).toString(),
  description: 'test',
  royalties: 0,
  freeMinting: true,
  draft: true,
};

describe('Test Creator Service', () => {
  describe('Post /collectibles', () => {
    test('should return collectible', async () => {
      const res = await request.post(`${basePath}/collectibles`).auth(token, { type: 'bearer' }).send(data);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
  describe('Get /collectibles', () => {
    test('should return collectibles', async () => {
      const res = await request.get(`${basePath}/collectibles`).auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
      collectible = res.body.find((v: UpdateCollectibleBody) => v.title === data.title);
    });
  });
  describe('Get /collectibles/id', () => {
    test('should return collectible', async () => {
      const res = await request.get(`${basePath}/collectibles/${collectible.id}`).auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
  describe('Put /collectibles', () => {
    test('should return status "Done"', async () => {
      const payload = removeGuardFields(collectible, [
        'createdAt',
        'updatedAt',
        'userId',
        'accountId',
        'transactionId',
      ]);
      payload.title = 'test';
      console.log(payload);
      const res = await request.put(`${basePath}/collectibles`).auth(token, { type: 'bearer' }).send(payload);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
  describe('Delete /collectibles/id', () => {
    test('should return status "Done"', async () => {
      const res = await request.delete(`${basePath}/collectibles/${collectible.id}`).auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
});

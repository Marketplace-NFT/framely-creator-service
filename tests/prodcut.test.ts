import { removeGuardFields } from '../src/utils/guard';
import { CreateProductBody, UpdateProductBody } from '../src/types/product';
import { statusCodes } from './httpStatusCode';
import { request } from './supertest';
import { create, close } from './connection';

beforeAll(async () => await create());
afterAll(async () => await close());

const basePath = process.env.npm_package_basePath;
const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MjNiMTM2My00ODg2LTQyODktOGE0Ny0yZjJlZTEyMTA0ZDciLCJhY2NvdW50SWQiOiJmYjJiYjQyMS1mMTE4LTQyOWUtYjI1Yy1lZmI3YTJhMjE1ZWQiLCJwdWJsaWNBZGRyZXNzIjoiMHhDQjJEQmM0NUU0YjE2Njg0YzE1QzY0ZTc3OGVGNTg5RGYwNDYwOGVmIiwiaWF0IjoxNjM2NDQ4MzQyLCJleHAiOjE2MzY1MzQ3NDJ9.w9o3qG7hZYu7CKazmTwfZU01Wc1viGJ-aqBcDyM6qoqBj6tw4Pm_Ti8oVWtfJgoKY8vjRJbXUzwCSKLtWmWgWjf3E80mH48ApmSz9sE2km_sKQHa9T9R_V3SNPUdD0jOwBzouru2dMUe1KKQ2hZkLUIiLnUBcLEHQfFLbGIDDYo`;
let product: UpdateProductBody;
const data: CreateProductBody = {
  fileUrl: 'test',
  price: 0,
  title: parseInt(`${Math.random() * 10000000}`).toString(),
  description: 'test',
  royalties: 0,
  freeMinting: true,
  draft: true,
};

describe('Test Creator Service', () => {
  describe('Post /Products', () => {
    test('should return Product', async () => {
      const res = await request.post(`${basePath}/products`).auth(token, { type: 'bearer' }).send(data);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
  describe('Get /Products', () => {
    test('should return Products', async () => {
      const res = await request.get(`${basePath}/products`).auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
      product = res.body.find((v: UpdateProductBody) => v.title === data.title);
    });
  });
  describe('Get /Products/id', () => {
    test('should return Product', async () => {
      const res = await request.get(`${basePath}/products/${product.id}`).auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
  describe('Put /Products', () => {
    test('should return status "Done"', async () => {
      const payload = removeGuardFields(product, ['createdAt', 'updatedAt', 'userId', 'accountId', 'transactionId']);
      payload.title = 'test';
      console.log(payload);
      const res = await request.put(`${basePath}/products`).auth(token, { type: 'bearer' }).send(payload);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
  describe('Delete /Products/id', () => {
    test('should return status "Done"', async () => {
      const res = await request.delete(`${basePath}/products/${product.id}`).auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
});

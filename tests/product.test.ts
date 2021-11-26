import { CreateProductBody } from '../src/types/product';
import { statusCodes } from './httpStatusCode';
import { request } from './supertest';
import { create, close } from './connection';

beforeAll(async () => await create());
afterAll(async () => await close());

const basePath = process.env.npm_package_basePath;
const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1N2YwOTVlNy1iMWQ0LTQzNzgtOGQ3OC1lMmYwY2FhNTg0OTMiLCJhY2NvdW50SWQiOiI1YzdlMDNhNS0zYjBlLTQyNzAtYjhkNi0yMWE2Y2EyNmRiOTgiLCJwdWJsaWNBZGRyZXNzIjoiMHhDQjJEQmM0NUU0YjE2Njg0YzE1QzY0ZTc3OGVGNTg5RGYwNDYwOGVmIiwiaWF0IjoxNjM3OTA5NDY0LCJleHAiOjE2Mzc5OTU4NjR9.Q5CpfQOCUY1DYUmHSC0xL9DTeLhJluZma-LAEZbOvrPihXus3aLxo0sXJkuWa8Fn3klaKQvX3VNM4R97lBmK4WUOYqymRbcYHyBTe_GnJsmc_8bk1HWxvvxAzwRb6SlrGKw_rBtmO9Yy0IhyI2X5dnS-l8PyiOej8vOJMK7nWio`;
let id = '';
const data: CreateProductBody = {
  asset: {
    name: '2021/11/18/dcTEt_AAyEJyos9KL4eb0_test',
    url: 'https://s3.fr-par.scw.cloud/framely-assets-dev/2021/11/18/dcTEt_AAyEJyos9KL4eb0_test',
    type: 'image/png',
    previewUrl: 'string',
  },
  price: 1,
  currency: 'ETH',
  title: parseInt(`${Math.random() * 10000000}`).toString(),
  description: 'test',
  royalties: 0,
  freeMinting: true,
  draft: true,
};

describe('Test Creator Service', () => {
  describe('Post /products', () => {
    test('should return Product', async () => {
      const res = await request.post(`${basePath}/products`).auth(token, { type: 'bearer' }).send(data);
      console.log(res.error);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
      id = res.body.productId;
    });
  });

  describe('Patch /products', () => {
    test('should return status "Done"', async () => {
      const payload = { ...data, id };
      payload.draft = false;
      const res = await request.patch(`${basePath}/products`).auth(token, { type: 'bearer' }).send(payload);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });

  describe('Patch /reactions', () => {
    test('should return status "Love"', async () => {
      const res = await request.patch(`${basePath}/reactions`).auth(token, { type: 'bearer' }).send({ productId: id });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
      expect(res.body.message).toBe('Loved');
    });
  });

  describe('Patch /reactions', () => {
    test('should return status "Love"', async () => {
      const res = await request.patch(`${basePath}/reactions`).auth(token, { type: 'bearer' }).send({ productId: id });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
      expect(res.body.message).toBe('Unloved');
    });
  });

  describe('Delete /products/id', () => {
    test('should return status "Done"', async () => {
      const res = await request.delete(`${basePath}/products/${id}`).auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });

  describe('Patch /products/id', () => {
    test('should return status "Done"', async () => {
      const res = await request.patch(`${basePath}/restore-product/${id}`).auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
});

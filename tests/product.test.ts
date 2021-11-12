import { removeGuardFields } from './../src/utils/guard';
import { CreateProductBody, UpdateProductBody } from '../src/types/product';
import { statusCodes } from './httpStatusCode';
import { request } from './supertest';
import { create, close } from './connection';

beforeAll(async () => await create());
afterAll(async () => await close());

const basePath = process.env.npm_package_basePath;
const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NTdkMTA4Mi0xMmRlLTQ5MDMtOTljMS1lMzZmNzYwN2U3ODYiLCJhY2NvdW50SWQiOiI1ZjdmZjViOS1lZWRlLTRjMDYtODc0Ni01MGJhYjg2YzI0OWEiLCJwdWJsaWNBZGRyZXNzIjoiMHgxNDc5MTY5NzI2MEU0YzlBNzFmMTg0ODRDOWY5OTdCMzA4ZTU5MzI1IiwiaWF0IjoxNjM2NjA5MDc1LCJleHAiOjE2MzY2OTU0NzV9.RvKSIkZPBHEWiMmKtwwwOpfJxJxC6bk5J6LrwdEoQXX6v0mK7jGcmpGGEWB2IW151i9yJ9DIy5sNRNMlTz_x4I5Hvt-0IKJWAspqrwCcLwW6M16y-pr40fcwBo4m9zTyYk-kP5PSFJQt6vcxWl_X_WtjOooX7NoeSI2vPYC3Q9k`;
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
  describe('Post /products', () => {
    test('should return Product', async () => {
      const res = await request.post(`${basePath}/products`).auth(token, { type: 'bearer' }).send(data);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });

  describe('Get /products', () => {
    test('should return Products', async () => {
      const res = await request.get(`${basePath}/products`);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
      product = res.body.find((v: UpdateProductBody) => v.title === data.title);
    });
  });

  describe('Get /products/id', () => {
    test('should return Product', async () => {
      const res = await request.get(`${basePath}/products/${product.id}`);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });

  describe('Get /my-products', () => {
    test('should return Products', async () => {
      const res = await request.get(`${basePath}/my-products`).auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });

  describe('Patch /products', () => {
    test('should return status "Done"', async () => {
      const payload = removeGuardFields(product, [
        'createdAt',
        'updatedAt',
        'userId',
        'accountId',
        'transactionId',
        'status',
      ]);
      payload.draft = false;

      console.log(product);
      const res = await request.patch(`${basePath}/products`).auth(token, { type: 'bearer' }).send(payload);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });

  describe('Patch /reactions', () => {
    test('should return status "Love"', async () => {
      const res = await request
        .patch(`${basePath}/reactions`)
        .auth(token, { type: 'bearer' })
        .send({ productId: product.id });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
      expect(res.body.message).toBe('Loved');
    });
  });

  describe('Patch /reactions', () => {
    test('should return status "Love"', async () => {
      const res = await request
        .patch(`${basePath}/reactions`)
        .auth(token, { type: 'bearer' })
        .send({ productId: product.id });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
      expect(res.body.message).toBe('Unloved');
    });
  });

  describe('Delete /products/id', () => {
    test('should return status "Done"', async () => {
      const res = await request.delete(`${basePath}/products/${product.id}`).auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });

  describe('Patch /products/id', () => {
    test('should return status "Done"', async () => {
      const res = await request.patch(`${basePath}/restore-product/${product.id}`).auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
});

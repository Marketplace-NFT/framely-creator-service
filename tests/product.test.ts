import { removeGuardFields } from './../src/utils/guard';
import { CreateProductBody, UpdateProductBody } from '../src/types/product';
import { statusCodes } from './httpStatusCode';
import { request } from './supertest';
import { create, close } from './connection';

beforeAll(async () => await create());
afterAll(async () => await close());

const basePath = process.env.npm_package_basePath;
const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZWNlMjczOC01YjU2LTRiYTQtOGZhNC1iNTQ1ZGMzZmQ0NjQiLCJhY2NvdW50SWQiOiI3Njc5OTJjNy0yYzljLTRjM2UtYWI5Zi03ZWQxYTNlOThkNjIiLCJwdWJsaWNBZGRyZXNzIjoiMHgxNDc5MTY5NzI2MEU0YzlBNzFmMTg0ODRDOWY5OTdCMzA4ZTU5MzI1IiwiaWF0IjoxNjM2NzExMjY4LCJleHAiOjE2MzY3OTc2Njh9.DQJXJYNrjimjvdat3qfimrOM43kwOqKmmEL4EbhKpGez172Cu6jJAzXX2MaqVJzM48jIBhVK4Vgha_pM905QGy9DZMXSpn0o4dW-PHxcQETtw6vV4Ns9Ye0zB2Fp5bNRKA2flWsS3Bf_Sur9DkDyXf2D8ZvYZz-CVanzXlNRqbQ`;
let product: UpdateProductBody;
const data: CreateProductBody = {
  file: { name: 'test', url: 'test', type: 'image/png' },
  price: { value: 1, currency: 'ETH' },
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

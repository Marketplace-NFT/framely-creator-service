import { CreateProductBody } from '../src/types/product';
import { statusCodes } from './httpStatusCode';
import { request } from './supertest';
import { create, close } from './connection';

beforeAll(async () => await create());
afterAll(async () => await close());

const basePath = process.env.npm_package_basePath;
const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNmRmN2M2Zi1jYmEzLTQwMDEtYTQ3MC02MjhmZjUwZThjZTgiLCJhY2NvdW50SWQiOiI1MTQ4Mzc1NC1lZWZlLTQ5MTctOWFmOC0yYjlhMzFmYTVlNTUiLCJwdWJsaWNBZGRyZXNzIjoiMHgxNDc5MTY5NzI2MEU0YzlBNzFmMTg0ODRDOWY5OTdCMzA4ZTU5MzI1IiwiaWF0IjoxNjQwMTYwNjI5LCJleHAiOjE2NDAyNDcwMjl9.KRv4DhJmaiXnaEvVVNPM6yL9PALaZOQ0gHb4mtER5q2t06DoTI9ouKhlO1WI4-2q0z_6mNT3llv0-NAMaC5QSemVWXIc0JoO2A70gNjcMOZ605hWdWlVBujnt68Hzy9EWj9THbnTNo8rWTde66JadbWfx0uuqT8xQxF5UKuxPFs`;
let id = '';
const data: CreateProductBody = {
  asset: {
    name: '2021/12/08/aOwMpdFLaFN15R_AhWVCa_IMG_7662.JPG',
    url: 'https://s3.fr-par.scw.cloud/framely-assets-dev/2021/12/08/aOwMpdFLaFN15R_AhWVCa_IMG_7662.JPG',
    type: 'image/jpeg',
  },
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

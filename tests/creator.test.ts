import { removeGuardFields } from './../src/utils/guard';
import { CreateCollectibleBody, UpdateCollectibleBody } from './../src/types/collectible';
import { statusCodes } from './httpStatusCode';
import { request } from './supertest';
import { create, close } from './connection';

beforeAll(async () => await create());
afterAll(async () => await close());

const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Yzk4YTgwOS1hY2NjLTRkOTAtODNiNS0wZmRjNDc5ZjhmZGYiLCJhY2NvdW50SWQiOiI5NzM3MzM1NS1mNzc5LTQ1OTAtYjUxNS1hNGY2YTc5YmViYzMiLCJwdWJsaWNBZGRyZXNzIjoiMHgxNDc5MTY5NzI2MEU0YzlBNzFmMTg0ODRDOWY5OTdCMzA4ZTU5MzI1IiwiaWF0IjoxNjM2MzU3Mzc0LCJleHAiOjE2MzY0NDM3NzR9.bVx1zxaOjnHYYmW_aT0MbM7mkhPQQiC7DddgitWcFQzZ4hqRdNvxv2_mO2Eg5KPFBIyFlNKCNsdSX53Jkfn2ef8QFY07nJXpHoqleGx6CLygiWyanMdXWL6R-OKJRomob6mUYlJhuKRRR5SArX9ezMrzQla_z-OL2ylvraA3qKo`;
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
      const res = await request.post('/collectibles').auth(token, { type: 'bearer' }).send(data);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
  describe('Get /collectibles', () => {
    test('should return collectibles', async () => {
      const res = await request.get('/collectibles').auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
      collectible = res.body.find((v: UpdateCollectibleBody) => v.title === data.title);
    });
  });
  describe('Get /collectibles/id', () => {
    test('should return collectible', async () => {
      const res = await request.get(`/collectibles/${collectible.id}`).auth(token, { type: 'bearer' });
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
      const res = await request.put(`/collectibles`).auth(token, { type: 'bearer' }).send(payload);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
  describe('Delete /collectibles/id', () => {
    test('should return status "Done"', async () => {
      const res = await request.delete(`/collectibles/${collectible.id}`).auth(token, { type: 'bearer' });
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body).toBeDefined();
    });
  });
});

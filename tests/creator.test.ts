// import { statusCodes } from './httpStatusCode';
// import { request } from './supertest';
import { create, close } from './connection';

beforeAll(async () => await create());
afterAll(async () => await close());

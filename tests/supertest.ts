import supertest from 'supertest';
import app from './app';

const request = supertest(app);
export { app, request };

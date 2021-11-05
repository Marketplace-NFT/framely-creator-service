// Set default timezone
process.env.TZ = 'UTC';
import 'reflect-metadata';
import 'dotenv/config';
import App from './bootstrap/App';

(async (): Promise<void> => {
  const server = new App();
  server.start();
})();

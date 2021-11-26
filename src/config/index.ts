import fs from 'fs';

const baseConfig = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  env: process.env.NODE_ENV || 'development',
  basePath: process.env.npm_package_basePath,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY || '',
  USE_LOG_FILE: Boolean(process.env.USE_LOG_FILE),
  storageUrl: process.env.STORAGE_HOST || 'https://framely.dev2.hdwebsoft.co',
};

if (process.env.JWT_PUBLIC_KEY_FILE) {
  // read file one time when app loaded
  const publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY_FILE, 'utf8');
  baseConfig.JWT_PUBLIC_KEY = publicKey;
}

export default baseConfig;

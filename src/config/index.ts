const baseConfig = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  env: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  USE_LOG_FILE: process.env.USE_LOG_FILE || false,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY || '',
};

export default baseConfig;

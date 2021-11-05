const entityDir = process.env.NODE_ENV === 'development' ? 'src/entities/*.ts' : 'dist/entities/*.js';
const migrationDir = process.env.NODE_ENV === 'development' ? 'src/migrations/*.ts' : 'dist/migrations/*.js';

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: 'all',
  logger: 'file',
  entities: [entityDir],
  migrations: [migrationDir],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};

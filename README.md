# Creator Service

## Prerequisites

- Node JS 14.x or newer
- Postgres DB
- TypeORM

## Config and install dependencies

Copy .env.example to .env and update your env

```bash
yarn install
```

Generate public/private key for JWT encryption

```bash
openssl genrsa -out jwtkey 1024
openssl rsa -in jwtkey -pubout -out jwtkey.pub
```

## Run dev

```bash
yarn dev
```

## Test

```bash
yarn test
```

## Build and run production

```bash
yarn build
yarn start
```

## Run with pm2

```bash
yarn build
pm2 start ecosystem.config.js
```

## Test API using Swagger

URL: http://localhost:3000/docs

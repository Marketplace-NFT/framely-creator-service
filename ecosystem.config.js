const dotenv = require('dotenv');
const { parsed } = dotenv.config();

const appConfig = {
  script: './src/index.ts',
  cwd: process.cwd(),
  name: 'auth-service-nodejs',
  error_files: 'logs/error.log',
  autorestart: false,
  env: parsed,
  ignore_watch: ['node_modules'],
  watch_options: {
    followSymLinks: false,
  },
  watch: ['config', 'src'],
  node_args: '-r tsconfig-paths/register',
  interpreter: './node_modules/.bin/ts-node',
};

const apps = [appConfig];

module.exports = {
  apps,
};

'use strict';
const modules = require('module-alias');
const path = require('path');

const root = path.join(process.cwd(), 'dist');

modules.addAliases({
  '@bootstap': path.join(root, 'bootstrap'),
  '@utils': path.join(root, 'utils'),
  '@routes': path.join(root, 'routes'),
  '@controllers': path.join(root, 'controllers'),
  '@config': path.join(root, 'config'),
  '@rest': path.join(root, 'rest'),
  '@enum': path.join(root, 'enum'),
  '@customtypes': path.join(root, 'types'),
  '@services': path.join(root, 'services'),
  '@lib': path.join(root, 'lib'),
  '@exceptions': path.join(root, 'exceptions'),
  '@middlewares': path.join(root, 'middlewares'),
  '@entities': path.join(root, 'entities'),
});

require('./dist');

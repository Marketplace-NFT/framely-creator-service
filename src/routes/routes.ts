/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  HttpStatusCodeLiteral,
  TsoaResponse,
} from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { IndexController } from './../controllers/index';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductController } from './../controllers/product';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ReactionController } from './../controllers/reaction';
import { expressAuthentication } from './../middlewares/authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  Asset: {
    dataType: 'refObject',
    properties: {
      name: { dataType: 'string', required: true },
      url: { dataType: 'string', required: true },
      type: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ProductResponse: {
    dataType: 'refObject',
    properties: {
      asset: { ref: 'Asset' },
      price: { dataType: 'double' },
      currency: { dataType: 'string' },
      title: { dataType: 'string', required: true },
      description: { dataType: 'string' },
      royalties: { dataType: 'double', required: true },
      freeMinting: { dataType: 'boolean', required: true },
      draft: { dataType: 'boolean', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateProductResponse: {
    dataType: 'refObject',
    properties: {
      status: { dataType: 'string', required: true },
      transactionId: { dataType: 'string' },
      productId: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateProductBody: {
    dataType: 'refObject',
    properties: {
      asset: { dataType: 'union', subSchemas: [{ ref: 'Asset' }, { dataType: 'enum', enums: [null] }] },
      price: { dataType: 'union', subSchemas: [{ dataType: 'double' }, { dataType: 'enum', enums: [null] }] },
      currency: { dataType: 'union', subSchemas: [{ dataType: 'string' }, { dataType: 'enum', enums: [null] }] },
      title: { dataType: 'string', required: true },
      description: { dataType: 'union', subSchemas: [{ dataType: 'string' }, { dataType: 'enum', enums: [null] }] },
      royalties: { dataType: 'double', required: true },
      freeMinting: { dataType: 'boolean', required: true },
      draft: { dataType: 'boolean', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateProductResponse: {
    dataType: 'refObject',
    properties: {
      status: { dataType: 'string', required: true },
      transactionId: { dataType: 'string' },
      productId: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateProductBody: {
    dataType: 'refObject',
    properties: {
      asset: { dataType: 'union', subSchemas: [{ ref: 'Asset' }, { dataType: 'enum', enums: [null] }] },
      price: { dataType: 'union', subSchemas: [{ dataType: 'double' }, { dataType: 'enum', enums: [null] }] },
      currency: { dataType: 'union', subSchemas: [{ dataType: 'string' }, { dataType: 'enum', enums: [null] }] },
      title: { dataType: 'string', required: true },
      description: { dataType: 'union', subSchemas: [{ dataType: 'string' }, { dataType: 'enum', enums: [null] }] },
      royalties: { dataType: 'double', required: true },
      freeMinting: { dataType: 'boolean', required: true },
      draft: { dataType: 'boolean', required: true },
      id: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteProductResponse: {
    dataType: 'refObject',
    properties: {
      status: { dataType: 'string', required: true },
      productId: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  RestoreProductResponse: {
    dataType: 'refObject',
    properties: {
      status: { dataType: 'string', required: true },
      productId: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateReactionResponse: {
    dataType: 'refObject',
    properties: {
      message: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateReactionRequest: {
    dataType: 'refObject',
    properties: {
      productId: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.get(
    '/api/creator',

    function IndexController_index(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new IndexController();

        const promise = controller.index.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/creator/my-products',
    authenticateMiddleware([{ jwt: [] }]),

    function ProductController_getAllProductsByUser(request: any, response: any, next: any) {
      const args = {
        request: { in: 'request', name: 'request', required: true, dataType: 'object' },
        query: { in: 'query', name: 'query', dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProductController();

        const promise = controller.getAllProductsByUser.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/creator/products',

    function ProductController_getAllProducts(request: any, response: any, next: any) {
      const args = {
        query: { in: 'query', name: 'query', dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProductController();

        const promise = controller.getAllProducts.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/creator/products/:id',

    function ProductController_getProduct(request: any, response: any, next: any) {
      const args = {
        id: { in: 'path', name: 'id', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProductController();

        const promise = controller.getProduct.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/creator/products',
    authenticateMiddleware([{ jwt: [] }]),

    function ProductController_createProduct(request: any, response: any, next: any) {
      const args = {
        request: { in: 'request', name: 'request', required: true, dataType: 'object' },
        body: { in: 'body', name: 'body', required: true, ref: 'CreateProductBody' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProductController();

        const promise = controller.createProduct.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    '/api/creator/products',
    authenticateMiddleware([{ jwt: [] }]),

    function ProductController_updateProduct(request: any, response: any, next: any) {
      const args = {
        request: { in: 'request', name: 'request', required: true, dataType: 'object' },
        body: { in: 'body', name: 'body', required: true, ref: 'UpdateProductBody' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProductController();

        const promise = controller.updateProduct.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/creator/products/:id',
    authenticateMiddleware([{ jwt: [] }]),

    function ProductController_deleteProduct(request: any, response: any, next: any) {
      const args = {
        request: { in: 'request', name: 'request', required: true, dataType: 'object' },
        id: { in: 'path', name: 'id', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProductController();

        const promise = controller.deleteProduct.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    '/api/creator/restore-product/:id',
    authenticateMiddleware([{ jwt: [] }]),

    function ProductController_restoreProduct(request: any, response: any, next: any) {
      const args = {
        request: { in: 'request', name: 'request', required: true, dataType: 'object' },
        id: { in: 'path', name: 'id', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProductController();

        const promise = controller.restoreProduct.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    '/api/creator/reactions',
    authenticateMiddleware([{ jwt: [] }]),

    function ReactionController_updateReaction(request: any, response: any, next: any) {
      const args = {
        request: { in: 'request', name: 'request', required: true, dataType: 'object' },
        body: { in: 'body', name: 'body', required: true, ref: 'UpdateReactionRequest' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ReactionController();

        const promise = controller.updateReaction.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      // keep track of failed auth attempts so we can hand back the most
      // recent one.  This behavior was previously existing so preserving it
      // here
      const failedAttempts: any[] = [];
      const pushAndRethrow = (error: any) => {
        failedAttempts.push(error);
        throw error;
      };

      const secMethodOrPromises: Promise<any>[] = [];
      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          const secMethodAndPromises: Promise<any>[] = [];

          for (const name in secMethod) {
            secMethodAndPromises.push(expressAuthentication(request, name, secMethod[name]).catch(pushAndRethrow));
          }

          // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

          secMethodOrPromises.push(
            Promise.all(secMethodAndPromises).then((users) => {
              return users[0];
            }),
          );
        } else {
          for (const name in secMethod) {
            secMethodOrPromises.push(expressAuthentication(request, name, secMethod[name]).catch(pushAndRethrow));
          }
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      try {
        request['user'] = await promiseAny(secMethodOrPromises);
        next();
      } catch (err) {
        // Show most recent error as response
        const error = failedAttempts.pop();
        error.status = error.status || 401;
        next(error);
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus() || statusCode;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        returnHandler(response, statusCode, data, headers);
      })
      .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
    if (response.headersSent) {
      return;
    }
    Object.keys(headers).forEach((name: string) => {
      response.set(name, headers[name]);
    });
    if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
      data.pipe(response);
    } else if (data !== null && data !== undefined) {
      response.status(statusCode || 200).json(data);
    } else {
      response.status(statusCode || 204).end();
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown> {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any, response: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'path':
          return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'header':
          return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'body':
          return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'body-prop':
          return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'formData':
          if (args[key].dataType === 'file') {
            return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {
              noImplicitAdditionalProperties: 'throw-on-extras',
            });
          } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
            return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {
              noImplicitAdditionalProperties: 'throw-on-extras',
            });
          } else {
            return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {
              noImplicitAdditionalProperties: 'throw-on-extras',
            });
          }
        case 'res':
          return responder(response);
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

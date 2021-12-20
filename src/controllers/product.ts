import {
  Controller,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Security,
  Request,
  Path,
  Post,
  Body,
  Patch,
  Delete,
} from 'tsoa';

import { AuthedRequest } from '@customtypes/auth';
import {
  CreateProductBody,
  CreateProductResponse,
  DeleteProductResponse,
  UpdateProductResponse,
  UpdateProductBody,
  RestoreProductResponse,
} from '../types/product';
import ProductService from '@services/product';

@Route('')
export class ProductController extends Controller {
  private productService: ProductService;

  constructor() {
    super();
    this.productService = new ProductService();
  }

  @Post('/products')
  @Tags('Product')
  @Security('jwt')
  @Response<CreateProductResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async createProduct(
    @Request() request: AuthedRequest,
    @Body() body: CreateProductBody,
  ): Promise<CreateProductResponse> {
    const { userId, accountId } = request.auth;
    return this.productService.createProduct(userId, accountId, body);
  }

  @Patch('/products')
  @Tags('Product')
  @Security('jwt')
  @Response<UpdateProductResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async updateProduct(
    @Request() request: AuthedRequest,
    @Body() body: UpdateProductBody,
  ): Promise<UpdateProductResponse> {
    const { userId, accountId } = request.auth;
    return this.productService.updateProduct(userId, accountId, body);
  }

  @Delete('/products/{id}')
  @Tags('Product')
  @Security('jwt')
  @Response<DeleteProductResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async deleteProduct(@Request() request: AuthedRequest, @Path() id: string): Promise<DeleteProductResponse> {
    const { userId } = request.auth;
    return this.productService.deleteProduct(userId, id);
  }

  @Patch('/restore-product/{id}')
  @Tags('Product')
  @Security('jwt')
  @Response<DeleteProductResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async restoreProduct(@Request() request: AuthedRequest, @Path() id: string): Promise<RestoreProductResponse> {
    const { userId } = request.auth;
    return this.productService.restoreProduct(userId, id);
  }
}

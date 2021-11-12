import {
  Controller,
  Get,
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
  Query,
} from 'tsoa';
import { AuthedRequest } from '@customtypes/auth';
import {
  CreateProductBody,
  ProductResponse,
  CreateProductResponse,
  DeleteProductResponse,
  UpdateProductResponse,
  UpdateProductBody,
  RestoreProductResponse,
} from '../types/product';
import ProductService from '@services/product';
import { getPagination } from '@utils/query';

@Route('')
export class ProductController extends Controller {
  private productService: ProductService;

  constructor() {
    super();
    this.productService = new ProductService();
  }

  // Get all products by user/creator
  @Get('/my-products')
  @Tags('Product')
  @Security('jwt')
  @Response<ProductResponse[]>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async getAllProductsByUser(
    @Request() request: AuthedRequest,
    @Query() query?: string,
  ): Promise<ProductResponse[]> {
    const { userId } = request.auth;
    const paginate = getPagination(query);
    return this.productService.getAllProductsByUser(userId, paginate);
  }

  // Get all products in market place
  @Get('/products')
  @Tags('Product')
  @Response<ProductResponse[]>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async getAllProducts(@Query() query?: string): Promise<ProductResponse[]> {
    const paginate = getPagination(query);
    return this.productService.getAllProducts(paginate);
  }

  @Get('/products/{id}')
  @Tags('Product')
  @Response<ProductResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async getProduct(@Path() id: string): Promise<ProductResponse> {
    return this.productService.getProduct(id);
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

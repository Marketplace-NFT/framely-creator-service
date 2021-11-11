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
  Put,
  Delete,
} from 'tsoa';
import { AuthedRequest } from '@customtypes/auth';
import {
  CreateProductBody,
  ProductResponse,
  CreateProductResponse,
  DeleteProductResponse,
  UpdateProductResponse,
  UpdateProductBody,
} from '../types/product';
import ProductService from '@services/product';

@Route('/products')
export class ProductController extends Controller {
  private productService: ProductService;

  constructor() {
    super();
    this.productService = new ProductService();
  }

  // Get all products by user/creator
  @Get('/by-user')
  @Tags('Product')
  @Security('jwt')
  @Response<ProductResponse[]>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async getAllProductsByUser(@Request() request: AuthedRequest): Promise<ProductResponse[]> {
    const { userId, accountId } = request.auth;
    return this.productService.getAllProductsByUser(userId, accountId);
  }

  // Get all products in market place
  @Get('/')
  @Tags('Product')
  @Response<ProductResponse[]>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async getAllProducts(): Promise<ProductResponse[]> {
    return this.productService.getAllProducts();
  }

  @Get('/{id}')
  @Tags('Product')
  @Response<ProductResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async getProduct(@Path() id: string): Promise<ProductResponse> {
    return this.productService.getProduct(id);
  }

  @Post('/')
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

  @Put('/')
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

  @Delete('/{id}')
  @Tags('Product')
  @Security('jwt')
  @Response<DeleteProductResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async deleteProduct(@Request() request: AuthedRequest, @Path() id: string): Promise<DeleteProductResponse> {
    const { userId, accountId } = request.auth;
    return this.productService.deleteProduct(userId, accountId, id);
  }
}

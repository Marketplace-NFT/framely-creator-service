import { getRepository, Like, Repository } from 'typeorm';
import {
  CreateProductBody,
  DeleteProductResponse,
  Paginate,
  RestoreProductResponse,
  UpdateProductBody,
} from '../types/product';
import { Product } from '@entities/Product';
import { ProductResponse, CreateProductResponse, UpdateProductResponse } from '@customtypes/Product';
import { BadRequest, EntityNotFoundError } from '@exceptions/errors';
import { removeGuardFields } from '@utils/guard';
import { parseQuery } from '@utils/query';
export default class ProductService {
  private productRepository: Repository<Product>;

  public constructor() {
    this.productRepository = getRepository(Product);
  }

  private paginate(query?: string): Paginate {
    const parsed = parseQuery(query || '');
    const { keyword, take, skip } = parsed;
    return {
      take: take ? Number(parsed.take) : 25,
      skip: skip ? Number(parsed.skip) : 0,
      keyword: keyword ? keyword.toString() : '',
    };
  }

  public async getAllProducts(query?: string): Promise<ProductResponse[]> {
    const options = this.paginate(query);
    return await this.productRepository.find({
      where: { title: Like(`%${options.keyword}%`) },
      take: options.take,
      skip: options.skip,
      order: { createdAt: 'DESC' },
    });
  }

  public async getAllProductsByUser(userId: string, query?: string): Promise<ProductResponse[]> {
    const options = this.paginate(query);
    return (await this.productRepository.find({
      where: { userId, title: Like(`%${options.keyword}%`) },
      take: options.take,
      skip: options.skip,
      order: { createdAt: 'DESC' },
    })) as ProductResponse[];
  }

  public async getProduct(id: string): Promise<ProductResponse> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['reactions'] });
    if (!product) throw new EntityNotFoundError('Product not found');
    return product;
  }

  private validateRoyalties(royalties: number): void {
    if (royalties < 0 || royalties > 50) throw new BadRequest();
  }

  public async createProduct(
    userId: string,
    accountId: string,
    body: CreateProductBody,
  ): Promise<CreateProductResponse> {
    this.validateRoyalties(body.royalties);
    let product = new Product();
    const bodyGuard = removeGuardFields(body, ['userId', 'accountId']);
    product = { ...product, userId, accountId, ...bodyGuard } as Product;
    product.status = product.draft ? 'Draft' : 'Done';
    const res = await this.productRepository.save(product);
    return { status: res.status, transactionId: res.transactionId };
  }

  public async updateProduct(
    userId: string,
    accountId: string,
    body: UpdateProductBody,
  ): Promise<UpdateProductResponse> {
    this.validateRoyalties(body.royalties);
    let product = await this.productRepository.findOne({ id: body.id, userId, accountId });
    if (!product) throw new EntityNotFoundError('Product not found');
    const bodyGuard = removeGuardFields(body, ['userId', 'accountId', 'transactionId', 'id']);
    product = { ...product, ...bodyGuard } as Product;
    product.status = product.draft ? 'Draft' : 'Done';
    const res = await this.productRepository.save(product);
    return { status: res.status, productId: res.id };
  }

  public async deleteProduct(userId: string, id: string): Promise<DeleteProductResponse> {
    const res = await this.productRepository.softDelete({ id, userId });
    if (res.affected === 0) throw new EntityNotFoundError('Product not found');
    return { status: 'Done', productId: id };
  }

  public async restoreProduct(userId: string, id: string): Promise<RestoreProductResponse> {
    const res = await this.productRepository.restore({ id, userId });
    if (res.affected === 0) throw new EntityNotFoundError('Product not found');
    return { status: 'Done', productId: id };
  }
}

import { CreateProductBody, DeleteProductResponse, UpdateProductBody } from '../types/product';
import { getRepository, Repository } from 'typeorm';
import { Product } from '@entities/Product';
import { ProductResponse, CreateProductResponse, UpdateProductResponse } from '@customtypes/Product';
import { BadRequest, EntityNotFoundError } from '@exceptions/errors';
import { removeGuardFields } from '@utils/guard';

export default class ProductService {
  private productRepository: Repository<Product>;

  public constructor() {
    this.productRepository = getRepository(Product);
  }

  public async getAllProducts(): Promise<ProductResponse[]> {
    return await this.productRepository.find({});
  }

  public async getProduct(id: string): Promise<ProductResponse> {
    const Product = await this.productRepository.findOne({ where: { id }, relations: ['emotions'] });
    if (!Product) throw new EntityNotFoundError('Product not found');
    return Product;
  }

  public async getAllProductsByUser(userId: string, accountId: string): Promise<ProductResponse[]> {
    return await this.productRepository.find({ userId, accountId });
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
    const res = await this.productRepository.save(product);
    return { status: 'Done', transactionId: res.transactionId };
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
    const res = await this.productRepository.save(product);
    return { status: 'Done', ProductId: res.id };
  }

  public async deleteProduct(userId: string, accountId: string, id: string): Promise<DeleteProductResponse> {
    const res = await this.productRepository.delete({ id, userId, accountId });
    if (res.affected === 0) throw new EntityNotFoundError('Product not found');
    return { status: 'Done', ProductId: id };
  }
}

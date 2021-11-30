import { getRepository, Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

import {
  Asset,
  CreateProductBody,
  DeleteProductResponse,
  RestoreProductResponse,
  UpdateProductBody,
} from '../types/product';
import { Product } from '@entities/Product';
import { CreateProductResponse, UpdateProductResponse } from '@customtypes/product';
import { BadRequest, EntityNotFoundError } from '@exceptions/errors';
import { removeGuardFields } from '@utils/guard';
import StorageService from './storage';

export default class ProductService {
  private productRepository: Repository<Product>;
  private storageService = new StorageService();

  public constructor() {
    this.productRepository = getRepository(Product);
  }

  private validateRoyalties(royalties: number): void {
    if (royalties < 0 || royalties > 50) throw new BadRequest();
  }

  public async createProduct(
    userId: string,
    accountId: string,
    body: CreateProductBody,
    token: string,
  ): Promise<CreateProductResponse> {
    this.validateRoyalties(body.royalties);
    let product = new Product();
    const bodyGuard = removeGuardFields(body, ['userId', 'accountId']);
    product.id = uuid4();
    body.asset = await this.storageService.updateAsset(token, product.id, body.asset as Asset);
    product = { ...product, userId, accountId, ...bodyGuard } as Product;
    product.status = product.draft ? 'Draft' : 'Done';
    const res = await this.productRepository.save(product);
    return { status: res.status, transactionId: res.transactionId, productId: res.id };
  }

  public async updateProduct(
    userId: string,
    accountId: string,
    body: UpdateProductBody,
    token: string,
  ): Promise<UpdateProductResponse> {
    this.validateRoyalties(body.royalties);
    let product = await this.productRepository.findOne({ id: body.id, userId, accountId });
    if (!product) throw new EntityNotFoundError('Product not found');

    const bodyGuard = removeGuardFields(body, ['userId', 'accountId', 'transactionId', 'id']);
    if (body.asset) {
      if (product.asset.name.includes(body.asset?.name)) {
        delete body.asset;
      } else body.asset = await this.storageService.updateAsset(token, product.id, body.asset as Asset);
    }
    product = { ...product, ...bodyGuard } as Product;
    product.status = product.draft ? 'Draft' : 'Done';
    const res = await this.productRepository.save(product);
    return { status: res.status, transactionId: res.transactionId, productId: res.id };
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

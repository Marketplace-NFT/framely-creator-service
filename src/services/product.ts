import { getRepository, Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

import {
  CreateProductBody,
  DeleteProductResponse,
  RestoreProductResponse,
  SaleRequest,
  SaleResponse,
  UpdateProductBody,
} from '../types/product';
import { Product, ProductStatus } from '@entities/Product';
import { CreateProductResponse, UpdateProductResponse } from '@customtypes/product';
import { BadRequest, EntityNotFoundError } from '@exceptions/errors';
import { removeGuardFields } from '@utils/guard';
import StorageService from './storage';
import { Asset } from '@customtypes/upload';
import { Collection } from '@entities/Collection';

export default class ProductService {
  private productRepository: Repository<Product>;
  private collectionRepository: Repository<Collection>;
  private storageService = new StorageService();

  public constructor() {
    this.productRepository = getRepository(Product);
    this.collectionRepository = getRepository(Collection);
  }

  private validateRoyalties(royalties: number): void {
    if (royalties < 0 || royalties > 50) throw new BadRequest();
  }

  private async validateUserCollection(userId: string, collectionId: string): Promise<boolean> {
    const res = await this.collectionRepository.findOne({ userId, id: collectionId });
    console.log(res);
    if (res) return true;
    return false;
  }

  public async createProduct(
    userId: string,
    accountId: string,
    body: CreateProductBody,
  ): Promise<CreateProductResponse> {
    this.validateRoyalties(body.royalties);
    let product = new Product();
    const bodyGuard = removeGuardFields(body, ['userId', 'accountId']);
    product.id = uuid4();

    const [asset, previewImage] = await Promise.all([
      this.storageService.updateAsset(product.id, 'Product', body.asset),
      this.storageService.updateAsset(product.id, 'Product', body.previewImage as Asset),
    ]);
    if (asset) body.asset = asset;
    if (previewImage) body.previewImage = previewImage;
    if (body.collectionId && !(await this.validateUserCollection(userId, body.collectionId))) {
      throw new EntityNotFoundError('CollectionID does not belong to the current user');
    }

    product = { ...product, userId, accountId, ...bodyGuard } as Product;
    product.status = product.draft ? ProductStatus.DRAFT : ProductStatus.OFFICIAL;
    const res = await this.productRepository.save(product);
    return { status: res.status, transactionId: res.transactionId, productId: res.id };
  }

  public async updateProduct(
    userId: string,
    accountId: string,
    body: UpdateProductBody,
  ): Promise<UpdateProductResponse> {
    if (body.royalties) this.validateRoyalties(body.royalties);

    let product = await this.productRepository.findOne({ id: body.id, userId, accountId });
    if (!product) throw new EntityNotFoundError('Product not found');

    const [asset, previewImage] = await Promise.all([
      this.storageService.updateAsset(product.id, 'Product', body.asset as Asset),
      this.storageService.updateAsset(product.id, 'Product', body.previewImage as Asset),
    ]);
    if (asset) body.asset = asset;
    if (previewImage) body.previewImage = previewImage;
    if (body.collectionId && !(await this.validateUserCollection(userId, body.collectionId))) {
      throw new EntityNotFoundError('CollectionID does not belong to the current user');
    }

    const bodyGuard = removeGuardFields(body, ['userId', 'accountId', 'transactionId', 'id']);
    product = { ...product, ...bodyGuard } as Product;
    product.status = product.draft ? ProductStatus.DRAFT : ProductStatus.OFFICIAL;
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

  public async sale(body: SaleRequest): Promise<SaleResponse> {
    const res = await this.productRepository.findOne({ id: body.productId });
    if (!res) throw new EntityNotFoundError('Product not found');
    res.status = ProductStatus.SALE;
    res.sellMethod = body.sellMethod;
    res.startPrice = body.startPrice;
    res.thresholdPrice = body.thresholdPrice;
    res.bidExpiration = body.bidExpiration;
    await this.productRepository.save(res);
    return { status: res.status, productId: res.id };
  }

  public async removeFromSale(productId: string): Promise<SaleResponse> {
    const res = await this.productRepository.findOne({ id: productId });
    if (!res) throw new EntityNotFoundError('Product not found');
    res.status = ProductStatus.OFFICIAL;
    await this.productRepository.save(res);
    return { status: res.status, productId: res.id };
  }
}

import { Column } from 'typeorm';
import { AssetBaseObject } from './upload';

export interface CreateProductBody {
  asset: AssetObject;
  previewImage?: AssetBaseObject | null;
  title: string;
  description?: string | null;
  royalties: number;
  freeMinting: boolean;
  draft: boolean;
}

export interface CreateProductResponse {
  status: string;
  transactionId?: string;
  productId: string;
}

export interface UpdateProductBody {
  asset?: AssetObject | null;
  previewImage?: AssetBaseObject | null;
  title?: string | null;
  description?: string | null;
  royalties?: number | null;
  freeMinting?: boolean | null;
  draft?: boolean | null;
  id: string;
}

export interface UpdateProductResponse {
  status: string;
  transactionId?: string;
  productId: string;
}

export interface DeleteProductResponse {
  status: string;
  productId: string;
}

export interface RestoreProductResponse {
  status: string;
  productId: string;
}

export class AssetObject {
  @Column({ type: 'varchar', default: 'name' })
  public name!: string;

  @Column({ type: 'varchar', default: 'url' })
  public url!: string;

  @Column({ type: 'varchar', default: 'type' })
  public type!: string;
}

export class PriceObject {
  @Column({ type: 'decimal', nullable: true })
  public value?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public currency?: string;
}

enum SellMethod {
  FIXED_PRICE = 'FIXED_PRICE',
  TIMED_AUCTION = 'TIMED_AUCTION',
}
export interface SaleRequest {
  productId: string;
  sellMethod: SellMethod;
  startPrice: PriceObject;
  thresholdPrice?: PriceObject;
  bidExpiration?: Date;
}
export interface SaleResponse {
  status: string;
  productId: string;
}

export interface UnSaleRequest {
  productId: string;
}

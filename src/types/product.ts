import { Column } from 'typeorm';

export interface CreateProductBody {
  asset?: Asset | null;
  price?: number | null;
  currency?: string | null;
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

export interface UpdateProductBody extends CreateProductBody {
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
export interface Asset {
  name: string;
  url: string;
  type: string;
  previewUrl: string;
}

export class AssetObject {
  @Column({ type: 'varchar', default: 'name' })
  public name!: string;

  @Column({ type: 'varchar', default: 'url' })
  public url!: string;

  @Column({ type: 'varchar', default: 'type' })
  public type!: string;

  @Column({ type: 'varchar', default: 'previewUrl' })
  public previewUrl!: string;
}

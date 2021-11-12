import { Product } from '@entities/Product';
import { Column } from 'typeorm';

export interface ProductResponse extends Partial<Product> {
  file: File;
  price: Price;
  title: string;
  description?: string;
  royalties: number;
  freeMinting: boolean;
  draft: boolean;
}

export interface CreateProductBody {
  file: File;
  price: Price;
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

export interface Paginate {
  keyword?: string;
  take?: number;
  skip?: number;
}

export interface File {
  name: string;
  url: string;
  type: string;
}

export abstract class Price {
  @Column({ type: 'decimal' })
  value!: number;

  @Column()
  currency!: string;
}

import { Product } from '@entities/Product';

export interface ProductResponse extends Partial<Product> {
  asset?: Asset;
  price?: number;
  currency?: string;
  title: string;
  description?: string;
  royalties: number;
  freeMinting: boolean;
  draft: boolean;
}

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

export interface Paginate {
  keyword?: string;
  take?: number;
  skip?: number;
}

export interface Asset {
  name: string;
  url: string;
  type: string;
  previewUrl: string;
}

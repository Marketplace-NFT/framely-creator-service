import { Product } from '@entities/Product';

export interface ProductResponse extends Partial<Product> {
  fileUrl: string;
  price: number;
  title: string;
  description?: string;
  royalties: number;
  freeMinting: boolean;
  draft: boolean;
}

export interface CreateProductBody {
  fileUrl: string;
  price: number;
  title: string;
  description?: string | null;
  royalties: number;
  freeMinting: boolean;
  draft: boolean;
}

export interface CreateProductResponse {
  status: string;
  transactionId?: string;
}

export interface UpdateProductBody extends CreateProductBody {
  id: string;
}

export interface UpdateProductResponse {
  status: string;
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

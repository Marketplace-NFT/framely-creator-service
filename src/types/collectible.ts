import { Collectible } from '@entities/Collectible';

export interface CollectibleResponse extends Partial<Collectible> {
  fileUrl: string;
  price: number;
  title: string;
  description?: string;
  royalties: number;
  freeMinting: boolean;
  draft: boolean;
}

export interface CreateCollectibleBody {
  fileUrl: string;
  price: number;
  title: string;
  description?: string;
  royalties: number;
  freeMinting: boolean;
  draft: boolean;
}

export interface CreateCollectibleResponse {
  status: string;
  transactionId?: string;
}

export interface UpdateCollectibleBody extends CreateCollectibleBody {
  id: string;
}

export interface UpdateCollectibleResponse {
  status: string;
  collectibleId: string;
}

export interface DeleteCollectibleResponse {
  status: string;
  collectibleId: string;
}

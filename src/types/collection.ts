import { AssetBaseObject } from './upload';

export interface CreateCollectionRequest {
  displayName?: string | null;
  image?: AssetBaseObject | null;
  description?: string | null;
  shortUrl: string;
}

export interface UpdateCollectionRequest {
  collectionId: string;
  image?: AssetBaseObject | null;
  displayName?: string | null;
  description?: string | null;
  shortUrl?: string | null;
}

export interface CollectionResponse {
  message: string;
  collectionId: string;
}

export interface CollectionRequest {
  collectionId: string;
}

export interface ThumbnailOptions {
  width?: number;
  height?: number;
}

export interface UpdateAssetRequest {
  objectKey: string;
  objectUrl: string;
  contentType: string;
  entityId?: string;
  entityName?: string;
  thumbnailOptions?: ThumbnailOptions;
}

import { Column } from 'typeorm';

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

export class AssetBaseObject {
  @Column({ type: 'varchar', nullable: true })
  public name?: string;

  @Column({ type: 'varchar', nullable: true })
  public url?: string;

  @Column({ type: 'varchar', nullable: true })
  public type?: string;
}

export interface Asset {
  name: string;
  url: string;
  type: string;
}

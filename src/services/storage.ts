import { Asset, UpdateAssetRequest } from '@customtypes/upload';
import logger from '@utils/logger';
import { api } from '@config/sdk';
export default class StorageService {
  public async updateAsset(
    productId: string,
    asset?: Asset,
    width?: number,
    height?: number,
  ): Promise<Asset | undefined> {
    if (!asset) return;
    const data: UpdateAssetRequest = {
      objectKey: asset.name,
      objectUrl: asset.url,
      contentType: asset.type,
      entityId: productId,
      entityName: 'Product',
    };
    if (width && height)
      Object.assign(data, {
        thumbnailOptions: { width, height },
      });
    try {
      const res = await api.storage.updateAsset(data);
      let name = res.objectKey;
      let url = res.objectUrl;
      const type = res.contentType;
      if (res.thumbnailKey && res.thumbnailUrl) {
        name = res.thumbnailKey;
        url = res.thumbnailUrl;
      }
      return { name, url, type };
    } catch (error) {
      logger.error(error);
    }
  }
}

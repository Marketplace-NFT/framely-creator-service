import axios from 'axios';

import { Asset } from '../types/product';
import { CreateAssetRequest } from '@customtypes/upload';
import baseConfig from '@config/index';

export default class StorageService {
  public async createAsset(
    token: string,
    productId: string,
    asset: Asset,
    width?: number,
    height?: number,
  ): Promise<Asset> {
    const data: CreateAssetRequest = {
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
    const res = await axios({
      url: `${baseConfig.storageUrl}/api/storage/assets`,
      method: 'POST',
      data,
      headers: {
        Authorization: token,
      },
    });
    let name = res.data.objectKey;
    let url = res.data.objectUrl;
    let type = res.data.contentType;
    if (res.data.thumbnailKey) {
      name = res.data.thumbnailKey;
      url = res.data.thumbnailUrl;
      type = 'image/png';
    }
    return { name, url, type, previewUrl: asset.previewUrl };
  }
}

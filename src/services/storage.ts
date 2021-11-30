import axios from 'axios';

import { Asset } from '../types/product';
import { UpdateAssetRequest } from '@customtypes/upload';
import baseConfig from '@config/index';

export default class StorageService {
  public async updateAsset(
    token: string,
    productId: string,
    asset: Asset,
    width?: number,
    height?: number,
  ): Promise<Asset> {
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
    const res = await axios({
      url: `${baseConfig.storageUrl}/api/storage/assets`,
      method: 'PATCH',
      data,
      headers: {
        Authorization: token,
      },
    });
    let name = res.data.objectKey;
    let url = res.data.objectUrl;
    const type = res.data.contentType;
    if (res.data.thumbnailKey) {
      name = res.data.thumbnailKey;
      url = res.data.thumbnailUrl;
    }
    return { name, url, type, previewUrl: url };
  }
}

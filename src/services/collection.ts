import { getRepository, Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

import { Collection } from '@entities/Collection';
import { CollectionResponse, CreateCollectionRequest, UpdateCollectionRequest } from '@customtypes/collection';
import { EntityNotFoundError } from '@exceptions/errors';
import { Asset } from '@customtypes/upload';
import StorageService from './storage';

export default class CollectionService {
  private collectionRepository: Repository<Collection>;
  private storageService = new StorageService();

  public constructor() {
    this.collectionRepository = getRepository(Collection);
  }

  public async createCollection(body: CreateCollectionRequest, userId: string): Promise<CollectionResponse> {
    const collection = new Collection();
    collection.id = uuid4();

    const image = await this.storageService.updateAsset(collection.id, 'Collection', body.image as Asset);
    if (image) collection.image = image;
    collection.userId = userId;
    collection.displayName = body.displayName as string;
    collection.shortUrl = body.shortUrl;
    collection.description = body.description as string;
    const res = await this.collectionRepository.save(collection);
    return { message: 'Success', collectionId: res.id };
  }

  public async updateCollection(body: UpdateCollectionRequest): Promise<CollectionResponse> {
    const collection = await this.collectionRepository.findOne({ id: body.collectionId });
    if (!collection) throw new Error('Collection not found');

    const image = await this.storageService.updateAsset(collection.id, 'Collection', body.image as Asset);
    if (image) collection.image = image;
    collection.displayName = body.displayName as string;
    collection.description = body.description as string;
    collection.shortUrl = body.shortUrl as string;
    const res = await this.collectionRepository.save(collection);
    return { message: 'Success', collectionId: res.id };
  }

  public async deleteCollection(collectionId: string): Promise<CollectionResponse> {
    const res = await this.collectionRepository.softDelete({ id: collectionId });
    if (res.affected === 0) throw new EntityNotFoundError('Product not found');
    return { message: 'Success', collectionId };
  }

  public async restoreCollection(collectionId: string): Promise<CollectionResponse> {
    const res = await this.collectionRepository.restore({ id: collectionId });
    if (res.affected === 0) throw new EntityNotFoundError('Product not found');
    return { message: 'Success', collectionId };
  }
}

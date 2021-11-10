import { CreateCollectibleBody, DeleteCollectibleResponse, UpdateCollectibleBody } from './../types/collectible';
import { getRepository, Repository } from 'typeorm';
import { Collectible } from '@entities/Collectible';
import { CollectibleResponse, CreateCollectibleResponse, UpdateCollectibleResponse } from '@customtypes/collectible';
import { BadRequest, EntityNotFoundError } from '@exceptions/errors';
import { removeGuardFields } from '@utils/guard';

export default class CreatorService {
  private collectibleRepository: Repository<Collectible>;

  public constructor() {
    this.collectibleRepository = getRepository(Collectible);
  }

  public async getAllCollectibles(userId: string, accountId: string): Promise<CollectibleResponse[]> {
    return await this.collectibleRepository.find({ userId, accountId });
  }

  public async getCollectible(userId: string, accountId: string, id: string): Promise<CollectibleResponse> {
    const collectible = await this.collectibleRepository.findOne({ id, userId, accountId });
    if (!collectible) throw new EntityNotFoundError('Collectible not found');
    return collectible;
  }

  private validateRoyalties(royalties: number): void {
    if (royalties < 0 || royalties > 50) throw new BadRequest();
  }

  public async createCollectible(
    userId: string,
    accountId: string,
    body: CreateCollectibleBody,
  ): Promise<CreateCollectibleResponse> {
    this.validateRoyalties(body.royalties);
    let collectible = new Collectible();
    const bodyGuard = removeGuardFields(body, ['userId', 'accountId']);
    collectible = { ...collectible, userId, accountId, ...bodyGuard } as Collectible;
    const res = await this.collectibleRepository.save(collectible);
    return { status: 'Done', transactionId: res.transactionId };
  }

  public async updateCollectible(
    userId: string,
    accountId: string,
    body: UpdateCollectibleBody,
  ): Promise<UpdateCollectibleResponse> {
    this.validateRoyalties(body.royalties);
    let collectible = await this.collectibleRepository.findOne({ id: body.id, userId, accountId });
    if (!collectible) throw new EntityNotFoundError('Collectible not found');
    const bodyGuard = removeGuardFields(body, ['userId', 'accountId', 'transactionId', 'id']);
    collectible = { ...collectible, ...bodyGuard } as Collectible;
    const res = await this.collectibleRepository.save(collectible);
    return { status: 'Done', collectibleId: res.id };
  }

  public async deleteCollectible(userId: string, accountId: string, id: string): Promise<DeleteCollectibleResponse> {
    const res = await this.collectibleRepository.delete({ id, userId, accountId });
    if (res.affected === 0) throw new EntityNotFoundError('Collectible not found');
    return { status: 'Done', collectibleId: id };
  }
}

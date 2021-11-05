import { getRepository, Repository } from 'typeorm';
import { Creator } from '@entities/Creator';

export default class CreatorService {
  private creatorRepository: Repository<Creator>;

  public constructor() {
    this.creatorRepository = getRepository(Creator);
  }
}

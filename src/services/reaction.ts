import { getRepository, Repository } from 'typeorm';

import { UpdateReactionResponse } from '../types/reaction';
import { Reaction } from '@entities/Reaction';

export default class ReactionService {
  private reactionRepository: Repository<Reaction>;

  public constructor() {
    this.reactionRepository = getRepository(Reaction);
  }

  public async updateReaction(userId: string, productId: string): Promise<UpdateReactionResponse> {
    const reaction = await this.reactionRepository.findOne({
      where: { userId, productId },
      relations: ['product'],
    });
    if (!reaction) {
      const reaction = new Reaction();
      reaction.userId = userId;
      reaction.productId = productId;
      await this.reactionRepository.save(reaction);
      return { message: 'Loved' };
    }
    await this.reactionRepository.delete(reaction.id);
    return { message: 'Unloved' };
  }
}

import { UpdateReactionResponse } from '../types/reaction';
import { getRepository, Repository } from 'typeorm';
import { Reaction } from '@entities/Reaction';
import { Product } from '@entities/Product';

export default class ReactionService {
  private reactionRepository: Repository<Reaction>;
  private productRepository: Repository<Product>;

  public constructor() {
    this.reactionRepository = getRepository(Reaction);
    this.productRepository = getRepository(Product);
  }

  public async updateReaction(userId: string, productId: string): Promise<UpdateReactionResponse> {
    const reaction = await this.reactionRepository.findOne({
      where: { userId, productId },
      relations: ['product'],
    });
    if (!reaction) {
      const product = (await this.productRepository.findOne(productId)) as Product;
      const reaction = new Reaction();
      reaction.userId = userId;
      reaction.product = Promise.resolve(product);
      await this.reactionRepository.save(reaction);
      return { message: 'Loved' };
    }
    await this.reactionRepository.delete(reaction.id);
    return { message: 'Unloved' };
  }
}

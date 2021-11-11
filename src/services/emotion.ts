import { UpdateEmotionResponse } from '../types/Emotion';
import { getRepository, Repository } from 'typeorm';
import { Emotion } from '@entities/Emotion';
import { Product } from '@entities/Product';

export default class EmotionService {
  private emotionRepository: Repository<Emotion>;
  private productRepository: Repository<Product>;

  public constructor() {
    this.emotionRepository = getRepository(Emotion);
    this.productRepository = getRepository(Product);
  }

  public async updateEmotion(userId: string, accountId: string, productId: string): Promise<UpdateEmotionResponse> {
    const emotion = await this.emotionRepository.findOne({
      where: { userId, accountId, productId },
      relations: ['product'],
    });
    if (!emotion) {
      const product = (await this.productRepository.findOne(productId)) as Product;
      const emotion = new Emotion();
      emotion.userId = userId;
      emotion.accountId = accountId;
      emotion.product = Promise.resolve(product);
      await this.emotionRepository.save(emotion);
      return { message: 'Loved' };
    }
    await this.emotionRepository.delete(emotion.id);
    return { message: 'Unloved' };
  }
}

import { BaseEntity } from '@customtypes/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Emotion extends BaseEntity {
  @Column({ type: 'varchar', length: 200 })
  public userId!: string;

  @Column({ type: 'varchar', length: 200 })
  public accountId!: string;

  @ManyToOne(() => Product, (product) => product.emotions)
  @JoinColumn()
  public product!: Promise<Product>;

  @Column()
  public productId!: string;
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@customtypes/baseEntity';
import { Product } from './Product';

@Entity()
export class Reaction extends BaseEntity {
  @Column()
  public userId!: string;

  @ManyToOne(() => Product, (product) => product.reactions)
  @JoinColumn()
  public product!: Promise<Product>;

  @Column()
  public productId!: string;
}

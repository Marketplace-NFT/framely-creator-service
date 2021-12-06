import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@customtypes/baseEntity';
import { Product } from './Product';

@Entity()
export class Offer extends BaseEntity {
  @Column({ type: 'varchar', length: 200 })
  public userId!: string;

  @ManyToOne(() => Product, (product) => product.reactions)
  @JoinColumn()
  public product!: Promise<Product>;

  @Column()
  public productId!: string;

  @Column()
  public type!: string;

  @Column({ type: 'decimal', nullable: true })
  public price?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public currency?: string;
}

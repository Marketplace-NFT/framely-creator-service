import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@customtypes/BaseEntity';
import { Product } from './Product';
import { PriceObject } from '@customtypes/product';

export enum OfferStatus {
  BUY = 'BUY',
  BID = 'BID',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  ERROR = 'ERROR',
}

@Entity()
export class Offer extends BaseEntity {
  @Column()
  public userId!: string;

  @ManyToOne(() => Product, (product) => product.offers)
  @JoinColumn()
  public product!: Promise<Product>;

  @Column()
  public productId!: string;

  @Column(() => PriceObject)
  public price?: PriceObject;

  @Column({ type: 'enum', enum: OfferStatus, nullable: true })
  public status?: OfferStatus;
}

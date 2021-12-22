import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@customtypes/baseEntity';
import { Product } from './Product';
import { PriceObject } from '@customtypes/product';

export enum OfferType {
  BUY = 'BUY',
  BID = 'BID',
}

export enum OfferStatus {
  DONE = 'DONE',
  NEW = 'NEW',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
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

  @Column({ type: 'enum', enum: OfferType, nullable: true })
  public type?: OfferType;

  @Column({ type: 'enum', enum: OfferStatus, nullable: true })
  public status?: OfferStatus;
}

import { Column, Entity, OneToMany, DeleteDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '@customtypes/baseEntity';
import { Reaction } from './Reaction';
import { AssetObject, PriceObject } from '@customtypes/product';
import { AssetBaseObject } from '@customtypes/upload';
import { Offer } from './Offer';
import { Collection } from './Collection';

export enum ProductStatus {
  DRAFT = 'DRAFT',
  OFFICIAL = 'OFFICIAL',
  SALE = 'SALE',
}

export enum SellMethod {
  FIXED_PRICE = 'FIXED_PRICE',
  TIMED_AUCTION = 'TIMED_AUCTION',
}
@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  public userId!: string;

  @Column({ type: 'varchar', length: 200 })
  public accountId!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 200, nullable: true })
  public transactionId?: string;

  @Column(() => AssetObject)
  public asset!: AssetObject;

  @Column(() => AssetBaseObject)
  public previewImage?: AssetBaseObject;

  @Column({ type: 'varchar', length: 200, default: '' })
  public title!: string;

  @Column({ type: 'text', nullable: true })
  public description?: string;

  @Column({ type: 'integer', default: 0 })
  public royalties!: number;

  @Column({ type: 'boolean', default: true })
  public freeMinting!: boolean;

  @Column({ type: 'boolean', default: false })
  public draft!: boolean;

  @OneToMany(() => Reaction, (reaction) => reaction.product)
  public reactions!: Promise<Reaction[]>;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus['DRAFT'] })
  public status!: ProductStatus;

  @Column({ type: 'enum', enum: SellMethod, nullable: true })
  public sellMethod?: SellMethod;

  @Column(() => PriceObject)
  public startPrice?: PriceObject;

  @Column(() => PriceObject)
  public thresholdPrice?: PriceObject;

  @Column({ type: 'date', nullable: true })
  public bidExpiration?: Date;

  @OneToMany(() => Offer, (offer) => offer.product)
  public offers!: Promise<Offer[]>;

  @ManyToOne(() => Collection, (collection) => collection.products)
  @JoinColumn()
  public collection?: Promise<Collection>;

  @Column({ nullable: true })
  public collectionId?: string;

  @DeleteDateColumn({ select: false })
  private deletedAt?: Date;
}

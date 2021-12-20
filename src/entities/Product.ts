import { Column, Entity, OneToMany, DeleteDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '@customtypes/baseEntity';
import { Reaction } from './Reaction';
import { AssetObject } from '@customtypes/product';
import { AssetBaseObject } from '@customtypes/upload';
import { Collection } from './Collection';

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

  @Column({ type: 'decimal', nullable: true })
  public price?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public currency?: string;

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

  @Column({ type: 'varchar', length: 50, default: '' })
  public status!: string;

  @OneToMany(() => Reaction, (reaction) => reaction.product)
  public reactions!: Promise<Reaction[]>;

  @ManyToOne(() => Collection, (collection) => collection.products)
  @JoinColumn()
  public collection?: Promise<Collection>;

  @Column({ nullable: true })
  public collectionId?: string;

  @DeleteDateColumn({ select: false })
  private deletedAt?: Date;
}

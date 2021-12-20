import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany } from 'typeorm';

import { BaseEntity } from '@customtypes/baseEntity';
import { Product } from './Product';
import { AssetBaseObject } from '@customtypes/upload';
@Entity()
export class Collection extends BaseEntity {
  @Column()
  public userId!: string;

  @OneToMany(() => Product, (product) => product.collection)
  @JoinColumn()
  public products?: Promise<Product[]>;

  @Column(() => AssetBaseObject)
  public image?: AssetBaseObject;

  @Column({ type: 'varchar', length: 200, nullable: true })
  public displayName?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  public description?: string;

  @Column({ type: 'varchar', length: 200 })
  public shortUrl!: string;

  @Column({ type: 'boolean', default: false })
  public isMain?: boolean;

  @Column({ type: 'boolean', default: false })
  public isFeature?: boolean;

  @Column({ type: 'varchar', array: true, default: [] })
  public bannerUrls!: string[];

  @DeleteDateColumn({ select: false })
  private deletedAt?: Date;
}

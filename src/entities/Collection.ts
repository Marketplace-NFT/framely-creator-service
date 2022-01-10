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

  @DeleteDateColumn({ select: false, nullable: true })
  private deletedAt?: Date;
}

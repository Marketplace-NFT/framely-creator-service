import { Column, Entity, OneToMany, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '@customtypes/baseEntity';
import { Reaction } from './Reaction';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 200 })
  public userId!: string;

  @Column({ type: 'varchar', length: 200 })
  public accountId!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  public transactionId?: string;

  @Column({ type: 'varchar', length: 200 })
  public fileUrl!: string;

  @Column({ type: 'integer', default: 0 })
  public price!: number;

  @Column({ type: 'varchar', length: 200 })
  public title!: string;

  @Column({ type: 'text', nullable: true })
  public description?: string;

  @Column({ type: 'integer' })
  public royalties!: number;

  @Column({ type: 'boolean', default: true })
  public freeMinting!: boolean;

  @Column({ type: 'boolean', default: false })
  public draft!: boolean;

  @Column({ type: 'varchar', length: 50, default: '' })
  public status!: string;

  @OneToMany(() => Reaction, (reaction) => reaction.product)
  public reactions!: Promise<Reaction[]>;

  @DeleteDateColumn({ select: false })
  private deletedAt?: Date;
}

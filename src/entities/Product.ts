import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@customtypes/baseEntity';
import { Emotion } from './Emotion';

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

  @OneToMany(() => Emotion, (emotion) => emotion.product)
  public emotions!: Promise<Emotion[]>;
}

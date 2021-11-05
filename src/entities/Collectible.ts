import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@customtypes/baseEntity';

@Entity()
export class Collectible extends BaseEntity {
  @Column({ type: 'varchar', length: 200 })
  public userId!: string;

  @Column({ type: 'varchar', length: 200 })
  public accountId!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  public transactionId?: string;

  @Column({ type: 'varchar', length: 200 })
  public fileUrl!: string;

  @Column({ type: 'varchar', length: 200 })
  public title!: string;

  @Column({ type: 'text', nullable: true })
  public description?: string;

  @Column({ type: 'integer' })
  public royalties!: number;

  @Column({ type: 'boolean', default: true })
  public freeMinting!: boolean;
}

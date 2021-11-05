import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@customtypes/baseEntity';

@Entity()
export class Creator extends BaseEntity {
  @Column()
  name!: string;
}

import { Entity, Column, ObjectIdColumn, BaseEntity } from 'typeorm';
import { IsString, IsDefined } from 'class-validator';

@Entity()
export class User extends BaseEntity{

  // All props can be removed;

  @ObjectIdColumn({
    type: 'uuid',
  })
  _id!: string;

  @IsString()
  @IsDefined()
  @Column()
  name!: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column('int')
  year: number;

  @Column()
  type: string;
}

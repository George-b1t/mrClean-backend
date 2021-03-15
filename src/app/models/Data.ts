import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('data')
class Data {
  @PrimaryColumn('uuid')
  userId: string;

  @Column()
  name: string;
};

export default Data;
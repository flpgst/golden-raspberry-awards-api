import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: string;

  @Column()
  title: string;

  @Column()
  studios: string;

  @Column()
  producers: string;

  @Column()
  winner: boolean;
}

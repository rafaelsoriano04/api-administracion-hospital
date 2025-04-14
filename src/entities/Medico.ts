import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'medico' })
export class Medico {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ type: 'int' })
  especialidad_id!: number;

  @Column({ type: 'int' })
  centro_medico_id!: number;
}

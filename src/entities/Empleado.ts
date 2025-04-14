import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'empleado' })
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50, nullable: true })
  cargo: string;

  @Column({ type: 'int' })
  centro_medico_id: number;  // Si quieres relacionar con CentroMedico con un FK real, usar Relación
}

import { Entity, PrimaryGeneratedColumn, Column ,ManyToOne,JoinColumn} from 'typeorm';
import { CentroMedico } from './CentroMedico';

@Entity({ name: 'empleado' })
export class Empleado {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 50, nullable: true })
  cargo!: string;

  @Column({ type: 'int' })
  centro_medico_id!: number;  

  @ManyToOne(() => CentroMedico, (centroMedico) => centroMedico.id, {
    
  })
  @JoinColumn({ name: 'centro_medico_id' }) 
  centroMedico!: CentroMedico;
}

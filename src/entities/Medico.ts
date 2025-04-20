import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,JoinColumn } from 'typeorm';
import { Especialidad } from './Especialidad'; 
import { CentroMedico } from './CentroMedico';

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

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.id, {
   
})
@JoinColumn({ name: 'especialidad_id' }) 
especialidad!: Especialidad;

@ManyToOne(() => CentroMedico, (centroMedico) => centroMedico.id, {
  
})
@JoinColumn({ name: 'centro_medico_id' }) 
centroMedico!: CentroMedico;
}

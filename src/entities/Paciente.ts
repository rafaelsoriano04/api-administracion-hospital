import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CentroMedico } from './CentroMedico';

@Entity({ name: 'paciente' })
export class Paciente {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int', unique: true })
    cedula!: number;


    @Column({ length: 100 })
    nombre!: string;

    @Column({ type: 'date', nullable: true })
    fecha_nacimiento!: Date;

    @Column({ type: 'int' })
    centro_medico_id!: number;

    @ManyToOne(() => CentroMedico, (centroMedico) => centroMedico.id, {
        eager: true
    })
    @JoinColumn({ name: 'centro_medico_id' })
    centroMedico!: CentroMedico;
}

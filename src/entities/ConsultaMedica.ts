import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Medico } from './Medico';
import { CentroMedico } from './CentroMedico';
import { Paciente } from './Paciente';

@Entity('consulta_medica')
export class ConsultaMedica {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    medico_id!: number;

    @Column()
    paciente_id!: number;

    @Column()
    fecha!: Date;

    @Column()
    diagnostico!: string;

    @ManyToOne(() => Medico, (medico) => medico.id, {
        eager: true
    })
    @JoinColumn({ name: 'medico_id' })
    medico!: Medico;

    @ManyToOne(() => Paciente, (paciente) => paciente.id, {
        eager: true
    })
    @JoinColumn({ name: 'paciente_id' })
    paciente!: Paciente;

}
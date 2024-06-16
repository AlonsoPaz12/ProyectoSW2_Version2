import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Medico } from 'src/medicos/medicos.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';

@Entity()
export class Vacuna {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToMany(() => Medico, medico => medico.vacunas)
    medicos: Medico[];

    @ManyToMany(() => Paciente, paciente => paciente.vacunas)
    pacientes: Paciente[];
}

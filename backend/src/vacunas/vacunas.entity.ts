import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Medico } from 'src/medicos/medicos.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';

@Entity()
export class Vacuna {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    fecha: Date;

    @Column()
    dosis: number;
    
    @Column()
    fabricante: string;

    @Column()
    lugarDeVacunacion: string;

    @ManyToMany(() => Medico, medico => medico.vacunas)
    @JoinTable()
    medicos: Medico[];

    @ManyToMany(() => Paciente, paciente => paciente.vacunas)
    @JoinTable()
    pacientes: Paciente[];
}

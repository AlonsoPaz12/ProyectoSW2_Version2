import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Medico } from 'src/medicos/medicos.entity';

@Entity()
export class Especialidad {
    @PrimaryGeneratedColumn()
    id_especialidad: number;

    @Column()
    nombre_especialidad: string;

    @Column()
    color: string;

    @Column()
    icono: string;

    @OneToMany(() => Medico, medico => medico.especialidad)
    medicos: Medico[];

}
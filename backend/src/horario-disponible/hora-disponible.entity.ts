// src/medicos/hora-disponible.entity.ts

import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Medico } from 'src/medicos/medicos.entity';

@Entity()
export class HoraDisponible {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    diaSemana: string;

    @Column()
    horaInicio: string;

    @Column()
    horaFin: string;

    @ManyToOne(() => Medico, medico => medico.horasDisponibles)
    @JoinColumn({ name: 'medicoId' })
    medico: Medico;
}
